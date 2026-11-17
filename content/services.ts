/**
 * Service pages: /leistungen (overview) and /leistungen/[slug].
 * Every detail page has the same structure: what is inspected · which standard · who inspects ·
 * how often (indicative value) · what you get · CTA.
 *
 * Interval rule: always add `intervalNote` (binding intervals come from the risk assessment).
 */

export const intervalNote =
  "Die verbindlichen Prüffristen legen Sie in Ihrer Gefährdungsbeurteilung fest. Die Werte aus DGUV Vorschrift 3 sind Richtwerte. Wir unterstützen Sie dabei.";

export type ServiceSlug = "geraete" | "anlagen" | "reparatur" | "betriebsbuch";

export type Service = {
  slug: ServiceSlug;
  nav: string;
  /** One line for the overview card. */
  teaser: string;
  seo: { title: string; description: string };
  title: string;
  lead: string;
  /** "Was wird geprüft" (or what is included). */
  what: { heading: string; items: string[] };
  /** Label/value facts: standard, who, how often. */
  facts: { label: string; value: string; note?: string }[];
  /** "Was Sie bekommen". */
  deliverables: string[];
  /** Show the interval note under the facts. */
  showIntervalNote: boolean;
  /** Visual on the right of the hero. */
  visual: "photo-devices" | "photo-installation" | "defects" | "logbook";
};

export const servicesOverview = {
  seo: {
    title: "Leistungen: Prüfung, Reparatur, Doku",
    description:
      "Geräteprüfung, Anlagenprüfung, Kleinreparaturen und digitales Betriebsbuch in einem Abo. Zum festen Monatspreis pro Standort, vom Meisterbetrieb.",
  },
  eyebrow: "Leistungen",
  title: "Alles, was Ihre Elektrik braucht. In einem Abo.",
  lead: "Prüfung, Reparatur und Nachweise gehören zusammen. Sie bekommen alles von einem Ansprechpartner, für alle Standorte, zum festen Monatspreis.",
} as const;

export const services: Service[] = [
  {
    slug: "geraete",
    nav: "Geräteprüfung",
    teaser: "Alle ortsveränderlichen Geräte nach DIN EN 50699 (VDE 0702), mit Prüfplakette und Protokoll.",
    seo: {
      title: "Geräteprüfung nach DIN EN 50699",
      description:
        "Prüfung ortsveränderlicher Geräte nach DGUV Vorschrift 3 und DIN EN 50699: Plakette, Protokoll und Nachweis im digitalen Betriebsbuch.",
    },
    title: "Jedes Gerät geprüft. Jede Plakette aktuell.",
    lead: "Wir prüfen alle ortsveränderlichen elektrischen Geräte an Ihren Standorten, kleben die Prüfplakette und tragen jedes Ergebnis ins digitale Betriebsbuch ein.",
    what: {
      heading: "Was wird geprüft",
      items: [
        "Geräte mit Stecker, vom Kaffeevollautomaten bis zum Monitor",
        "Verlängerungsleitungen, Kabeltrommeln und Mehrfachsteckdosen",
        "Anschlussleitungen und Netzteile",
        "Elektrowerkzeuge und Werkstattgeräte",
      ],
    },
    facts: [
      {
        label: "Nach welcher Norm",
        value: "DIN EN 50699 (VDE 0702) für die Wiederholungsprüfung, DIN EN 50678 (VDE 0701) nach einer Reparatur.",
        note: "Sichtprüfung, Messung von Schutzleiter- und Isolationswiderstand, Schutzleiter- oder Berührungsstrom und Funktionsprüfung.",
      },
      {
        label: "Wer prüft",
        value: "Eine Elektrofachkraft oder elektrotechnisch unterwiesene Mitarbeitende unter Leitung und Aufsicht unseres Meisters, mit kalibrierten Prüfgeräten.",
      },
      {
        label: "Wie oft (Richtwert)",
        value: "6 Monate nach DGUV Vorschrift 3, Tabelle 1B. Bei einer Fehlerquote unter 2 % verlängerbar: in Werkstätten bis 1 Jahr, in Büros bis 2 Jahre.",
      },
    ],
    deliverables: [
      "Prüfplakette mit dem nächsten Termin an jedem Gerät",
      "Prüfprotokoll pro Gerät im digitalen Betriebsbuch",
      "Prüfbericht als PDF nach jedem Termin",
      "Defekte Standardteile wie Stecker oder Leitungen direkt getauscht",
    ],
    showIntervalNote: true,
    visual: "photo-devices",
  },
  {
    slug: "anlagen",
    nav: "Anlagenprüfung",
    teaser: "Ortsfeste Anlagen nach DIN VDE 0105-100, geprüft von der Elektrofachkraft.",
    seo: {
      title: "Anlagenprüfung nach DIN VDE 0105-100",
      description:
        "Prüfung ortsfester elektrischer Anlagen durch die Elektrofachkraft: Verteiler, Stromkreise, Schutzeinrichtungen. Mit Messprotokoll und Mängelliste.",
    },
    title: "Ihre Elektroanlage, geprüft von der Elektrofachkraft.",
    lead: "Verteiler, Stromkreise und Schutzeinrichtungen prüfen wir nach Plan und dokumentieren jeden Messwert. Mängel ordnen wir festen Klassen zu, damit klar ist, was im Abo behoben wird.",
    what: {
      heading: "Was wird geprüft",
      items: [
        "Unterverteilungen und Schutzeinrichtungen",
        "Stromkreise, Steckdosen und Schalter",
        "Fehlerstrom-Schutzschalter (RCD)",
        "Fest angeschlossene Geräte und Beleuchtung",
      ],
    },
    facts: [
      {
        label: "Nach welcher Norm",
        value: "DIN VDE 0105-100 für den Betrieb elektrischer Anlagen, Messungen nach den Verfahren aus DIN VDE 0100-600.",
      },
      { label: "Wer prüft", value: "Eine Elektrofachkraft, unter Leitung unseres Meisters." },
      {
        label: "Wie oft (Richtwert)",
        value: "4 Jahre nach DGUV Vorschrift 3, Tabelle 1A. In Betriebsstätten, Räumen und Anlagen besonderer Art jährlich.",
      },
    ],
    deliverables: [
      "Messprotokoll pro Stromkreis",
      "Mängelliste nach festen Klassen",
      "Prüfbericht als PDF im digitalen Betriebsbuch",
      "Erinnerung, bevor die nächste Prüfung fällig ist",
    ],
    showIntervalNote: true,
    visual: "photo-installation",
  },
  {
    slug: "reparatur",
    nav: "Reparatur",
    teaser: "Kleine Mängel direkt vor Ort behoben, objektspezifische Teile innerhalb von 10 Werktagen.",
    seo: {
      title: "Reparatur: Mängel direkt behoben",
      description:
        "Kleinreparaturen im Abo: Standardteile tauschen wir sofort vor Ort, objektspezifische Teile innerhalb von 10 Werktagen. Größeres per Angebot.",
    },
    title: "Mängel gefunden? Meistens sind sie direkt behoben.",
    lead: "Ein Prüfbericht voller offener Mängel hilft niemandem. Deshalb beheben wir kleine Mängel gleich bei der Prüfung und ordnen alles andere festen Klassen zu.",
    what: {
      heading: "Was im Abo enthalten ist",
      items: [
        "Klasse 1, Standardteil wie Stecker, Abdeckung oder Leitung: direkt vor Ort getauscht",
        "Klasse 2, objektspezifisches Teil: über die Ersatzteilbox oder innerhalb von 10 Werktagen",
        "Klasse 3, größerer Aufwand: eigenes, transparentes Angebot, ohne Verpflichtung",
      ],
    },
    facts: [
      {
        label: "Nach welcher Norm",
        value: "Reparierte Geräte prüfen wir vor der Wiederinbetriebnahme nach DIN EN 50678 (VDE 0701).",
      },
      { label: "Wer repariert", value: "Eine Elektrofachkraft, unter Leitung unseres Meisters." },
      { label: "Wann", value: "Direkt bei der Prüfung oder nach Ihrer Meldung, je nach Mängelklasse." },
    ],
    deliverables: [
      "Mangel, Klasse und Erledigung im Betriebsbuch dokumentiert",
      "Prüfung nach der Reparatur, mit Protokoll",
      "Kein Stundenzettel und keine Anfahrtspauschale für Kleinreparaturen",
      "Für größere Arbeiten ein Angebot, das Sie vorher kennen",
    ],
    showIntervalNote: false,
    visual: "defects",
  },
  {
    slug: "betriebsbuch",
    nav: "Betriebsbuch",
    teaser: "Alle Standorte, Geräte und Fristen an einem Ort, mit Fristenampel und Prüfberichten als PDF.",
    seo: {
      title: "Digitales Betriebsbuch für Standorte",
      description:
        "Alle Standorte, Geräte, Fristen und Prüfberichte an einem Ort. Fristenampel grün, gelb, rot. Nachweise als PDF, auch für Versicherer und BG.",
    },
    title: "Alle Standorte, alle Fristen, alle Nachweise. Auf einen Blick.",
    lead: "Jede Prüfung und jede Reparatur landet im digitalen Betriebsbuch. Sie sehen, was geprüft ist, was bald fällig wird und wo ein Mangel offen ist.",
    what: {
      heading: "Was drinsteht",
      items: [
        "Alle Standorte mit Geräten, Verteilungen und Stromkreisen",
        "Fristenampel grün, gelb, rot für jeden Standort",
        "Prüfberichte und Protokolle als PDF",
        "Mängel mit Klasse und Stand der Erledigung",
      ],
    },
    facts: [
      {
        label: "Wozu",
        value: "Die Ergebnisse von Prüfungen müssen aufgezeichnet und mindestens bis zur nächsten Prüfung aufbewahrt werden (BetrSichV § 14). Das Betriebsbuch erledigt das für Sie.",
      },
      { label: "Wer pflegt es", value: "Wir, nach jedem Termin. Sie und Ihre Standortleitungen sehen den aktuellen Stand." },
      { label: "Wie oft aktualisiert", value: "Nach jeder Prüfung und jeder Reparatur." },
    ],
    deliverables: [
      "Nachweise auf Knopfdruck, auch für Versicherer und Berufsgenossenschaft",
      "Erinnerung, bevor etwas fällig ist",
      "Ein Stand für alle Standorte statt Ordnern und Excel-Listen",
      "Im Abo enthalten",
    ],
    showIntervalNote: false,
    visual: "logbook",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
