import "server-only";
import { industries, lastCheckOptions, wishOptions, type LeadInput } from "@/lib/lead-schema";
import type { LeadMeta } from "@/lib/lead-handler";

type Attachment = { filename: string; content: string /* base64 */ };

/** Sends an email via the Resend REST API (no SDK needed). */
export async function sendViaResend(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
  /** Name of the env variable holding the recipient address (default CONTACT_EMAIL). */
  toEnv?: "CONTACT_EMAIL" | "PARTNER_INBOX";
}): Promise<void> {
  const toEnv = opts.toEnv ?? "CONTACT_EMAIL";
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env[toEnv];
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without credentials: log instead of sending.
      const files = opts.attachments?.map((a) => a.filename).join(", ");
      console.info(`[email:dev → ${toEnv}] ${opts.subject}\n${opts.text}${files ? `\nAnhang: ${files}` : ""}`);
      return;
    }
    throw new Error(`Email not configured (RESEND_API_KEY, ${toEnv}, RESEND_FROM)`);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: opts.subject,
      text: opts.text,
      reply_to: opts.replyTo,
      attachments: opts.attachments,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
}

const label = <T extends { value: string; label: string }>(opts: readonly T[], v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "–";

export function leadEmailText(lead: LeadInput, meta: LeadMeta): string {
  const lines = [
    `Anliegen: ${label(wishOptions, lead.wish)}`,
    "",
    `Name: ${lead.name}`,
    `Firma: ${lead.company}`,
    `E-Mail: ${lead.email}`,
    `Telefon: ${lead.phone ?? "–"}`,
    `Branche: ${lead.industry && industries.includes(lead.industry) ? lead.industry : "–"}`,
    `Anzahl Standorte: ${lead.sites}`,
    `PLZ Hauptstandort: ${lead.zip ?? "–"}`,
    `Zuletzt geprüft: ${label(lastCheckOptions, lead.lastCheck)}`,
    "",
    "Nachricht:",
    lead.message ?? "–",
  ];
  if (lead.config) lines.push("", "Konfiguration aus dem Preisrechner:", lead.config);
  lines.push("", `Eingegangen: ${meta.receivedAt} (Quelle: ${meta.source})`);
  return lines.join("\n");
}

export async function sendLeadEmail(lead: LeadInput, meta: LeadMeta): Promise<void> {
  await sendViaResend({
    subject: `Neue Anfrage (${label(wishOptions, lead.wish)}): ${lead.company}, ${lead.sites} Standort(e)`,
    text: leadEmailText(lead, meta),
    replyTo: lead.email,
  });
}
