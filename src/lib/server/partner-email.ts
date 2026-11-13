import "server-only";
import { labelOf, partnerRoles, tipReasons, type PartnerInput, type TipInput } from "@/lib/partner-schema";
import type { Meta, Report } from "@/lib/partner-handler";
import { sendViaResend } from "./email";

/** Partner programme emails, sent to the address in PARTNER_INBOX. */

export function partnerEmailText(p: PartnerInput, meta: Meta): string {
  return [
    "Neue Partner-Anfrage",
    "",
    `Name: ${p.name}`,
    `Firma: ${p.company}`,
    `Rolle: ${labelOf(partnerRoles, p.role)}`,
    `Region (PLZ-Bereich): ${p.region}`,
    `E-Mail: ${p.email}`,
    `Telefon: ${p.phone ?? "–"}`,
    "",
    "Welche Kunden betreuen Sie?",
    p.customers ?? "–",
    "",
    "Datenschutzerklärung bestätigt: ja",
    `Eingegangen: ${meta.receivedAt}`,
  ].join("\n");
}

export function tipEmailText(t: TipInput, report: Report | null, meta: Meta): string {
  return [
    "Neuer Tipp",
    "",
    `Partnercode: ${t.partnerCode}`,
    `Anlass: ${labelOf(tipReasons, t.reason)}`,
    "",
    `Firma des Kunden: ${t.customerCompany}`,
    `Ansprechpartner: ${t.contactPerson}`,
    `Kontakt: ${t.contact}`,
    `Prüfbericht: ${report ? `${report.filename} (im Anhang)` : "nicht mitgeschickt"}`,
    "",
    "Einwilligung des Kunden zur Weitergabe der Kontaktdaten bestätigt: ja",
    `Eingegangen: ${meta.receivedAt}`,
  ].join("\n");
}

export async function sendPartnerEmail(p: PartnerInput, meta: Meta): Promise<void> {
  await sendViaResend({
    toEnv: "PARTNER_INBOX",
    subject: `Partner-Anfrage: ${p.company} (${labelOf(partnerRoles, p.role)})`,
    text: partnerEmailText(p, meta),
    replyTo: p.email,
  });
}

export async function sendTipEmail(t: TipInput, report: Report | null, meta: Meta): Promise<void> {
  await sendViaResend({
    toEnv: "PARTNER_INBOX",
    subject: `Tipp von ${t.partnerCode}: ${t.customerCompany} (${labelOf(tipReasons, t.reason)})`,
    text: tipEmailText(t, report, meta),
    attachments: report ? [{ filename: report.filename, content: Buffer.from(report.content).toString("base64") }] : undefined,
  });
}
