/**
 * Copy for the remaining pages: Betreiberpflichten (guide), Preise, Pilot, Über uns, Karriere,
 * Kontakt and Danke. Text in [SQUARE BRACKETS] is a placeholder and must be filled before launch.
 */

export const guide = {
  seo: {
    title: "Betreiberpflichten Elektro: Wer haftet?",
    description:
      "Wer für die Elektroprüfung verantwortlich ist, welche Regeln gelten, wie oft geprüft wird und was ohne Nachweis passiert. Kurz und verständlich.",
    keywords: ["DGUV V3 Pflicht", "Wer haftet Elektroprüfung", "Betreiberpflichten Elektro", "BetrSichV Prüfung", "Prüffristen DGUV V3"],
  },
  eyebrow: "Ratgeber",
  title: "Betreiberpflichten Elektro: Wer verantwortlich ist und was das für Sie bedeutet",
  intro:
    "Elektrische Anlagen und Geräte müssen regelmäßig geprüft werden. Verantwortlich dafür ist nicht der Elektriker, sondern der Betreiber, also Ihr Unternehmen und dessen Geschäftsführung. Hier erfahren Sie kurz und verständlich, was das heißt.",
  sections: [
    {
      id: "verantwortlich",
      title: "Wer ist verantwortlich?",
      paragraphs: [
        "Der Arbeitgeber bzw. Betreiber. Er muss dafür sorgen, dass elektrische Anlagen und Betriebsmittel in ordnungsgemäßem Zustand sind und bleiben.",
        "Er kann Aufgaben an Fachleute übertragen, etwa an einen Elektrofachbetrieb. Er muss aber dafür sorgen, dass sie erledigt werden: Wer prüft, wie oft, und ob die Mängel behoben sind.",
      ],
    },
    {
      id: "regeln",
      title: "Welche Regeln gelten?",
      paragraphs: ["Drei Regelwerke, kurz erklärt:"],
      list: [
        { term: "Arbeitsschutzgesetz (ArbSchG)", text: "Der Arbeitgeber beurteilt die Gefährdungen am Arbeitsplatz und legt Schutzmaßnahmen fest (§ 5, Gefährdungsbeurteilung)." },
        { term: "Betriebssicherheitsverordnung (BetrSichV)", text: "Arbeitsmittel müssen sicher sein und regelmäßig geprüft werden. Die Ergebnisse werden aufgezeichnet (§ 14)." },
        { term: "DGUV Vorschrift 3", text: "Die Unfallverhütungsvorschrift der Berufsgenossenschaften für elektrische Anlagen und Betriebsmittel: Prüfung durch eine Elektrofachkraft oder unter ihrer Leitung, mit Richtwerten für die Fristen." },
      ],
    },
    {
      id: "fristen",
      title: "Wie oft muss geprüft werden?",
      paragraphs: [
        "DGUV Vorschrift 3 nennt Richtwerte (Tabellen 1A bis 1C). Verbindlich ist Ihre Gefährdungsbeurteilung: Sie legen fest, wie oft geprüft wird, je nach Art der Geräte und wie stark sie beansprucht werden.",
      ],
    },
    {
      id: "ohne-nachweis",
      title: "Was passiert ohne Nachweis?",
      paragraphs: [
        "Nach einem Brand oder Unfall fragen Versicherer und Berufsgenossenschaft nach Prüfprotokollen. Fehlen sie, kann der Versicherer die Leistung kürzen.",
        "Bei grober Fahrlässigkeit kann die Berufsgenossenschaft Kosten zurückfordern, und Führungskräfte können auch persönlich in Anspruch genommen werden.",
      ],
    },
    {
      id: "abgeben",
      title: "Wie Sie das Thema abgeben",
      paragraphs: ["Drei Dinge reichen, damit Sie auf der sicheren Seite sind:"],
      list: [
        { term: "Fristen planen lassen", text: "Ein Prüfplan pro Standort, abgestimmt auf Ihre Gefährdungsbeurteilung." },
        { term: "Nachweise digital führen", text: "Jeder Prüfbericht an einem Ort, abrufbar, wenn jemand fragt." },
        { term: "Mängel nicht liegen lassen", text: "Ein Mangel im Bericht ist erst erledigt, wenn er behoben ist." },
      ],
      cta: { text: "Genau das übernimmt das HeyMeister-Abo.", label: "Zu den Leistungen", href: "/leistungen" },
    },
  ],
  notice: "Dieser Text gibt einen allgemeinen Überblick und ersetzt keine Rechtsberatung.",
  close: { title: "Prüfen wir gemeinsam, wo Sie stehen.", text: "15 Minuten am Telefon. Danach wissen Sie, was fällig ist." },
} as const;

export const pricesPage = {
  seo: {
    title: "Preise: fester Preis pro Standort",
    description:
      "Ein Preis pro Standort und Monat, netto. Prüfung und Kleinreparaturen inklusive, Mengenrabatt ab 5 Standorten. Mit Preisrechner.",
  },
  eyebrow: "Preise",
  title: "Ein Preis pro Standort. Prüfung und Kleinreparaturen inklusive.",
  lead: "Netto pro Standort und Monat. Endgültige Einstufung beim Erstbesuch.",
  tableTitle: "Preise nach Standortgröße",
  calculatorTitle: "Preis für Ihre Standorte berechnen",
  calculatorCta: "Dieses Angebot anfordern",
  /** Anchor box next to the calculator. Keep the figure out until real values exist. */
  anchor: {
    title: "Zum Vergleich",
    text: "Ein einzelner Elektriker-Einsatz mit Anfahrt und zwei Stunden Arbeit kostet schnell mehr als ein Monat HeyMeister.",
    figure: "[Zahl erst mit echten Werten nennen]",
  },
  /** Risk reversal. Only enable when it is really offered. */
  riskReversal: { enabled: false, text: "Nicht zufrieden nach dem ersten Prüftermin? Dann endet der Vertrag." },
} as const;

export const pilotPage = {
  seo: {
    title: "Pilotkunde werden ab Februar 2027",
    description:
      "Elektro-Full-Service ab Februar 2027: Wir starten mit wenigen Betrieben im Raum Düsseldorf. Pilotkonditionen und direkter Draht zum Meister.",
  },
  eyebrow: "Pilotprogramm",
  title: "Pilotkunde werden: Elektro-Full-Service ab Februar 2027",
  text: "Wir starten mit einer kleinen Zahl von Betrieben im Raum Düsseldorf. Sie bekommen Pilotkonditionen und direkten Draht zum Meister, wir bekommen Ihr ehrliches Feedback.",
  conditionsTitle: "Konditionen",
  cta: "Pilotplatz anfragen",
} as const;

export const aboutPage = {
  seo: {
    title: "Über uns: Meisterbetrieb aus Düsseldorf",
    description:
      "HeyMeister ist ein Meisterbetrieb aus Düsseldorf, der Elektro planbar macht: feste Termine, feste Preise, jeder Handgriff dokumentiert.",
  },
  eyebrow: "Über uns",
  title: "Ein Meisterbetrieb, der Elektro planbar macht",
  story: "[Max. 5 Sätze Geschichte]",
  valuesTitle: "Wofür wir stehen",
  values: [
    { title: "Planbar", text: "Feste Termine, feste Preise." },
    { title: "Dokumentiert", text: "Jeder Handgriff nachweisbar." },
    { title: "Ehrlich", text: "Wir verkaufen nur, was Sie brauchen." },
  ],
} as const;

export const careersPage = {
  seo: {
    title: "Karriere: Elektriker mit Plan",
    description:
      "Elektriker ohne Notdienst-Chaos: planbare Touren, moderne Prüfgeräte, digitale Doku statt Papierkram. Offene Stellen bei HeyMeister in Düsseldorf.",
  },
  eyebrow: "Karriere",
  title: "Elektriker ohne Notdienst-Chaos. Mit Plan.",
  text: "Planbare Touren, moderne Prüfgeräte, digitale Doku statt Papierkram.",
  /** Must be confirmed with Leon before launch. */
  emergencyNote: "[Notdienst: mit Leon bestätigen]",
  benefits: [
    { title: "Planbare Touren", text: "Prüftermine nach Plan statt Feuerwehreinsätzen." },
    { title: "Moderne Prüfgeräte", text: "Kalibrierte Mess- und Prüftechnik." },
    { title: "Digitale Doku", text: "Protokolle direkt ins Betriebsbuch statt Papierkram." },
  ],
  jobsTitle: "Offene Stellen",
  jobs: [
    { title: "Elektrofachkraft (m/w/d)", focus: "für Prüfung und Instandsetzung" },
    { title: "Elektrotechnisch unterwiesene Person (m/w/d)", focus: "für Geräteprüfung" },
  ],
  applyTitle: "So bewerben Sie sich",
  applyText: "Rufen Sie uns an oder schicken Sie uns ein paar Zeilen. Ein Lebenslauf reicht, ein Anschreiben brauchen wir nicht.",
} as const;

export const contactPage = {
  seo: {
    title: "Kontakt: kostenloser Standort-Check",
    description:
      "Sprechen wir 15 Minuten. Kostenloser Standort-Check für Elektroprüfung und Reparatur im Abo. Wir melden uns innerhalb eines Werktags.",
  },
  eyebrow: "Kontakt",
  title: "Sprechen wir 15 Minuten. Dann wissen Sie, wo Sie stehen.",
} as const;

export const thanksPage = {
  title: "Danke. Wir melden uns innerhalb eines Werktags.",
  waitText: "Sie wollen nicht warten?",
  bookLabel: "Direkt einen Termin buchen",
  tip: "Tipp: Legen Sie sich den letzten Prüfbericht bereit, falls vorhanden.",
} as const;
