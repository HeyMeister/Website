import { leadSchema, normalizeFormValues, spamFieldsSchema, toFieldErrors, type FieldErrors, type LeadInput } from "./lead-schema";

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_TIME_MS = 3000;

export type LeadDeps = {
  sendEmail: (lead: LeadInput, meta: LeadMeta) => Promise<void>;
  /** Optional; null when no CRM webhook is configured. */
  postWebhook: ((lead: LeadInput, meta: LeadMeta) => Promise<void>) | null;
  rateLimit: (key: string) => Promise<{ allowed: boolean }>;
  now: () => number;
  log: (message: string, extra?: unknown) => void;
};

export type LeadMeta = { receivedAt: string; source: string };

export type LeadResult =
  | { status: 200; body: { ok: true } }
  | { status: 400; body: { ok: false; error: string; fieldErrors: FieldErrors } }
  | { status: 429; body: { ok: false; error: string } }
  | { status: 502; body: { ok: false; error: string } };

const OK: LeadResult = { status: 200, body: { ok: true } };

/**
 * Pure lead handling logic (framework-independent, unit-tested).
 *
 * Spam: honeypot filled or submitted < 3 s → silently "succeed" without sending,
 * so bots get no signal. Rate limit per IP → 429.
 * Delivery: email and CRM webhook run in parallel. A webhook failure never affects the user.
 * If the email fails but the webhook succeeded, the lead is captured and the user sees success.
 */
export async function handleLead(raw: unknown, ip: string, deps: LeadDeps, source = "website"): Promise<LeadResult> {
  const values = raw && typeof raw === "object" ? normalizeFormValues(raw as Record<string, unknown>) : {};

  const spam = spamFieldsSchema.safeParse(values);
  if (spam.success) {
    if (spam.data.website && spam.data.website.trim() !== "") {
      deps.log("lead discarded: honeypot");
      return OK;
    }
    const startedAt = spam.data.startedAt;
    if (!startedAt || deps.now() - startedAt < MIN_FILL_TIME_MS) {
      deps.log("lead discarded: submitted too fast");
      return OK;
    }
  }

  const { allowed } = await deps.rateLimit(`lead:${ip}`);
  if (!allowed) {
    return {
      status: 429,
      body: { ok: false, error: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut oder rufen Sie uns an." },
    };
  }

  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: 400,
      body: { ok: false, error: "Bitte prüfen Sie die markierten Felder.", fieldErrors: toFieldErrors(parsed.error) },
    };
  }

  const lead = parsed.data;
  const meta: LeadMeta = { receivedAt: new Date(deps.now()).toISOString(), source };

  const [email, webhook] = await Promise.allSettled([
    deps.sendEmail(lead, meta),
    deps.postWebhook ? deps.postWebhook(lead, meta) : Promise.reject(new Error("webhook disabled")),
  ]);

  if (webhook.status === "rejected" && deps.postWebhook) deps.log("crm webhook failed", webhook.reason);
  if (email.status === "rejected") {
    deps.log("lead email failed", email.reason);
    if (deps.postWebhook && webhook.status === "fulfilled") return OK;
    return {
      status: 502,
      body: { ok: false, error: "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an oder schreiben Sie uns eine E-Mail." },
    };
  }
  return OK;
}
