/**
 * Copy for the landing page (validation mode) and the home page (full mode).
 * Edit text here; components only handle layout.
 */

export const home = {
  hero: {
    title: "Elektroprüfung im Abo. Alle Standorte, ein fester Preis.",
    lead: "Wir übernehmen Ihre Betreiberpflichten nach DGUV Vorschrift 3 und Betriebssicherheitsverordnung: Prüfung, digitales Betriebsbuch und Kleinreparaturen zum Monatspreis pro Standort.",
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
        resolution: "Sofort vor Ort behoben.",
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

  pricingTeaser: {
    eyebrow: "Preise",
    prefix: "ab",
    suffix: "pro Standort und Monat, netto",
    text: "Der Preis richtet sich nach der Größe des Standorts. Ab 5 Standorten gibt es Mengenrabatt. Bei 24 Monaten Laufzeit entfällt die Einrichtungsgebühr.",
    fullLink: "Alle Preise und Rechner",
    cta: "Angebot anfordern",
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz beantwortet",
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
      { name: "Filiale Bilk", type: "Bäckerei", nextCheck: "2027-03-18", status: "ok", statusLabel: "Fristgerecht" },
      { name: "Filiale Oberkassel", type: "Bäckerei", nextCheck: "2026-12-04", status: "due", statusLabel: "Fällig in 21 Tagen" },
      { name: "Filiale Benrath", type: "Bäckerei", nextCheck: "2026-11-02", status: "overdue", statusLabel: "Überfällig" },
      { name: "Produktion Flingern", type: "Backstube", nextCheck: "2027-06-30", status: "ok", statusLabel: "Fristgerecht" },
    ],
    report: { name: "Prüfbericht_Filiale-Bilk_2026-09.pdf", meta: "Geräteprüfung · 42 Geräte · 1 Mangel behoben" },
  },
} as const;

export type LogbookStatus = "ok" | "due" | "overdue";
