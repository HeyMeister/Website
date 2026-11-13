"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient, createSessionClient, isDataroomConfigured } from "@/lib/dataroom/supabase";
import { isProfileUsable, type Profile } from "@/lib/dataroom/rules";
import { logEvent } from "@/lib/dataroom/auth";
import { rateLimit } from "@/lib/server/rate-limit";

export type LoginState = { error: string | null };

const loginSchema = z.object({
  email: z.string().trim().pipe(z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." })),
  password: z.string().min(1, { error: "Bitte geben Sie Ihr Passwort ein." }).max(200),
});

const GENERIC_ERROR = "E-Mail oder Passwort ist falsch, oder der Zugang ist nicht aktiv.";

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isDataroomConfigured()) return { error: "Der Datenraum ist noch nicht eingerichtet." };

  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await rateLimit(`dataroom-login:${ip}`);
  if (!allowed) return { error: "Zu viele Anmeldeversuche. Bitte warten Sie einige Minuten." };

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: GENERIC_ERROR };

  const admin = createAdminClient();
  const { data: profile } = await admin.from("dataroom_profiles").select("*").eq("id", data.user.id).maybeSingle<Profile>();
  if (!profile || !isProfileUsable(profile)) {
    await supabase.auth.signOut();
    return { error: GENERIC_ERROR };
  }

  await admin.from("dataroom_profiles").update({ last_login_at: new Date().toISOString() }).eq("id", profile.id);
  await logEvent("login", profile.id);
  redirect(profile.role === "admin" ? "/dataroom/admin" : "/dataroom");
}

export async function signOut(): Promise<void> {
  if (isDataroomConfigured()) {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  }
  redirect("/dataroom/login");
}
