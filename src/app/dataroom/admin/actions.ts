"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { logEvent, requireAdmin } from "@/lib/dataroom/auth";
import { generatePassword, sanitizeFileName, validateUpload, DOCUMENT_CATEGORIES } from "@/lib/dataroom/rules";
import { BUCKET, createAdminClient } from "@/lib/dataroom/supabase";

/* ------------------------------------------------------------------ investors */

export type CredentialState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "ok"; name: string; email: string; password: string; message: string };

const investorSchema = z.object({
  fullName: z.string().trim().min(2, { error: "Bitte einen Namen angeben." }).max(120),
  email: z.string().trim().toLowerCase().pipe(z.email({ error: "Bitte eine gültige E-Mail-Adresse angeben." })),
  company: z.string().trim().max(160).optional().transform((v) => v || null),
  role: z.enum(["investor", "admin"]).default("investor"),
  expiresAt: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(`${v}T23:59:59`).toISOString() : null)),
  note: z.string().trim().max(500).optional().transform((v) => v || null),
});

async function loginUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}/dataroom/login`;
}

function credentialMessage(name: string, email: string, password: string, loginUrl: string): string {
  return [
    `Guten Tag ${name},`,
    "",
    "wie besprochen erhalten Sie Zugang zu unserem Datenraum:",
    loginUrl,
    "",
    `E-Mail: ${email}`,
    `Passwort: ${password}`,
    "",
    "Bitte behandeln Sie die Unterlagen vertraulich und geben Sie die Zugangsdaten nicht weiter.",
  ].join("\n");
}

export async function createInvestor(_prev: CredentialState, formData: FormData): Promise<CredentialState> {
  const admin = await requireAdmin();
  const parsed = investorSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  const input = parsed.data;

  const db = createAdminClient();
  const password = generatePassword();
  const { data: created, error } = await db.auth.admin.createUser({
    email: input.email,
    password,
    email_confirm: true,
    user_metadata: { full_name: input.fullName },
  });
  if (error || !created.user) {
    const exists = error?.message?.toLowerCase().includes("already");
    return { status: "error", error: exists ? "Für diese E-Mail-Adresse gibt es bereits einen Zugang." : "Zugang konnte nicht angelegt werden." };
  }

  const { error: profileError } = await db.from("dataroom_profiles").insert({
    id: created.user.id,
    email: input.email,
    full_name: input.fullName,
    company: input.company,
    role: input.role,
    expires_at: input.expiresAt,
    note: input.note,
  });
  if (profileError) {
    await db.auth.admin.deleteUser(created.user.id);
    return { status: "error", error: "Profil konnte nicht gespeichert werden." };
  }

  await logEvent("invite", admin.id);
  revalidatePath("/dataroom/admin");
  return {
    status: "ok",
    name: input.fullName,
    email: input.email,
    password,
    message: credentialMessage(input.fullName, input.email, password, await loginUrl()),
  };
}

const idSchema = z.string().uuid();

export async function resetInvestorPassword(_prev: CredentialState, formData: FormData): Promise<CredentialState> {
  const admin = await requireAdmin();
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) return { status: "error", error: "Ungültige Auswahl." };

  const db = createAdminClient();
  const { data: profile } = await db.from("dataroom_profiles").select("full_name,email").eq("id", id.data).maybeSingle();
  if (!profile) return { status: "error", error: "Zugang nicht gefunden." };

  const password = generatePassword();
  const { error } = await db.auth.admin.updateUserById(id.data, { password });
  if (error) return { status: "error", error: "Passwort konnte nicht geändert werden." };

  await logEvent("reset", admin.id);
  return {
    status: "ok",
    name: profile.full_name,
    email: profile.email,
    password,
    message: credentialMessage(profile.full_name, profile.email, password, await loginUrl()),
  };
}

export async function setInvestorBlocked(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const block = formData.get("block") === "true";
  if (id === admin.id) return; // never lock yourself out

  const db = createAdminClient();
  await db.from("dataroom_profiles").update({ active: !block }).eq("id", id);
  // Banning also invalidates refresh tokens, so an open session cannot be renewed.
  await db.auth.admin.updateUserById(id, { ban_duration: block ? "876000h" : "none" });
  await logEvent(block ? "block" : "unblock", admin.id);
  revalidatePath("/dataroom/admin");
}

export async function deleteInvestor(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  if (id === admin.id) return;
  // Deleting the auth user cascades to the profile and access grants; events keep a null profile.
  await createAdminClient().auth.admin.deleteUser(id);
  await logEvent("delete", admin.id);
  revalidatePath("/dataroom/admin");
}

/* ------------------------------------------------------------------ documents */

export async function createUploadUrl(input: { fileName: string; size: number }) {
  await requireAdmin();
  const check = validateUpload(input.fileName, input.size);
  if (!check.ok) return { ok: false as const, error: check.error };

  const path = `${randomUUID()}/${sanitizeFileName(input.fileName)}`;
  const { data, error } = await createAdminClient().storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false as const, error: "Upload konnte nicht vorbereitet werden." };
  return { ok: true as const, path: data.path, token: data.token };
}

const documentSchema = z.object({
  path: z.string().regex(/^[0-9a-f-]{36}\/[\w.-]+$/),
  fileName: z.string().min(1).max(255),
  size: z.number().int().positive(),
  title: z.string().trim().min(1, { error: "Bitte einen Titel angeben." }).max(200),
  description: z.string().trim().max(500).optional(),
  category: z.string().trim().min(1).max(80),
  visibility: z.enum(["all", "selected"]),
  profileIds: z.array(z.string().uuid()).default([]),
});

export async function finalizeUpload(input: z.input<typeof documentSchema>) {
  const admin = await requireAdmin();
  const parsed = documentSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  const d = parsed.data;
  const check = validateUpload(d.fileName, d.size);
  if (!check.ok) return { ok: false as const, error: check.error };

  const db = createAdminClient();
  // Make sure the file really arrived in storage before creating the record.
  const [folder, name] = d.path.split("/");
  const { data: listed } = await db.storage.from(BUCKET).list(folder, { search: name });
  if (!listed?.some((f) => f.name === name)) return { ok: false as const, error: "Die Datei wurde nicht vollständig hochgeladen." };

  const { data: doc, error } = await db
    .from("dataroom_documents")
    .insert({
      title: d.title,
      description: d.description || null,
      category: d.category,
      storage_path: d.path,
      file_name: d.fileName,
      mime_type: check.mime,
      size_bytes: d.size,
      visibility: d.visibility,
      created_by: admin.id,
    })
    .select("id")
    .single();
  if (error || !doc) return { ok: false as const, error: "Dokument konnte nicht gespeichert werden." };

  if (d.visibility === "selected" && d.profileIds.length) {
    await db.from("dataroom_document_access").insert(d.profileIds.map((profile_id) => ({ document_id: doc.id, profile_id })));
  }
  await logEvent("upload", admin.id, doc.id);
  revalidatePath("/dataroom/admin");
  revalidatePath("/dataroom");
  return { ok: true as const };
}

export async function updateDocumentAccess(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const visibility = z.enum(["all", "selected"]).parse(formData.get("visibility"));
  const category = z.string().trim().min(1).max(80).parse(formData.get("category") || DOCUMENT_CATEGORIES[0]);
  const title = z.string().trim().min(1).max(200).parse(formData.get("title"));
  const profileIds = z.array(z.string().uuid()).parse(formData.getAll("profileIds"));

  const db = createAdminClient();
  await db.from("dataroom_documents").update({ visibility, category, title }).eq("id", id);
  await db.from("dataroom_document_access").delete().eq("document_id", id);
  if (visibility === "selected" && profileIds.length) {
    await db.from("dataroom_document_access").insert(profileIds.map((profile_id) => ({ document_id: id, profile_id })));
  }
  revalidatePath("/dataroom/admin");
  revalidatePath("/dataroom");
}

export async function deleteDocument(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const db = createAdminClient();
  const { data: doc } = await db.from("dataroom_documents").select("storage_path").eq("id", id).maybeSingle();
  if (!doc) return;
  await db.storage.from(BUCKET).remove([doc.storage_path]);
  await db.from("dataroom_documents").delete().eq("id", id);
  await logEvent("delete", admin.id, null);
  revalidatePath("/dataroom/admin");
  revalidatePath("/dataroom");
}
