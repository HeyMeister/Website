"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/Button";
import { ALLOWED_UPLOADS, DOCUMENT_CATEGORIES, validateUpload } from "@/lib/dataroom/rules-client";
import { createUploadUrl, finalizeUpload } from "./actions";
import { adminInputClass, adminLabelClass } from "./CreateInvestorForm";

type Investor = { id: string; label: string };

/**
 * Upload flow: the server checks admin rights and issues a one-time signed upload URL; the
 * browser sends the file straight to the private bucket (no size limit of the web server);
 * the server then verifies the file and creates the record.
 */
export function UploadForm({ supabaseUrl, supabaseKey, investors }: { supabaseUrl: string; supabaseKey: string; investors: Investor[] }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<"all" | "selected">("all");
  const [status, setStatus] = useState<{ kind: "idle" | "busy" | "error" | "ok"; text?: string }>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!file) return setStatus({ kind: "error", text: "Bitte eine Datei auswählen." });
    const check = validateUpload(file.name, file.size);
    if (!check.ok) return setStatus({ kind: "error", text: check.error });

    const fd = new FormData(form);
    setStatus({ kind: "busy", text: "Upload wird vorbereitet …" });
    const prepared = await createUploadUrl({ fileName: file.name, size: file.size });
    if (!prepared.ok) return setStatus({ kind: "error", text: prepared.error });

    setStatus({ kind: "busy", text: "Datei wird hochgeladen …" });
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const { error } = await supabase.storage.from("dataroom").uploadToSignedUrl(prepared.path, prepared.token, file, {
      contentType: check.mime,
    });
    if (error) return setStatus({ kind: "error", text: "Upload fehlgeschlagen. Bitte erneut versuchen." });

    setStatus({ kind: "busy", text: "Wird gespeichert …" });
    const saved = await finalizeUpload({
      path: prepared.path,
      fileName: file.name,
      size: file.size,
      title: String(fd.get("title") || file.name),
      description: String(fd.get("description") || ""),
      category: String(fd.get("category") || "Sonstiges"),
      visibility,
      profileIds: fd.getAll("profileIds").map(String),
    });
    if (!saved.ok) return setStatus({ kind: "error", text: saved.error });

    form.reset();
    setFile(null);
    setTitle("");
    setVisibility("all");
    setStatus({ kind: "ok", text: "Dokument hochgeladen." });
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="file" className={adminLabelClass}>
          Datei *
        </label>
        <input
          id="file"
          type="file"
          required
          accept={Object.keys(ALLOWED_UPLOADS).map((e) => `.${e}`).join(",")}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setFile(f);
            if (f && !title) setTitle(f.name.replace(/\.[^.]+$/, ""));
          }}
          className="mt-1.5 block w-full text-small text-ink file:mr-3 file:rounded-control file:border file:border-base file:bg-surface-raised file:px-3 file:py-2 file:font-semibold"
        />
        <p className="mt-1 text-small text-ink-muted">PDF, PPTX, XLSX, DOCX, CSV, PNG, JPG, MP4. Maximal 50 MB.</p>
      </div>
      <div>
        <label htmlFor="title" className={adminLabelClass}>
          Titel *
        </label>
        <input id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className={adminInputClass} />
      </div>
      <div>
        <label htmlFor="description" className={adminLabelClass}>
          Beschreibung
        </label>
        <input id="description" name="description" className={adminInputClass} />
      </div>
      <div>
        <label htmlFor="category" className={adminLabelClass}>
          Kategorie
        </label>
        <input id="category" name="category" list="categories" defaultValue={DOCUMENT_CATEGORIES[0]} className={adminInputClass} />
        <datalist id="categories">
          {DOCUMENT_CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <fieldset>
        <legend className={adminLabelClass}>Sichtbar für</legend>
        <div className="mt-2 space-y-2 text-small">
          <label className="flex items-center gap-2">
            <input type="radio" name="visibility" checked={visibility === "all"} onChange={() => setVisibility("all")} />
            Alle Investoren
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="visibility" checked={visibility === "selected"} onChange={() => setVisibility("selected")} />
            Nur ausgewählte Investoren
          </label>
        </div>
        {visibility === "selected" && (
          <div className="mt-3 max-h-48 space-y-1.5 overflow-y-auto rounded-control border border-line p-3 text-small">
            {investors.length === 0 && <p className="text-ink-muted">Noch keine Investoren angelegt.</p>}
            {investors.map((i) => (
              <label key={i.id} className="flex items-center gap-2">
                <input type="checkbox" name="profileIds" value={i.id} />
                {i.label}
              </label>
            ))}
          </div>
        )}
      </fieldset>
      <div aria-live="polite" role="status">
        {status.text && (
          <p
            className={`rounded-control px-3 py-2 text-small font-medium ${
              status.kind === "error"
                ? "border border-danger bg-danger-soft text-danger"
                : status.kind === "ok"
                  ? "bg-success-soft text-success"
                  : "bg-surface-2 text-ink"
            }`}
          >
            {status.text}
          </p>
        )}
      </div>
      <button type="submit" disabled={status.kind === "busy"} className={buttonClass("primary", "md", "w-full")}>
        Hochladen
      </button>
    </form>
  );
}
