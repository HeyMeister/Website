/**
 * Copy for the landing page (validation mode). Edit text here; components only handle layout.
 *
 * Page plan (one idea per section, each one or two screens tall on desktop):
 *   hero · betriebsbuch (before/after) · leistung (two pillars) · fristen (table) ·
 *   bericht (navy band) · ablauf (steps + photo) · versprechen (statement moment) ·
 *   fuer-wen · preise · pilot · faq · kontakt · closing (close + footer)
 *
 * Rules: Sie-form, no invented figures, references or seals, intervals only with the
 * risk-assessment note, no fear. Photographs are licensed stand-ins (see content/photos.ts).
 */

export const home = {
  hero: {
    /** Two short lines. Kept minimal on purpose: claim, one sentence, one button, the price. */
    titleLines: ["Prüfung & Reparatur", "im Abo."],
    /**
     * Honest version of "never think about electrical compliance again": the operator stays
     * legally responsible (risk assessment), we take the work off their desk.
     */
    lead: "Wir kümmern uns um Prüffristen, Mängel und Nachweise. Sie müssen nicht mehr daran denken.",
    price: "ab 29 € pro Standort und Monat, netto",
    primaryCta: "Angebot anfordern",
  },

  /** Main action, word for word the same in nav, hero, close and phone bar. */
  mainAction: "Angebot anfordern",

  beforeAfter: {
    eyebrow: "Betriebsbuch",
    title: "Aus der Excel-Liste wird ein Betriebsbuch.",
    lead: "Wer Prüffristen für mehrere Standorte in Tabellen pflegt, sucht im entscheidenden Moment das richtige Protokoll. Bei uns liegt alles an einem Ort, für jeden Standort.",
    before: {
      label: "Heute",
      title: "Prüffristen.xlsx",
      rows: [
        { site: "Bilk", last: "03/2025", next: "?", note: "im Ordner" },
        { site: "Oberkassel", last: "?", next: "?", note: "nachfragen" },
        { site: "Flingern", last: "11/2024", next: "11/2025", note: "" },
        { site: "Benrath", last: "06/2025", next: "?", note: "per Mail" },
      ],
      footnote: "Zuletzt bearbeitet von: ?",
    },
    after: { label: "Mit HeyMeister" },
  },

  pillars: {
    eyebrow: "Leistung",
    title: "Zwei Leistungen in einem Abo.",
    lead: "Prüfung vor Ort und Dokumentation gehören zusammen. Sie bekommen beides von einem Ansprechpartner, für alle Standorte.",
    items: [
      {
        title: "Prüfung vor Ort",
        text: "Geprüft wird nach den aktuellen Normen, mit kalibrierten Messgeräten.",
        rows: [
          { label: "Ortsveränderliche Geräte", detail: "DIN EN 50699 (VDE 0702)" },
          { label: "Ortsfeste Anlagen", detail: "DIN VDE 0105-100" },
          { label: "Geräte nach Reparatur", detail: "DIN EN 50678 (VDE 0701)" },
        ],
      },
      {
        title: "Betriebsbuch und Mängel",
        text: "Jede Prüfung landet im digitalen Betriebsbuch. Kleine Mängel beheben wir gleich mit.",
        rows: [
          { label: "Fristenampel", detail: "für alle Standorte" },
          { label: "Prüfbericht als PDF", detail: "nach jeder Prüfung" },
          { label: "Kleinreparaturen", detail: "nach festen Mängelklassen" },
        ],
      },
    ],
  },

  /**
   * Indicative intervals from DGUV Vorschrift 3. Always shown together with `disclaimer`:
   * binding intervals come from the operator's risk assessment.
   */
  intervals: {
    eyebrow: "Fristen und Normen",
    title: "Prüfgegenstände, Fristen und Normen.",
    intro: "Die Fristen sind Richtwerte, keine starren Termine.",
    columns: { item: "Prüfgegenstand", norm: "Norm", interval: "Richtwert", who: "Wer darf prüfen" },
    rows: [
      {
        item: "Ortsfeste Anlagen",
        examples: "Verteilungen, Stromkreise, Steckdosen, Beleuchtung",
        norm: "DIN VDE 0105-100",
        interval: "4 Jahre",
        intervalNote: "In Betriebsstätten, Räumen und Anlagen besonderer Art jährlich.",
        who: "Elektrofachkraft",
      },
      {
        item: "Ortsveränderliche Geräte",
        examples: "Geräte mit Stecker, Verlängerungs- und Anschlussleitungen",
        norm: "DIN EN 50699 (VDE 0702)",
        interval: "6 Monate",
        intervalNote: "Bei einer Fehlerquote unter 2 % verlängerbar, in Büros bis 2 Jahre.",
        who: "Elektrofachkraft oder elektrotechnisch unterwiesene Person unter Aufsicht",
      },
      {
        item: "Geräte nach Reparatur",
        examples: "Instandgesetzte Betriebsmittel",
        norm: "DIN EN 50678 (VDE 0701)",
        interval: "Nach jeder Instandsetzung",
        intervalNote: "",
        who: "Elektrofachkraft",
      },
      {
        item: "Neue oder geänderte Anlagen",
        examples: "Erweiterungen, neue Stromkreise",
        norm: "DIN VDE 0100-600",
        interval: "Vor Inbetriebnahme",
        intervalNote: "",
        who: "Elektrofachkraft",
      },
    ],
    disclaimer:
      "Die verbindlichen Prüffristen legt der Arbeitgeber bzw. Betreiber in seiner Gefährdungsbeurteilung fest. Die Werte aus DGUV Vorschrift 3 (Tabellen 1A bis 1C) sind Richtwerte. Wir unterstützen Sie dabei.",
  },

  report: {
    eyebrow: "Prüfbericht",
    title: "Nach jeder Prüfung ein Bericht, der zeigt, was behoben ist.",
    lead: "Den Prüfbericht erhalten Sie als PDF. Mängel ordnen wir festen Klassen zu, damit klar ist, was im Abo enthalten ist.",
    defects: [
      { label: "Klasse 1", title: "Standardteil, z. B. Stecker oder Abdeckung", resolution: "Direkt bei der Prüfung vor Ort behoben." },
      { label: "Klasse 2", title: "Objektspezifisches Teil", resolution: "Über die Ersatzteilbox oder innerhalb von 10 Werktagen." },
      { label: "Klasse 3", title: "Größerer Aufwand", resolution: "Eigenes Angebot." },
    ],
    note: "Mängel, die vor Vertragsbeginn bestanden, erfassen wir beim Erstbesuch und bieten sie separat an.",
  },

  steps: {
    eyebrow: "Ablauf",
    title: "Vier Schritte bis zum laufenden Abo.",
    items: [
      { title: "Erstbesuch und Anlagenaufnahme", text: "Wir sehen uns jeden Standort an und erfassen Geräte, Verteilungen und Stromkreise." },
      { title: "Prüfplan mit allen Fristen", text: "Sie bekommen einen Prüfplan pro Standort, abgestimmt auf Ihre Gefährdungsbeurteilung." },
      { title: "Regelmäßige Prüfungen", text: "Wir prüfen zu den vereinbarten Terminen. Alles landet im digitalen Betriebsbuch." },
      { title: "Mängel beheben, Bericht liefern", text: "Kleine Mängel beheben wir direkt. Den Prüfbericht erhalten Sie als PDF." },
    ],
  },

  /** Statement moment (word-highlight): 12 to 40 words; the <strong> word turns coral. */
  promise: {
    eyebrow: "Planbar, dokumentiert, ehrlich",
    before: "Wir sagen Ihnen, was Pflicht ist und was nur Richtwert. Wir kommen zum vereinbarten Termin, beheben kleine Mängel direkt und hinterlassen nach jeder Prüfung einen",
    strong: "Nachweis.",
  },

  segments: {
    eyebrow: "Für wen",
    title: "Für Betriebe mit einem oder vielen Standorten.",
    items: [
      {
        title: "Filialisten",
        audience: "5 bis 50 Standorte: Bäckereien, Autohäuser, Gastronomie, Praxen",
        benefit: "Eine Ansprechperson, ein Betriebsbuch für alle Filialen, ein Preis pro Standort.",
      },
      {
        title: "Inhabergeführter Mittelstand",
        audience: "Ein oder wenige Standorte",
        benefit: "Fristen und Nachweise laufen, ohne dass jemand nebenbei daran denken muss.",
      },
      {
        title: "Hausverwaltungen",
        audience: "Gemeinschaftsflächen und Allgemeinstrom",
        benefit: "Prüfberichte pro Objekt, abrufbar für die Eigentümerversammlung. Den Umfang stimmen wir je Objekt ab.",
      },
    ],
  },

  pricing: {
    eyebrow: "Preise",
    prefix: "Ab",
    suffix: "pro Standort und Monat, netto.",
    text: "Der Preis richtet sich nach der Größe des Standorts. Die endgültige Einstufung erfolgt beim Erstbesuch.",
    discountsTitle: "Mengenrabatt",
    setupNote: "Bei 24 Monaten Laufzeit entfällt die einmalige Einrichtungsgebühr.",
    cta: "Preis für Ihre Standorte anfragen",
  },

  pilot: {
    eyebrow: "Pilotprogramm",
    /** Set large as the section's picture (type moment): the pilot period, February to June 2027. */
    dates: { months: "02–06", year: "2027" },
    cta: "Pilotplatz anfragen",
    /** Shown while the conditions in site.ts are still placeholders. */
    conditionsPending: "Die Konditionen für Pilotkunden besprechen wir im Erstgespräch.",
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz beantwortet.",
    intro: "Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.",
    disclaimer: "Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung.",
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
    submit: {
      angebot: "Angebot anfordern",
      erstgespraech: "Erstgespräch anfragen",
      pilot: "Als Pilotkunde anfragen",
    },
    submitNote: "Kostenlos und unverbindlich.",
  },

  closing: {
    title: "Prüffristen im Griff, ab dem ersten Termin.",
    text: "Ein Ansprechpartner, ein Preis pro Standort, ein Betriebsbuch für alles.",
  },

  /**
   * Example data for the logbook screens (a fictitious "Beispiel GmbH").
   * Status is stored, not computed, so the screens do not change with the current date.
   */
  logbookExample: {
    title: "Digitales Betriebsbuch",
    company: "Beispiel GmbH",
    summary: "4 Standorte",
    sites: [
      { name: "Bilk", devices: 24, nextCheck: "2027-02-14", status: "ok", statusLabel: "Geprüft" },
      { name: "Oberkassel", devices: 31, nextCheck: "2026-11-25", status: "due", statusLabel: "Fällig in 12 Tagen" },
      { name: "Flingern", devices: 18, nextCheck: "2026-11-05", status: "overdue", statusLabel: "Überfällig" },
      { name: "Benrath", devices: 27, nextCheck: "2027-05-03", status: "ok", statusLabel: "Geprüft" },
    ],
    report: { name: "Prüfbericht_Bilk_2026-08.pdf", meta: "HM-0412 · 24 Geräte · 1 Mangel behoben" },
    reportPreview: {
      title: "Prüfbericht HM-0412",
      meta: "Standort Bilk · 14.08.2026",
      rows: [
        { item: "Kaffeevollautomat", id: "G-0031", result: "Bestanden", ok: true },
        { item: "Verlängerung 5 m", id: "G-0032", result: "Bestanden", ok: true },
        { item: "Monitor Empfang", id: "G-0033", result: "Bestanden", ok: true },
        { item: "Wasserkocher", id: "G-0034", result: "Mangel behoben", ok: true },
        { item: "Mehrfachsteckdose Lager", id: "G-0035", result: "Bestanden", ok: true },
      ],
      summary: [
        { label: "Geprüft", value: "24" },
        { label: "Mängel", value: "1" },
        { label: "Behoben", value: "1" },
      ],
      next: "Nächste Prüfung: 14.02.2027",
    },
  },
} as const;

export type LogbookStatus = "ok" | "due" | "overdue";
