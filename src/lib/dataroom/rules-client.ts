/**
 * Browser-safe data-room rules (no Node APIs). Re-exported by rules.ts.
 */
export const ALLOWED_UPLOADS: Record<string, string> = {
  pdf: "application/pdf",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  csv: "text/csv",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  mp4: "video/mp4",
};

/** 50 MB: Supabase free-plan limit per file (also set on the bucket). */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export function fileExtension(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name.trim());
  return m ? m[1]!.toLowerCase() : "";
}

export function validateUpload(name: string, size: number): { ok: true; mime: string } | { ok: false; error: string } {
  const ext = fileExtension(name);
  const mime = ALLOWED_UPLOADS[ext];
  if (!mime) return { ok: false, error: `Dateityp .${ext || "?"} ist nicht erlaubt. Erlaubt: ${Object.keys(ALLOWED_UPLOADS).join(", ")}.` };
  if (size <= 0) return { ok: false, error: "Die Datei ist leer." };
  if (size > MAX_UPLOAD_BYTES) return { ok: false, error: "Die Datei ist größer als 50 MB." };
  return { ok: true, mime };
}

/** Safe storage key: lowercase ASCII, umlauts transliterated, no path separators. */
export function sanitizeFileName(name: string): string {
  const ext = fileExtension(name);
  const withoutExt = ext ? name.slice(0, -(ext.length + 1)) : name;
  const base = withoutExt
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 80);
  return `${base || "datei"}${ext ? `.${ext}` : ""}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(v)} ${units[i]}`;
}

export const DOCUMENT_CATEGORIES = ["Pitch Deck", "Finanzen", "Markt", "Gesellschaft und Recht", "Produkt", "Sonstiges"] as const;
