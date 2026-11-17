import { z } from "zod";

/**
 * Specialist-partner application form (/partner, "Als Fachpartner bewerben").
 * Shared between client and server; error messages are shown to users (German).
 */

export const partnerServices = [
  { value: "anlagen", label: "Prüfung ortsfester Anlagen" },
  { value: "geraete", label: "Prüfung ortsveränderlicher Geräte" },
  { value: "beides", label: "Anlagen und Geräte" },
  { value: "beides-maengel", label: "Prüfung und Mängelbeseitigung" },
] as const;

export const partnerTeamSizes = [
  { value: "1", label: "Nur ich" },
  { value: "2-5", label: "2 bis 5" },
  { value: "6-20", label: "6 bis 20" },
  { value: "20+", label: "Mehr als 20" },
] as const;

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
  company: requiredText(2, 160, "Bitte geben Sie Ihren Betrieb an.", "Der Firmenname ist zu lang."),
  name: requiredText(2, 120, "Bitte geben Sie einen Ansprechpartner an.", "Der Name ist zu lang."),
  email,
  phone,
  /** Postcode area or towns, e.g. "40 bis 42" or "Düsseldorf, Neuss". */
  region: requiredText(2, 120, "Bitte geben Sie Ihr Einsatzgebiet an, z. B. den PLZ-Bereich.", "Die Angabe ist zu lang."),
  services: z.enum(values(partnerServices), { error: "Bitte wählen Sie Ihre Leistungen." }),
  teamSize: z
    .union([z.enum(values(partnerTeamSizes)), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  message: optionalText(2000, "Der Text ist zu lang (max. 2000 Zeichen)."),
  privacy: mustAgree("Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben."),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
export type PartnerFieldErrors = Partial<Record<keyof PartnerInput, string>>;

export function fieldErrors<K extends string>(error: z.ZodError): Partial<Record<K, string>> {
  const out: Partial<Record<K, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as K | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export const labelOf = (opts: ReadonlyArray<{ value: string; label: string }>, v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "–";
