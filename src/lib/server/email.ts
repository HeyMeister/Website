import "server-only";
import { lastCheckOptions, siteCountOptions, wishOptions, type LeadInput } from "@/lib/lead-schema";
import type { LeadMeta } from "@/lib/lead-handler";
import { site } from "@/content/site";

/** Every form (leads and partner applications) goes to the site's contact address. */
export const DEFAULT_FROM = "HeyMeister Website <website@hey-meister.de>";

export function emailRecipient(): string {
  return process.env.CONTACT_EMAIL?.trim() || site.contact.email;
}

type Attachment = { filename: string; content: string /* base64 */ };

/** Sends an email via the Resend REST API (no SDK needed). */
export async function sendViaResend(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = emailRecipient();
  // The sender domain must be verified in Resend; RESEND_FROM overrides the default.
  const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without credentials: log instead of sending.
      const files = opts.attachments?.map((a) => a.filename).join(", ");
      console.info(`[email:dev → ${to}] ${opts.subject}\n${opts.text}${files ? `\nAnhang: ${files}` : ""}`);
      return;
    }
    throw new Error("Email not configured (RESEND_API_KEY missing)");
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
    `Telefon: ${lead.phone}`,
    `Anzahl Standorte: ${label(siteCountOptions, lead.sites)}`,
    `Zuletzt geprüft: ${label(lastCheckOptions, lead.lastCheck)}`,
  ];
  if (lead.config) lines.push("", "Konfiguration aus dem Preisrechner:", lead.config);
  lines.push("", `Eingegangen: ${meta.receivedAt} (Quelle: ${meta.source})`);
  return lines.join("\n");
}

export async function sendLeadEmail(lead: LeadInput, meta: LeadMeta): Promise<void> {
  await sendViaResend({
    subject: `Neue Anfrage (${label(wishOptions, lead.wish)}): ${lead.company}, ${label(siteCountOptions, lead.sites)}`,
    text: leadEmailText(lead, meta),
    replyTo: lead.email,
  });
}
