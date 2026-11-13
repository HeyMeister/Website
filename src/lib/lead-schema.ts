import { z } from "zod";

/** Shared between client and server. Error messages are shown to users (German). */

export const industries = [
  "Bäckerei",
  "Autohaus",
  "Gastronomie",
  "Praxis",
  "Einzelhandel",
  "Büro",
  "Hausverwaltung",
  "Sonstiges",
] as const;

export const lastCheckOptions = [
  { value: "unbekannt", label: "Weiß ich nicht" },
  { value: "unter-1-jahr", label: "Vor weniger als 1 Jahr" },
  { value: "1-2-jahre", label: "Vor 1 bis 2 Jahren" },
  { value: "laenger", label: "Vor mehr als 2 Jahren" },
] as const;

export const wishOptions = [
  { value: "angebot", label: "Angebot" },
  { value: "erstgespraech", label: "Erstgespräch" },
  { value: "pilot", label: "Pilotkunde werden" },
] as const;

const optionalText = (max: number, msg: string) =>
  z
    .string()
    .trim()
    .max(max, { error: msg })
    .optional()
    .transform((v) => (v ? v : undefined));

export const leadSchema = z.object({
  name: z.string({ error: "Bitte geben Sie Ihren Namen an." }).trim().min(2, { error: "Bitte geben Sie Ihren Namen an." }).max(120, { error: "Der Name ist zu lang." }),
  company: z.string({ error: "Bitte geben Sie Ihre Firma an." }).trim().min(2, { error: "Bitte geben Sie Ihre Firma an." }).max(160, { error: "Der Firmenname ist zu lang." }),
  email: z.string({ error: "Bitte geben Sie Ihre E-Mail-Adresse an." }).trim().pipe(z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." })),
  phone: optionalText(40, "Die Telefonnummer ist zu lang.").refine((v) => !v || /^[+\d][\d\s/()-]{4,}$/.test(v), {
    error: "Bitte geben Sie eine gültige Telefonnummer an.",
  }),
  industry: z.enum(industries, { error: "Bitte wählen Sie eine Branche." }).optional(),
  sites: z.coerce
    .number({ error: "Bitte geben Sie die Anzahl der Standorte an." })
    .int({ error: "Bitte geben Sie eine ganze Zahl an." })
    .min(1, { error: "Mindestens 1 Standort." })
    .max(1000, { error: "Bitte geben Sie höchstens 1000 an oder schreiben Sie uns eine Nachricht." }),
  zip: optionalText(5, "Bitte geben Sie eine fünfstellige PLZ an.").refine((v) => !v || /^\d{5}$/.test(v), {
    error: "Bitte geben Sie eine fünfstellige PLZ an.",
  }),
  lastCheck: z.enum(lastCheckOptions.map((o) => o.value) as [string, ...string[]]).optional(),
  message: optionalText(4000, "Die Nachricht ist zu lang (max. 4000 Zeichen)."),
  wish: z.enum(["angebot", "erstgespraech", "pilot"], { error: "Bitte wählen Sie Ihr Anliegen." }),
  /** Optional pricing calculator configuration (JSON string), added in the pricing phase. */
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
