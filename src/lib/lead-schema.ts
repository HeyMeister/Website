import { z } from "zod";

/** Shared between client and server. Error messages are shown to users (German). */

export const siteCountOptions = [
  { value: "1", label: "1 Standort" },
  { value: "2-4", label: "2 bis 4" },
  { value: "5-14", label: "5 bis 14" },
  { value: "15-29", label: "15 bis 29" },
  { value: "30+", label: "30 oder mehr" },
] as const;

export const lastCheckOptions = [
  { value: "unbekannt", label: "Weiß ich nicht" },
  { value: "unter-1-jahr", label: "Vor weniger als 1 Jahr" },
  { value: "laenger", label: "Länger her" },
] as const;

export const wishOptions = [
  { value: "check", label: "Kostenloser Standort-Check" },
  { value: "erstgespraech", label: "15-Minuten-Gespräch" },
  { value: "pilot", label: "Pilotplatz" },
  { value: "angebot", label: "Angebot aus dem Preisrechner" },
] as const;

const values = <T extends ReadonlyArray<{ value: string }>>(opts: T) => opts.map((o) => o.value) as [string, ...string[]];

const optionalText = (max: number, msg: string) =>
  z
    .string()
    .trim()
    .max(max, { error: msg })
    .optional()
    .transform((v) => (v ? v : undefined));

/** At most five required fields: name, company, email, phone, number of sites. */
export const leadSchema = z.object({
  name: z.string({ error: "Bitte geben Sie Ihren Namen an." }).trim().min(2, { error: "Bitte geben Sie Ihren Namen an." }).max(120, { error: "Der Name ist zu lang." }),
  company: z.string({ error: "Bitte geben Sie Ihre Firma an." }).trim().min(2, { error: "Bitte geben Sie Ihre Firma an." }).max(160, { error: "Der Firmenname ist zu lang." }),
  email: z.string({ error: "Bitte geben Sie Ihre E-Mail-Adresse an." }).trim().pipe(z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." })),
  phone: z
    .string({ error: "Bitte geben Sie Ihre Telefonnummer an." })
    .trim()
    .min(1, { error: "Bitte geben Sie Ihre Telefonnummer an." })
    .max(40, { error: "Die Telefonnummer ist zu lang." })
    .regex(/^[+\d][\d\s/()-]{4,}$/, { error: "Bitte geben Sie eine gültige Telefonnummer an." }),
  sites: z.enum(values(siteCountOptions), { error: "Bitte wählen Sie die Anzahl Ihrer Standorte." }),
  lastCheck: z.enum(values(lastCheckOptions)).optional(),
  wish: z.enum(values(wishOptions), { error: "Bitte wählen Sie Ihr Anliegen." }),
  /** Pricing calculator configuration (plain text summary), only with wish "angebot". */
  config: optionalText(2000, "Ungültige Konfiguration."),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Anti-spam fields, not part of the lead itself. */
export const spamFieldsSchema = z.object({
  /** Honeypot: must stay empty. */
  website: z.string().optional(),
  /** Client timestamp (ms) when the form was rendered. */
  startedAt: z.coerce.number().optional(),
});

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof LeadInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Empty strings from form fields → undefined, so optional enums validate. */
export function normalizeFormValues(values: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === "" ? undefined : v]));
}
