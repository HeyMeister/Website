/**
 * Copy for the homepage. Edit text here; components only handle layout.
 *
 * Positioning: electrical work as a full service, like an insurance for your electrics, only with
 * a master electrician instead of a form.
 *
 * Rules for every text on the site:
 * - Never "Versicherung" without "wie". HeyMeister is no insurance product.
 * - Liability honestly: the operator is responsible, the insurer may cut benefits, the BG may claim
 *   recourse for gross negligence. No fear, no legal advice.
 * - Intervals always with the risk-assessment note. No general emergency-lighting duty.
 * - One goal per page: primary CTA "Kostenlosen Standort-Check anfordern", secondary
 *   "15-Minuten-Gespräch buchen". Phone number always visible.
 * - No invented figures, logos or customer quotes.
 *
 * Page plan: hero · problem · kern (like an insurance) · vergleich · abo · ablauf · fuer-wen ·
 * preise · meister · pilot · faq · kontakt
 */

export const cta = {
  /** Primary action, word for word the same everywhere. */
  primary: "Kostenlosen Standort-Check anfordern",
  /** Short form for the header bar. */
  primaryShort: "Standort-Check anfordern",
  secondary: "15-Minuten-Gespräch buchen",
  micro: "Unverbindlich · Antwort innerhalb eines Werktags · Kein Verkaufsdruck",
} as const;

export const home = {
  hero: {
    eyebrow: "Prüfung · Reparatur · Betriebsbuch",
    /**
     * Headline (recommendation). Alternatives to test:
     * - "Prüfung und Reparatur im Abo. Für alle Ihre Standorte."
     * - "Ihre Elektrik ist geprüft. Ihre Mängel sind behoben. Sie haben nichts dafür getan."
     * - "Elektroprüfung, Reparatur, Nachweise. Ein Partner, ein fester Preis."
     */
    title: "Elektro im Full-Service. Sie müssen nie wieder daran denken.",
    lead: "Wir prüfen Ihre Geräte und Anlagen nach DGUV Vorschrift 3, beheben Mängel direkt vor Ort und führen Ihr digitales Betriebsbuch. Zum festen Monatspreis pro Standort, vom Meisterbetrieb aus Düsseldorf.",
  },

  /** Trust bar under the hero. The Handwerksrolle item only shows once site.trust.handwerksrolle is on. */
  trust: {
    meisterbetrieb: "Meisterbetrieb",
    handwerksrolle: "Eingetragen in der Handwerksrolle",
    norms: "Prüfung nach DGUV V3 und BetrSichV",
    logbook: "Digitales Betriebsbuch inklusive",
  },

  problem: {
    eyebrow: "Kennen Sie das?",
    title: "Elektrik ist Chefsache. Aber niemand hat Zeit dafür.",
    items: [
      {
        icon: "file",
        title: "„Wann wurde eigentlich zuletzt geprüft?“",
        text: "Die Antwort steht in einem Ordner, in einer Excel-Liste oder nirgends. Spätestens wenn der Versicherer fragt, wird es hektisch.",
      },
      {
        icon: "people",
        title: "„Kein Elektriker hat Zeit.“",
        text: "Für zwei defekte Steckdosen kommt niemand. Und wenn doch, dann in sechs Wochen.",
      },
      {
        icon: "list",
        title: "„Der Prüfbericht liegt seit Monaten in der Schublade.“",
        text: "Mängel notiert, nichts behoben. Auf dem Papier ist das schlimmer, als gar nicht geprüft zu haben.",
      },
      {
        icon: "euro",
        title: "„Jede Rechnung ist eine Überraschung.“",
        text: "Anfahrt, Stundensatz, Kleinmaterial. Planen lässt sich das nicht.",
      },
    ],
  },

  core: {
    eyebrow: "Der Kern",
    title: "Wie eine Versicherung für Ihre Elektrik. Nur dass wir wirklich vorbeikommen.",
    lead: "Sie zahlen einen festen Betrag im Monat. Dafür kümmern wir uns um alles, was an Elektroprüfung und Kleinreparatur anfällt. Bevor etwas passiert, nicht erst danach.",
    items: [
      {
        icon: "shield",
        title: "Compliance ohne Aufwand",
        text: "Prüfungen nach DGUV Vorschrift 3 und Betriebssicherheitsverordnung, fristgerecht und dokumentiert. Wir planen die Termine, Sie bekommen den Nachweis.",
      },
      {
        icon: "calendar",
        title: "Sie müssen nicht mehr daran denken",
        text: "Keine Fristen im Kalender, keine Angebote einholen, keine Handwerker hinterhertelefonieren. Wir melden uns, bevor etwas fällig ist.",
      },
      {
        icon: "person",
        title: "Persönliches Haftungsrisiko senken",
        text: "Für den sicheren Zustand der Elektrik ist der Betreiber verantwortlich, also die Geschäftsführung. Mit lückenlosen Prüfnachweisen zeigen Sie, dass Sie Ihrer Pflicht nachgekommen sind. Fehlen sie nach einem Schaden, kann der Versicherer die Leistung kürzen.",
      },
      {
        icon: "euro",
        title: "Kosten, die Sie vorher kennen",
        text: "Ein Monatspreis pro Standort, Kleinreparaturen inklusive. Kein Stundenzettel, keine Anfahrtspauschale, kein Kleinmaterial auf der Rechnung.",
      },
      {
        icon: "tool",
        title: "Ein Elektriker, der wirklich kommt",
        text: "Sie sind Abo-Kunde, kein Gelegenheitsauftrag. Deshalb haben Sie bei uns einen festen Platz im Tourenplan und eine feste Ansprechperson.",
      },
      {
        icon: "list",
        title: "Alles auf einen Blick",
        text: "Alle Standorte, alle Geräte, alle Fristen im digitalen Betriebsbuch. Ampel grün, gelb, rot. Prüfberichte als PDF, jederzeit abrufbar, auch für Versicherer und Berufsgenossenschaft.",
      },
    ],
    closing: "Ein Anruf, und das Thema ist erledigt.",
  },

  compare: {
    eyebrow: "Vorher und nachher",
    title: "Was sich für Sie ändert",
    columns: { topic: "Thema", without: "Ohne HeyMeister", with: "Mit HeyMeister" },
    rows: [
      { topic: "Prüffristen", without: "Im Kopf oder in Excel", with: "Wir planen, Sie werden informiert" },
      { topic: "Nachweise", without: "Suchen, wenn jemand fragt", with: "Digital, auf Knopfdruck" },
      { topic: "Mängel", without: "Im Bericht notiert, liegen geblieben", with: "Kleine Mängel direkt behoben" },
      { topic: "Elektriker finden", without: "Anrufen, warten, nachhaken", with: "Feste Ansprechperson, feste Termine" },
      { topic: "Kosten", without: "Jede Rechnung anders", with: "Ein Monatspreis pro Standort" },
      { topic: "Mehrere Standorte", without: "Mehrere Dienstleister", with: "Ein Partner, ein Betriebsbuch" },
    ],
  },

  included: {
    eyebrow: "Was im Abo steckt",
    title: "Prüfen, reparieren, dokumentieren. Alles drin.",
    items: [
      {
        title: "Geräteprüfung",
        text: "Alle ortsveränderlichen Geräte nach DIN EN 50699 (VDE 0702), nach Reparatur nach DIN EN 50678 (VDE 0701).",
        href: "/leistungen/geraete",
      },
      {
        title: "Anlagenprüfung",
        text: "Ortsfeste Anlagen nach DIN VDE 0105-100, durch eine Elektrofachkraft.",
        href: "/leistungen/anlagen",
      },
      {
        title: "Kleinreparaturen inklusive",
        text: "",
        bullets: [
          "Standardteile (Stecker, Abdeckung, Leitung) tauschen wir sofort vor Ort.",
          "Objektspezifische Teile innerhalb von 10 Werktagen.",
          "Größere Arbeiten: eigenes, transparentes Angebot.",
        ],
        href: "/leistungen/reparatur",
      },
      {
        title: "Digitales Betriebsbuch",
        text: "Mit Fristenampel und Prüfberichten als PDF.",
        href: "/leistungen/betriebsbuch",
      },
      {
        title: "Feste Ansprechperson",
        text: "Für alle Standorte.",
      },
    ],
    note: "Mängel, die vor Vertragsbeginn bestanden, erfassen wir beim Erstbesuch und bieten sie separat an.",
  },

  steps: {
    eyebrow: "So funktioniert es",
    title: "In vier Schritten zum Thema, um das Sie sich nicht mehr kümmern.",
    items: [
      { title: "Kostenloser Standort-Check", text: "15 Minuten am Telefon: Wie viele Standorte, welche Geräte, wann zuletzt geprüft?" },
      { title: "Erstbesuch und Bestandsaufnahme", text: "Wir erfassen Ihre Anlagen und Geräte und erstellen Ihren Prüfplan." },
      { title: "Prüfen und direkt reparieren", text: "Regelmäßig, nach Plan, mit Prüfplakette und Bericht." },
      { title: "Fertig", text: "Alles steht im Betriebsbuch. Wir melden uns, wenn es wieder so weit ist." },
    ],
  },

  segments: {
    eyebrow: "Für wen",
    title: "Gemacht für Betriebe, in denen Elektrik arbeiten muss.",
  },

  priceTeaser: {
    eyebrow: "Preise",
    title: "Ein fester Preis pro Standort. Keine Überraschungen.",
    prefix: "Ab",
    suffix: "pro Standort und Monat, netto.",
    points: ["Kleinreparaturen inklusive.", "Mengenrabatt ab 5 Standorten."],
    cta: "Preis für Ihre Standorte berechnen",
  },

  meister: {
    eyebrow: "Der Meister dahinter",
    title: "Kein Callcenter. Ein Meisterbetrieb.",
  },

  pilot: {
    eyebrow: "Pilotprogramm",
    title: "Pilotkunde werden.",
    text: "Von Februar bis Juni 2027 nehmen wir eine begrenzte Zahl von Betrieben im Raum Düsseldorf zu Pilotkonditionen auf.",
    conditions: "Keine Einrichtungsgebühr, direkter Draht zum Meister, Feedbackgespräch nach drei Monaten.",
    cta: "Platz anfragen",
    more: "Mehr zum Pilotprogramm",
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Ihre Fragen, kurz beantwortet.",
    intro: "Ihre Frage ist nicht dabei? Rufen Sie uns an.",
    disclaimer: "Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung.",
  },

  contact: {
    eyebrow: "Standort-Check",
    title: "Ein Anruf. Danach ist Elektro nicht mehr Ihr Thema.",
    text: "Erzählen Sie uns in 15 Minuten, wie viele Standorte Sie haben. Sie bekommen eine ehrliche Einschätzung und ein festes Angebot.",
    nextStepsTitle: "So geht es weiter",
    nextSteps: [
      "Sie senden uns Ihre Anfrage.",
      "Wir melden uns innerhalb eines Werktags für den Standort-Check (15 Minuten).",
      "Sie erhalten eine ehrliche Einschätzung und ein festes Angebot.",
    ],
    submitNote: "Wir melden uns innerhalb eines Werktags. Ihre Daten nutzen wir nur für Ihre Anfrage.",
  },

  /** Close above the footer on every page. */
  closing: {
    title: "Ein Anruf, und das Thema ist erledigt.",
    text: "Prüfen, reparieren, dokumentieren. Zum festen Monatspreis pro Standort.",
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
      "Die verbindlichen Prüffristen legen Sie in Ihrer Gefährdungsbeurteilung fest. Die Werte aus DGUV Vorschrift 3 (Tabellen 1A bis 1C) sind Richtwerte. Wir unterstützen Sie dabei.",
  },

  /**
   * Example data for the logbook screens (a fictitious "Beispiel GmbH"), always labelled as an
   * example. Status is stored, not computed, so the screens do not change with the current date.
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
