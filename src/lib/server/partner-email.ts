import "server-only";
import { labelOf, partnerServices, partnerTeamSizes, type PartnerInput } from "@/lib/partner-schema";
import type { Meta } from "@/lib/partner-handler";
import { sendViaResend } from "./email";

/** Specialist-partner applications, sent to the site's contact address like every form. */

export function partnerEmailText(p: PartnerInput, meta: Meta): string {
  return [
    "Neue Fachpartner-Bewerbung",
    "",
    `Betrieb: ${p.company}`,
    `Ansprechpartner: ${p.name}`,
    `E-Mail: ${p.email}`,
    `Telefon: ${p.phone ?? "–"}`,
    `Einsatzgebiet: ${p.region}`,
    `Leistungen: ${labelOf(partnerServices, p.services)}`,
    `Mitarbeitende: ${p.teamSize ? labelOf(partnerTeamSizes, p.teamSize) : "–"}`,
    "",
    "Anmerkungen:",
    p.message ?? "–",
    "",
    "Datenschutzerklärung bestätigt: ja",
    `Eingegangen: ${meta.receivedAt}`,
  ].join("\n");
}

export async function sendPartnerEmail(p: PartnerInput, meta: Meta): Promise<void> {
  await sendViaResend({
    subject: `Fachpartner-Bewerbung: ${p.company} (${p.region})`,
    text: partnerEmailText(p, meta),
    replyTo: p.email,
  });
}
