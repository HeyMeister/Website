/**
 * Partner programme page (/partner): copy and configuration.
 *
 * Audience: tip-givers, mainly commercial insurance brokers, also occupational safety
 * specialists, property-management service providers and planners.
 *
 * TODO before launch (shown as visible [PLACEHOLDERS] on the page until then):
 * - partnerConfig.commissionMaxPercent: the real maximum commission rate
 * - partnerConfig.payoutRhythm: how often commissions are paid out
 * - Confirm the policy answers in the FAQ (known customers, no territory protection).
 */
import type { FaqItem } from "./faq";

export const partnerConfig = {
  /** TODO: maximum commission on projects in percent, e.g. "5". Keep the brackets until decided. */
  commissionMaxPercent: "[X]",
  /** TODO: payout rhythm, e.g. "monatlich" or "quartalsweise". */
  payoutRhythm: "[TODO: monatlich oder quartalsweise]",
  /** Response time promised to the partner after a tip. */
  responseTime: "innerhalb von 24 Stunden",
} as const;

export const partner = {
  seo: {
    title: "Partner werden: Provision für Tipps",
    description:
      "Partnerprogramm Elektro für Gewerbemakler: Sie geben den Tipp, wir beheben Mängel nach SK 3602 und DGUV V3 zum Festpreis. Provision nach Zahlung.",
    keywords: ["Partnerprogramm Elektro", "Tippgeber Provision", "SK 3602 Mängel beheben", "VdS 3602", "DGUV V3 Mängel"],
  },

  hero: {
    eyebrow: "Partnerprogramm",
    title: "Ihre Gewerbekunden haben Mängel im Prüfbericht? Wir beheben sie – Sie erhalten eine Provision.",
    lead: "Sie geben uns mit Einwilligung Ihres Kunden den Kontakt, wir machen ein Festpreisangebot und beheben die Mängel. Nach Zahlungseingang erhalten Sie Ihre Provision.",
    cta: "Partner werden",
    secondary: "Tipp einreichen",
  },

  /** Example status message for the hero (fictitious customer, clearly marked as an example). */
  statusExample: {
    label: "Beispiel einer Statusmeldung",
    tip: "Tipp HM-0042",
    customer: "Beispielhotel GmbH",
    reason: "Mängel aus Prüfbericht nach SK 3602",
    steps: [
      { title: "Tipp eingegangen", date: "03.03.", done: true },
      { title: "Kunde erreicht, Termin vor Ort", date: "04.03.", done: true },
      { title: "Festpreisangebot verschickt", date: "06.03.", done: true },
      { title: "Auftrag erteilt", date: "10.03.", done: true },
      { title: "Provision nach Zahlungseingang", date: "offen", done: false },
    ],
  },

  steps: {
    eyebrow: "So funktioniert's",
    title: "Drei Schritte vom Tipp zur Provision.",
    items: [
      { icon: "send", title: "Kontakt übermitteln", text: "Sie geben uns den Kontakt Ihres Kunden weiter, mit seiner Einwilligung." },
      { icon: "offer", title: "Festpreisangebot", text: `HeyMeister meldet sich ${partnerConfig.responseTime} beim Kunden und macht ein Angebot zum Festpreis.` },
      { icon: "payout", title: "Provision", text: "Nach Zahlungseingang des Kunden erhalten Sie Ihre Provision." },
    ],
  },

  audiences: {
    eyebrow: "Für wen",
    title: "Für alle, die Gewerbekunden beraten.",
    items: [
      { title: "Gewerbemakler", occasion: "Beim Policengespräch kommt die Prüfung nach SK 3602 auf den Tisch." },
      { title: "Fachkräfte für Arbeitssicherheit", occasion: "Bei der Begehung fallen Mängel an der Elektrik auf, die jemand beheben muss." },
      { title: "Hausverwaltungs-Dienstleister", occasion: "Der Prüfbericht für ein Objekt liegt vor, die Mängelliste ist noch offen." },
      { title: "Planer und Architekten", occasion: "Bei Umbau oder Sanierung braucht der Bauherr einen Elektrobetrieb mit festem Preis." },
    ],
  },

  benefits: {
    eyebrow: "Was Sie davon haben",
    title: "Provision für Ihren Tipp, ohne Verkaufsaufwand.",
    commissionPrefix: "bis zu",
    commissionSuffix: "% auf Projekte",
    recurring: "Laufende Beteiligung an Prüf-Abos",
    items: [
      { title: "Statusmeldung zu jedem Tipp", text: "Sie wissen, ob wir den Kunden erreicht haben, ob ein Angebot steht und ob der Auftrag kommt." },
      { title: "Kein Verkaufsaufwand", text: "Sie geben den Kontakt weiter. Angebot, Termine und Ausführung übernehmen wir." },
      { title: "Keine Mindestmengen", text: "Ein Tipp im Jahr ist genauso willkommen wie zehn im Monat." },
    ],
  },

  conduct: {
    eyebrow: "Was wir von Partnern erwarten",
    title: "Ein kurzer Verhaltenskodex.",
    items: [
      { title: "Nur mit Einwilligung", text: "Sie geben Kontaktdaten nur weiter, wenn der Kunde zugestimmt hat." },
      { title: "Keine Kaltakquise", text: "Bitte sprechen Sie keine Unternehmen ungefragt in unserem Namen an." },
      { title: "Keine Zusagen in unserem Namen", text: "Preise, Termine und Leistungen sagen wir dem Kunden selbst zu." },
      { title: "Provision offenlegen", text: "Wo es für Sie vorgeschrieben ist, legen Sie die Provision gegenüber dem Kunden offen." },
    ],
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Fragen zum Partnerprogramm.",
    disclaimer: "Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung.",
  },

  signup: {
    eyebrow: "Partner werden",
    title: "Als Partner registrieren.",
    text: "Wir melden uns, stimmen die Zusammenarbeit mit Ihnen ab und schicken Ihnen Ihren Partnercode.",
    submit: "Partner werden",
    success: "Danke. Ihre Anfrage ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen.",
  },

  tip: {
    eyebrow: "Für bestehende Partner",
    title: "Tipp einreichen.",
    text: "Mit Ihrem Partnercode. Den Prüfbericht können Sie direkt mitschicken.",
    submit: "Tipp senden",
    success: `Danke. Wir haben Ihren Tipp erhalten und melden uns ${partnerConfig.responseTime} beim Kunden.`,
  },
} as const;

export const partnerFaq: FaqItem[] = [
  {
    id: "vermittler",
    question: "Muss ich Versicherungsvermittler sein?",
    answer: [
      "Nein. Partner kann werden, wer beruflich mit Gewerbekunden zu tun hat, zum Beispiel als Makler, Fachkraft für Arbeitssicherheit oder Planer. Sie empfehlen einen Elektrofachbetrieb, Sie vermitteln keine Versicherung.",
    ],
  },
  {
    id: "ausschliesslichkeit",
    question: "Brauche ich eine Genehmigung als Ausschließlichkeitsvertreter?",
    answer: [
      "Das hängt von Ihrem Agenturvertrag ab. Viele Verträge regeln Nebentätigkeiten und Empfehlungen an Dritte. Bitte klären Sie das vorab mit Ihrem Versicherer.",
    ],
  },
  {
    id: "zahlung",
    question: "Wann wird gezahlt?",
    answer: [`Nach Zahlungseingang des Kunden. Die Provision rechnen wir ${partnerConfig.payoutRhythm} per Gutschrift ab.`],
  },
  {
    id: "bekannt",
    question: "Was passiert, wenn der Kunde schon bekannt ist?",
    answer: [
      "Steht der Kunde bereits mit uns in Kontakt oder ist er schon Kunde, ist der Tipp nicht provisionsfähig. Das sagen wir Ihnen offen in der Statusmeldung.",
    ],
  },
  {
    id: "gebiet",
    question: "Gibt es Gebietsschutz?",
    answer: ["Nein. Es gibt keinen Gebietsschutz und keine Exklusivität."],
  },
  {
    id: "privat",
    question: "Arbeiten Sie auch mit Privatkunden?",
    answer: ["Nein. Wir arbeiten nur für Gewerbekunden, zum Beispiel Hausverwaltungen, Hotels, Pflegeheimbetreiber und Bauträger."],
  },
];
