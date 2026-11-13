/**
 * Copy for the landing page (validation mode) and the home page (full mode).
 * Edit text here; components only handle layout.
 */

export const home = {
  hero: {
    /** Label above the headline; keeps the search term at the top. */
    eyebrow: "Elektroprüfung im Abo nach DGUV Vorschrift 3",
    title: "Prüffristen im Griff. An jedem Standort, zum festen Preis.",
    lead: "Wir prüfen Ihre Geräte und Anlagen, führen das digitale Betriebsbuch und beheben kleine Mängel direkt bei der Prüfung. Sie sehen jederzeit, was geprüft ist und was als Nächstes fällig wird.",
    /** Rendered as "ab 29 € pro Standort und Monat, netto" (price from pricing.ts). */
    priceSuffix: "pro Standort und Monat, netto",
    priceNote: "Erstgespräch kostenlos und unverbindlich",
    primaryCta: "Angebot anfordern",
    secondaryCta: "Erstgespräch buchen",
  },

  problem: {
    eyebrow: "Warum das Thema liegen bleibt",
    title: "Betreiberpflichten sind Daueraufgaben",
    items: [
      {
        title: "Fristen im Blick",
        text: "Jeder Standort hat eigene Prüffristen. Wer sie in Excel oder im Kopf verwaltet, verliert sie irgendwann aus den Augen.",
      },
      {
        title: "Nachweise, wenn sie gebraucht werden",
        text: "Versicherer, Berufsgenossenschaft und Arbeitsschutzbehörde fragen nach Prüfprotokollen. Fehlt der Nachweis, kann der Versicherer im Schadensfall die Leistung kürzen.",
      },
      {
        title: "Mängel nicht nur notieren",
        text: "Ein Prüfbericht voller Mängel hilft niemandem. Wir beheben kleine Mängel direkt bei der Prüfung.",
      },
    ],
  },

  steps: {
    eyebrow: "So funktioniert es",
    title: "Vier Schritte, dann läuft es",
    items: [
      {
        title: "Erstbesuch und Anlagenaufnahme",
        text: "Wir sehen uns jeden Standort an und erfassen Geräte, Verteilungen und Stromkreise.",
      },
      {
        title: "Prüfplan mit allen Fristen",
        text: "Sie bekommen einen Prüfplan pro Standort. Die Fristen stimmen wir mit Ihrer Gefährdungsbeurteilung ab.",
      },
      {
        title: "Regelmäßige Prüfungen",
        text: "Wir prüfen zu den vereinbarten Terminen. Alles landet im digitalen Betriebsbuch.",
      },
      {
        title: "Mängel beheben, Bericht liefern",
        text: "Kleine Mängel beheben wir direkt. Den Prüfbericht erhalten Sie als PDF.",
      },
    ],
  },

  included: {
    eyebrow: "Leistung",
    title: "Was im Abo enthalten ist",
    intro: "Ein Ansprechpartner für alle Standorte. Geprüft wird nach den aktuellen Normen.",
    items: [
      {
        title: "Ortsveränderliche Geräte",
        text: "Prüfung ortsveränderlicher elektrischer Betriebsmittel nach DIN EN 50699 (VDE 0702), nach Reparatur nach DIN EN 50678 (VDE 0701).",
      },
      {
        title: "Ortsfeste Anlagen",
        text: "Prüfung ortsfester elektrischer Anlagen nach DIN VDE 0105-100, Erst- und Änderungsprüfungen nach DIN VDE 0100-600.",
      },
      {
        title: "Digitales Betriebsbuch",
        text: "Alle Standorte, Fristen und Ergebnisse an einem Ort, mit Fristenampel. Prüfberichte als PDF.",
      },
      {
        title: "Kleinreparaturen",
        text: "Mängel beheben wir nach festen Mängelklassen, damit klar ist, was im Preis enthalten ist.",
      },
    ],
  },

  defects: {
    title: "Kleinreparaturen nach Mängelklassen",
    items: [
      {
        label: "Klasse 1",
        title: "Standardteil",
        example: "z. B. Stecker, Abdeckung",
        resolution: "Direkt bei der Prüfung vor Ort behoben.",
      },
      {
        label: "Klasse 2",
        title: "Objektspezifisches Teil",
        resolution: "Über die Ersatzteilbox oder innerhalb von 10 Werktagen.",
      },
      {
        label: "Klasse 3",
        title: "Größerer Aufwand",
        resolution: "Eigenes Angebot.",
      },
    ],
    note: "Mängel, die vor Vertragsbeginn bestanden, sind nicht im Abo enthalten. Wir erfassen sie beim Erstbesuch und machen Ihnen ein separates Angebot.",
  },

  /**
   * Indicative intervals from DGUV Vorschrift 3. Always shown together with `disclaimer`:
   * binding intervals come from the operator's risk assessment.
   */
  intervals: {
    eyebrow: "Fristen und Normen",
    title: "Was geprüft wird, wie oft und von wem",
    intro: "Ein Überblick über die Prüfungen im Abo. Die Fristen sind Richtwerte, keine starren Termine.",
    columns: { item: "Prüfgegenstand", norm: "Norm", interval: "Richtwert", who: "Wer darf prüfen" },
    rows: [
      {
        item: "Ortsfeste Anlagen",
        examples: "Verteilungen, Stromkreise, Steckdosen, Beleuchtung, fest angeschlossene Geräte",
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
        who: "Elektrofachkraft oder elektrotechnisch unterwiesene Person mit geeignetem Prüfgerät, unter Aufsicht einer Elektrofachkraft",
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

  segments: {
    eyebrow: "Für wen",
    title: "Für Betriebe mit einem oder vielen Standorten",
    items: [
      {
        title: "Filialisten",
        audience: "5 bis 50 Standorte: Bäckereien, Autohäuser, Gastronomie, Praxen",
        pain: "Viele Standorte, unterschiedliche Dienstleister je Filiale und keine gemeinsame Übersicht.",
        benefit: "Eine Ansprechperson, ein Betriebsbuch für alle Filialen, ein Preis pro Standort.",
        note: "",
      },
      {
        title: "Inhabergeführter Mittelstand",
        audience: "Inhabergeführte Betriebe mit einem oder wenigen Standorten",
        pain: "Arbeitssicherheit macht eine Person nebenbei, zwischen allen anderen Aufgaben.",
        benefit: "Fristen und Nachweise laufen, ohne dass jemand daran denken muss.",
        note: "",
      },
      {
        title: "Hausverwaltungen",
        audience: "Gemeinschaftsflächen und Allgemeinstrom in verwalteten Objekten",
        pain: "Eigentümer und Versicherer fragen nach Nachweisen, die über viele Objekte verteilt sind.",
        benefit: "Prüfberichte pro Objekt, abrufbar für die Eigentümerversammlung.",
        note: "Den Leistungsumfang für Wohngebäude stimmen wir je Objekt mit Ihnen ab.",
      },
    ],
  },

  pricingTeaser: {
    eyebrow: "Preise",
    prefix: "ab",
    suffix: "pro Standort und Monat, netto",
    text: "Der Preis richtet sich nach der Größe des Standorts. Die endgültige Einstufung erfolgt beim Erstbesuch.",
    discountsTitle: "Mengenrabatt",
    setupNote: "Bei 24 Monaten Laufzeit entfällt die einmalige Einrichtungsgebühr.",
    fullLink: "Alle Preise und Rechner",
    cta: "Angebot anfordern",
  },

  promise: {
    eyebrow: "Wer dahinter steht",
    title: "Planbar, dokumentiert, ehrlich",
    values: [
      {
        title: "Planbar",
        text: "Sie wissen, wann wir kommen, was es kostet und was Sie bekommen. Ein fester Preis pro Standort und Monat.",
      },
      {
        title: "Dokumentiert",
        text: "Jede Prüfung hinterlässt einen Nachweis. Fristen und Status sehen Sie jederzeit im digitalen Betriebsbuch.",
      },
      {
        title: "Ehrlich",
        text: "Wir sagen, was Pflicht ist und was Richtwert. Keine Angstmache und keine Rechtsberatung.",
      },
    ],
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz beantwortet",
    intro: "Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.",
    disclaimer: "Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung.",
  },

  references: {
    placeholder: "Referenzen folgen nach Freigabe durch Kunden",
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Angebot anfordern oder Erstgespräch buchen",
    text: "Schreiben Sie uns kurz, wie viele Standorte Sie haben. Wir melden uns innerhalb von einem Werktag.",
  },

  /**
   * Example data for the logbook mockup. Shown with an "Beispieldaten" label.
   * Status is stored, not computed, so the mockup does not change with the current date.
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
    report: { name: "Prüfbericht_Bilk_2026-09.pdf", meta: "HM-0412 · 24 Geräte · 1 Mangel behoben" },
  },
} as const;

export type LogbookStatus = "ok" | "due" | "overdue";
