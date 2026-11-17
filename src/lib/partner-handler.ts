import { MIN_FILL_TIME_MS } from "./lead-handler";
import { normalizeFormValues, spamFieldsSchema } from "./lead-schema";
import { fieldErrors, partnerSchema, type PartnerFieldErrors, type PartnerInput } from "./partner-schema";

/**
 * Framework-independent handling for /api/partner (unit-tested).
 * Same spam rules as the lead form: honeypot filled or submitted under 3 s → pretend success,
 * send nothing. Rate limit per IP → 429. Delivery failure → 502 with a clear message.
 */

export type PartnerDeps = {
  sendPartner: (input: PartnerInput, meta: Meta) => Promise<void>;
  rateLimit: (key: string) => Promise<{ allowed: boolean }>;
  now: () => number;
  log: (message: string, extra?: unknown) => void;
};

export type Meta = { receivedAt: string };

export type HandlerResult<E> =
  | { status: 200; body: { ok: true } }
  | { status: 400; body: { ok: false; error: string; fieldErrors: E } }
  | { status: 429 | 502; body: { ok: false; error: string } };

const OK = { status: 200, body: { ok: true } } as const;

function isSpam(values: Record<string, unknown>, now: number): string | null {
  const spam = spamFieldsSchema.safeParse(values);
  if (!spam.success) return null;
  if (spam.data.website && spam.data.website.trim() !== "") return "honeypot";
  if (!spam.data.startedAt || now - spam.data.startedAt < MIN_FILL_TIME_MS) return "submitted too fast";
  return null;
}

export async function handlePartner(raw: unknown, ip: string, deps: PartnerDeps): Promise<HandlerResult<PartnerFieldErrors>> {
  const values = raw && typeof raw === "object" ? normalizeFormValues(raw as Record<string, unknown>) : {};
  const spam = isSpam(values, deps.now());
  if (spam) {
    deps.log(`partner discarded: ${spam}`);
    return OK;
  }
  if (!(await deps.rateLimit(`partner:${ip}`)).allowed) {
    return { status: 429, body: { ok: false, error: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut." } };
  }

  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Bitte prüfen Sie die markierten Felder.", fieldErrors: fieldErrors(parsed.error) } };
  }
  try {
    await deps.sendPartner(parsed.data, { receivedAt: new Date(deps.now()).toISOString() });
    return OK;
  } catch (err) {
    deps.log("partner email failed", err);
    return {
      status: 502,
      body: { ok: false, error: "Ihre Angaben konnten nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns eine E-Mail." },
    };
  }
}
