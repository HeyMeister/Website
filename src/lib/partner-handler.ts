import { MIN_FILL_TIME_MS } from "./lead-handler";
import { normalizeFormValues, spamFieldsSchema } from "./lead-schema";
import {
  fieldErrors,
  partnerSchema,
  tipSchema,
  validateReport,
  type PartnerFieldErrors,
  type PartnerInput,
  type TipFieldErrors,
  type TipInput,
} from "./partner-schema";

/**
 * Framework-independent handling for /api/partner and /api/tipp (unit-tested).
 * Same spam rules as the lead form: honeypot filled or submitted under 3 s → pretend success,
 * send nothing. Rate limit per IP → 429. Delivery failure → 502 with a clear message.
 */

export type Report = { filename: string; content: Uint8Array };

export type PartnerDeps = {
  sendPartner: (input: PartnerInput, meta: Meta) => Promise<void>;
  sendTip: (input: TipInput, report: Report | null, meta: Meta) => Promise<void>;
  rateLimit: (key: string) => Promise<{ allowed: boolean }>;
  now: () => number;
  log: (message: string, extra?: unknown) => void;
};

export type Meta = { receivedAt: string };

type Fail<E> =
  | { status: 400; body: { ok: false; error: string; fieldErrors: E } }
  | { status: 413 | 429 | 502; body: { ok: false; error: string } };
export type HandlerResult<E> = { status: 200; body: { ok: true } } | Fail<E>;

const OK = { status: 200, body: { ok: true } } as const;
const TOO_MANY = {
  status: 429,
  body: { ok: false, error: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut." },
} as const;
const NOT_SENT = {
  status: 502,
  body: { ok: false, error: "Ihre Angaben konnten nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns eine E-Mail." },
} as const;

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
  if (!(await deps.rateLimit(`partner:${ip}`)).allowed) return TOO_MANY;

  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Bitte prüfen Sie die markierten Felder.", fieldErrors: fieldErrors(parsed.error) } };
  }
  try {
    await deps.sendPartner(parsed.data, { receivedAt: new Date(deps.now()).toISOString() });
    return OK;
  } catch (err) {
    deps.log("partner email failed", err);
    return NOT_SENT;
  }
}

export async function handleTip(
  raw: Record<string, unknown>,
  file: { name: string; type: string; size: number; bytes: () => Promise<Uint8Array> } | null,
  ip: string,
  deps: PartnerDeps,
): Promise<HandlerResult<TipFieldErrors>> {
  const values = normalizeFormValues(raw);
  const spam = isSpam(values, deps.now());
  if (spam) {
    deps.log(`tip discarded: ${spam}`);
    return OK;
  }
  if (!(await deps.rateLimit(`tipp:${ip}`)).allowed) return TOO_MANY;

  const parsed = tipSchema.safeParse(values);
  const errors: TipFieldErrors = parsed.success ? {} : fieldErrors(parsed.error);

  let report: Report | null = null;
  if (file && file.size > 0) {
    const sizeError = validateReport(file);
    if (sizeError) {
      errors.report = sizeError;
    } else {
      const bytes = await file.bytes();
      const contentError = validateReport(file, bytes.subarray(0, 4));
      if (contentError) errors.report = contentError;
      else report = { filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(-120), content: bytes };
    }
  }

  if (!parsed.success || errors.report) {
    return { status: 400, body: { ok: false, error: "Bitte prüfen Sie die markierten Felder.", fieldErrors: errors } };
  }
  try {
    await deps.sendTip(parsed.data, report, { receivedAt: new Date(deps.now()).toISOString() });
    return OK;
  } catch (err) {
    deps.log("tip email failed", err);
    return NOT_SENT;
  }
}
