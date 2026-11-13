import { z } from "zod";

/**
 * Partner programme forms (/partner): "Partner werden" and "Tipp einreichen".
 * Shared between client and server; error messages are shown to users (German).
 */

export const partnerRoles = [
  { value: "gewerbemakler", label: "Gewerbemakler" },
  { value: "mehrfachagent", label: "Mehrfachagent" },
  { value: "ausschliesslichkeitsvertreter", label: "Ausschließlichkeitsvertreter" },
  { value: "fasi", label: "Fachkraft für Arbeitssicherheit" },
  { value: "hv-dienstleister", label: "Hausverwaltungs-Dienstleister" },
  { value: "planer", label: "Planer" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

export const tipReasons = [
  { value: "maengel", label: "Mängel aus Prüfbericht" },
  { value: "pruefung", label: "Prüfung fällig" },
  { value: "sanierung", label: "Sanierung" },
  { value: "neubau", label: "Neubau" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

/**
 * Upload limit for the inspection report. Vercel Functions accept request bodies up to 4.5 MB,
 * so the limit is 4 MB (the brief asked for 10 MB; that needs direct-to-storage uploads).
 */
export const TIP_MAX_FILE_BYTES = 4 * 1024 * 1024;

const values = <T extends ReadonlyArray<{ value: string }>>(opts: T) => opts.map((o) => o.value) as [string, ...string[]];

const requiredText = (min: number, max: number, msg: string, tooLong: string) =>
  z.string({ error: msg }).trim().min(min, { error: msg }).max(max, { error: tooLong });

const optionalText = (max: number, msg: string) =>
  z
    .string()
    .trim()
    .max(max, { error: msg })
    .optional()
    .transform((v) => (v ? v : undefined));

/** A checkbox that must be ticked ("on" from a form, true from JSON). */
const mustAgree = (msg: string) =>
  z.union([z.literal("on"), z.literal("true"), z.literal(true)], { error: msg }).transform(() => true as const);

const email = z
  .string({ error: "Bitte geben Sie Ihre E-Mail-Adresse an." })
  .trim()
  .pipe(z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." }));

const phone = optionalText(40, "Die Telefonnummer ist zu lang.").refine((v) => !v || /^[+\d][\d\s/()-]{4,}$/.test(v), {
  error: "Bitte geben Sie eine gültige Telefonnummer an.",
});

export const partnerSchema = z.object({
  name: requiredText(2, 120, "Bitte geben Sie Ihren Namen an.", "Der Name ist zu lang."),
  company: requiredText(2, 160, "Bitte geben Sie Ihre Firma an.", "Der Firmenname ist zu lang."),
  role: z.enum(values(partnerRoles), { error: "Bitte wählen Sie Ihre Rolle." }),
  /** Postcode area, e.g. "40" or "40–42" or "NRW". */
  region: requiredText(1, 60, "Bitte geben Sie Ihre Region an, z. B. den PLZ-Bereich.", "Die Angabe ist zu lang."),
  email,
  phone,
  customers: optionalText(2000, "Der Text ist zu lang (max. 2000 Zeichen)."),
  privacy: mustAgree("Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben."),
});

export type PartnerInput = z.infer<typeof partnerSchema>;

export const tipSchema = z.object({
  partnerCode: z
    .string({ error: "Bitte geben Sie Ihren Partnercode an." })
    .trim()
    .regex(/^[A-Za-z0-9-]{3,40}$/, { error: "Bitte geben Sie einen gültigen Partnercode an (Buchstaben, Ziffern, Bindestrich)." }),
  customerCompany: requiredText(2, 160, "Bitte geben Sie die Firma des Kunden an.", "Der Firmenname ist zu lang."),
  contactPerson: requiredText(2, 120, "Bitte geben Sie einen Ansprechpartner an.", "Der Name ist zu lang."),
  contact: requiredText(5, 160, "Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.", "Die Angabe ist zu lang."),
  reason: z.enum(values(tipReasons), { error: "Bitte wählen Sie einen Anlass." }),
  consent: mustAgree("Bitte bestätigen Sie die Einwilligung des Kunden."),
});

export type TipInput = z.infer<typeof tipSchema>;

export type PartnerFieldErrors = Partial<Record<keyof PartnerInput, string>>;
export type TipFieldErrors = Partial<Record<keyof TipInput | "report", string>>;

export function fieldErrors<K extends string>(error: z.ZodError): Partial<Record<K, string>> {
  const out: Partial<Record<K, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as K | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Checks an uploaded report: PDF only (name, type and the %PDF signature), at most 4 MB. */
export function validateReport(file: { name: string; type: string; size: number }, head?: Uint8Array): string | null {
  if (file.size === 0) return "Die Datei ist leer.";
  if (file.size > TIP_MAX_FILE_BYTES) return "Die Datei ist zu groß (höchstens 4 MB).";
  const isPdfName = /\.pdf$/i.test(file.name);
  const isPdfType = file.type === "application/pdf" || file.type === "";
  if (!isPdfName || !isPdfType) return "Bitte laden Sie den Prüfbericht als PDF hoch.";
  if (head && !(head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46)) {
    return "Die Datei ist kein gültiges PDF.";
  }
  return null;
}

export const labelOf = (opts: ReadonlyArray<{ value: string; label: string }>, v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "–";
