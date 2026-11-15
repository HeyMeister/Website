/**
 * Copy for the landing page. Edit text here; components only handle layout.
 *
 * Page plan: hero · ablauf (3 steps) · leistungen (included services + price card) ·
 * konditionen (typical work, extras, conditions) · filialisten (framework agreement) · kontakt · closing
 * Offer facts (price, scope, conditions) live in content/pricing.ts.
 *
 * Rules: Sie-form, plain language, no invented figures, references or seals, no fear.
 * Norms: never the withdrawn "DIN VDE 0701-0702"; its successors are DIN EN 50699 / 50678.
 */

export const home = {
  hero: {
    eyebrow: "HeyMeister Elektro-Service",
    title: "Ihr fester Ansprechpartner für die Elektrik Ihrer Filiale.",
    lead: "Für 199 € netto pro Monat und Standort übernehmen wir die vereinbarten Elektroprüfungen, behalten Ihre Prüftermine im Blick und unterstützen Sie bei Störungen.",
    meta: "Mindestlaufzeit 12 Monate · Standortaufnahme einmalig 299 € netto",
    primaryCta: "Angebot anfragen",
    secondaryCta: "Leistungen ansehen",
  },

  /** Main action, word for word the same in nav, hero, close and phone bar. */
  mainAction: "Angebot anfragen",

  steps: {
    eyebrow: "So funktioniert es",
    title: "So läuft der Elektro-Service.",
    items: [
      {
        title: "Standortaufnahme",
        text: "Einmalig 299 € netto. Wir erfassen Geräte, Anlagenumfang und Zustand und bestätigen, ob Ihr Standort in das Paket passt.",
      },
      {
        title: "Prüfung nach Plan",
        text: "Ein Prüftermin pro Vertragsjahr. Die Fristen richten sich nach Ihrer Gefährdungsbeurteilung, die Termine stimmen wir rechtzeitig ab.",
      },
      {
        title: "Service bei Störungen",
        text: "Telefonische Ersthilfe, Rückmeldung spätestens am folgenden Arbeitstag und bis zu 3 Serviceeinsätze pro Vertragsjahr.",
      },
    ],
  },

  offer: {
    eyebrow: "Leistungen",
    title: "Diese Leistungen sind enthalten.",
    columns: { service: "Leistung", scope: "Enthaltener Umfang" },
    perMonth: "netto pro Monat und Standort",
    facts: ["Einmalige Standortaufnahme: 299 € netto", "Mindestlaufzeit 12 Monate", "Monatliche Abrechnung"],
    cta: "Angebot anfragen",
  },

  conditions: {
    eyebrow: "Gut zu wissen",
    title: "Konditionen und Zusatzleistungen.",
    typicalTitle: "Typische Servicearbeiten",
    extrasTitle: "Zusätzliche Leistungen",
    conditionsTitle: "Vertragsbeginn und Konditionen",
  },

  framework: {
    eyebrow: "Für Filialisten",
    title: "Ab 10 Standorten: Rahmenvertrag mit Staffelpreisen.",
    points: [
      { title: "Gemeinsame Touren", text: "Wir planen benachbarte Standorte zusammen. Das senkt die Kosten pro Standort." },
      { title: "Eine Rechnung", text: "Alle Standorte auf einer Rechnung, statt vieler einzelner Belege." },
      { title: "Zentrales Dashboard", text: "Alle Standorte, Prüfberichte und Fristen auf einen Blick." },
      { title: "Ein fester Ansprechpartner", text: "Eine Person für alle Ihre Standorte, vom ersten Gespräch an." },
    ],
    cta: "Rahmenvertrag anfragen",
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Ihr Angebot, kostenlos und unverbindlich.",
    text: "Schreiben Sie uns kurz, wie viele Standorte Sie haben. Den Rest klären wir im Gespräch.",
    nextStepsTitle: "So geht es weiter",
    nextSteps: [
      "Sie senden uns Ihre Anfrage.",
      "Leon Ellerbrake meldet sich innerhalb von einem Werktag und klärt Ihre Standorte mit Ihnen.",
      "Bei der Standortaufnahme bestätigen wir, ob Ihr Standort in das Paket passt.",
    ],
    submit: "Unverbindliches Angebot anfordern",
    submitNote: "Kostenlos und unverbindlich.",
  },

  closing: {
    title: "Ein fester Ansprechpartner für alle Ihre Filialen.",
    text: "199 € netto pro Monat und Standort: Prüfung, Fristen, Dokumentation und Service bei Störungen.",
  },

  /**
   * Example data for the Anlagenakte screen (a fictitious "Beispiel GmbH").
   * Status is stored, not computed, so the screen does not change with the current date.
   */
  logbookExample: {
    title: "Digitale Anlagenakte",
    company: "Beispiel GmbH",
    summary: "4 Standorte",
    sites: [
      { name: "Bilk", devices: 24, nextCheck: "2027-02-14", status: "ok", statusLabel: "Geprüft" },
      { name: "Oberkassel", devices: 31, nextCheck: "2026-11-25", status: "due", statusLabel: "Fällig in 10 Tagen" },
      { name: "Flingern", devices: 18, nextCheck: "2026-11-05", status: "overdue", statusLabel: "Überfällig" },
      { name: "Benrath", devices: 27, nextCheck: "2027-05-03", status: "ok", statusLabel: "Geprüft" },
    ],
    report: { name: "Prüfbericht_Bilk_2026-08.pdf", meta: "HM-0412 · 24 Geräte · 1 Mangel behoben" },
  },
} as const;

export type LogbookStatus = "ok" | "due" | "overdue";
