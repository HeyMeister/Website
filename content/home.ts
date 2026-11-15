/**
 * Copy for the landing page. Edit text here; components only handle layout.
 *
 * Page plan: hero · ablauf (3 steps) · leistungen (6 services + Anlagenakte) ·
 * pakete (5 packages + small print) · filialisten (framework agreement) · kontakt · closing
 *
 * Rules: Sie-form, plain language, no invented figures, references or seals, no fear.
 * Norms: never the withdrawn "DIN VDE 0701-0702"; its successors are DIN EN 50699 / 50678.
 */

export const home = {
  hero: {
    title: "Elektroprüfung für alle Ihre Standorte – ein Vertrag, ein Ansprechpartner.",
    lead: "Ein fester Monatspreis pro Standort. Alle Prüfungen digital dokumentiert. Keine Frist mehr verpasst.",
    primaryCta: "Angebot anfragen",
    secondaryCta: "Pakete ansehen",
  },

  /** Main action, word for word the same in nav, hero, close and phone bar. */
  mainAction: "Angebot anfragen",

  steps: {
    eyebrow: "So funktioniert es",
    title: "In drei Schritten zum laufenden Vertrag.",
    items: [
      { title: "Bestandsaufnahme", text: "Wir erfassen alle Geräte und Anlagen an jedem Ihrer Standorte." },
      { title: "Prüfplan", text: "Wir planen alle Prüfungen und erledigen sie zu festen Terminen." },
      { title: "Digitale Anlagenakte", text: "Alle Prüfberichte und Fristen online, für jeden Standort und jederzeit abrufbar." },
    ],
  },

  services: {
    eyebrow: "Leistungen",
    title: "Alles, was die Elektrik Ihrer Standorte braucht.",
    lead: "Geprüft wird nach DGUV Vorschrift 3 und den aktuellen Normen. Was Sie im Paket haben, steht vorher fest.",
    items: [
      {
        icon: "plug",
        title: "Prüfung ortsveränderlicher Geräte",
        text: "Alle Geräte mit Stecker, nach DGUV Vorschrift 3 und DIN EN 50699 / 50678 (VDE 0702 / 0701).",
      },
      {
        icon: "bolt",
        title: "Wiederkehrende Prüfung der festen Anlage",
        text: "Verteilungen, Stromkreise und fest angeschlossene Geräte nach DIN VDE 0105-100.",
      },
      { icon: "wrench", title: "Kleinreparaturen inkl. Material-Budget", text: "Kleine Mängel beheben wir direkt, mit Stunden- und Materialbudget je nach Paket." },
      { icon: "thermo", title: "Thermografie von Verteilungen", text: "Wärmebilder zeigen lose Klemmen und überlastete Bauteile frühzeitig." },
      { icon: "file", title: "Digitale Dokumentation & Fristenmanagement", text: "Prüfberichte und Fristen für jeden Standort in der digitalen Anlagenakte." },
      { icon: "person", title: "Ein Ansprechpartner für alle Standorte", text: "Ein fester Kontakt, der Ihre Standorte kennt und sich um alles kümmert." },
    ],
  },

  packages: {
    eyebrow: "Pakete",
    title: "Ein fester Preis pro Standort und Monat.",
    lead: "Alle Preise sind Ab-Preise pro Standort und Monat, zzgl. MwSt., bei 36 Monaten Mindestlaufzeit.",
    popularLabel: "Beliebt",
    largeTitle: "Für größere Standorte und Lager",
    perMonth: "pro Standort und Monat",
    limitsDevices: "Geräte",
    limitsCircuits: "Stromkreise",
    upTo: "bis",
    cta: "Angebot anfragen",
    smallPrintTitle: "Gut zu wissen",
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
      "Sie erhalten Ihr Angebot zum festen Preis pro Standort und Monat.",
    ],
    submit: "Unverbindliches Angebot anfordern",
    submitNote: "Kostenlos und unverbindlich.",
  },

  closing: {
    title: "Ein Vertrag für alle Ihre Standorte.",
    text: "Fester Preis pro Standort, digitale Anlagenakte, ein Ansprechpartner.",
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
