/**
 * Segment landing pages (targets for cold-outreach emails to exactly this segment).
 * Same structure for all: hero → 3 pain points → solution → example calculation → 3 FAQ → CTA.
 *
 * Example calculations are computed from content/pricing.ts (tier "basis"); the size per site is an
 * assumption for the example and always labelled as such.
 */
import type { FaqItem } from "./faq";
import type { PhotoKey } from "./photos";
import type { SiteSize } from "./pricing";

export type SegmentSlug =
  | "fuer-praxen"
  | "fuer-autohaeuser"
  | "fuer-filialisten"
  | "fuer-hausverwaltungen"
  | "fuer-bueros"
  | "fuer-gastronomie"
  | "fuer-baeckereien"
  | "fuer-einzelhandel"
  | "fuer-hotels"
  | "fuer-fitnessstudios";

export type Segment = {
  slug: SegmentSlug;
  /** Shown on the homepage (the four main segments); all appear on /branchen. */
  featured: boolean;
  /** Hero visual: a photograph from content/photos.ts or the logbook screen. */
  visual: PhotoKey | "logbook";
  /** Card on the homepage and /branchen. */
  card: { title: string; text: string };
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  pains: { title: string; text: string }[];
  solution: { title: string; items: { title: string; text: string }[] };
  example: { label: string; sites: number; size: SiteSize; term: 12 | 24; unit: string };
  faq: FaqItem[];
  /** Internal note (not rendered): open questions to clarify before launch. */
  todo?: string;
};

export const segments: Segment[] = [
  {
    slug: "fuer-praxen",
    featured: true,
    visual: "practice",
    card: {
      title: "Arztpraxen und MVZ",
      text: "Viele Geräte, Patientenverkehr, keine Zeit für Handwerkerkoordination.",
    },
    seo: {
      title: "Elektroprüfung für Arztpraxen und MVZ",
      description:
        "Elektroprüfung nach DGUV V3 für Arztpraxen: Prüfung in Randzeiten, Kleinigkeiten sofort behoben, alle Nachweise digital. Fester Monatspreis.",
    },
    eyebrow: "Für Praxen",
    title: "Elektroprüfung für Arztpraxen. Ohne dass Ihr Praxisbetrieb darunter leidet.",
    lead: "Wir prüfen Ihre Geräte und Anlagen in Randzeiten, beheben Kleinigkeiten sofort und liefern alle Nachweise digital.",
    pains: [
      { title: "Keine Zeit für Handwerker", text: "Das Praxisteam hat keine Zeit, Termine mit Elektrikern zu koordinieren." },
      { title: "Viele Geräte, viele Räume", text: "Geräte verteilt auf Behandlungsräume, Empfang und Labor." },
      { title: "Nachweise gefragt", text: "Begehungen und Versicherer wollen Nachweise sehen." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfung außerhalb der Sprechzeiten", text: "Wir stimmen die Termine mit Ihnen ab und prüfen, wenn keine Patienten da sind." },
        { title: "Ein Ansprechpartner", text: "Für Prüfung, Reparatur und Nachweise, ohne dass Ihr Team koordinieren muss." },
        { title: "Nachweise auf Knopfdruck", text: "Alle Prüfberichte im digitalen Betriebsbuch, bereit für Begehung und Versicherer." },
      ],
    },
    example: { label: "Eine Praxis, Standortgröße S", sites: 1, size: "s", term: 24, unit: "Praxis" },
    faq: [
      {
        id: "medizinprodukte",
        question: "Prüfen Sie auch unsere Medizingeräte?",
        answer: [
          "Medizinprodukte haben eigene Prüfpflichten, etwa sicherheitstechnische und messtechnische Kontrollen nach der Medizinprodukte-Betreiberverordnung. Diese Kontrollen sind nicht automatisch Teil des Abos. Enthalten ist die Prüfung Ihrer übrigen elektrischen Geräte und Anlagen, vom Empfang bis zur Teeküche. Was wir darüber hinaus übernehmen, klären wir im Erstgespräch.",
        ],
      },
      {
        id: "praxisbetrieb",
        question: "Stört die Prüfung den Praxisbetrieb?",
        answer: ["Nein. Wir prüfen nach Absprache in Randzeiten oder außerhalb der Sprechzeiten."],
      },
      {
        id: "nachweise",
        question: "Welche Nachweise bekommen wir?",
        answer: ["Einen Prüfbericht als PDF nach jedem Termin und alle Protokolle im digitalen Betriebsbuch, jederzeit abrufbar."],
      },
    ],
    todo: "Abgrenzung zu Medizinprodukten (STK/MTK nach MPBetreibV) mit Leon klären, damit wir nichts versprechen, was nicht im Abo ist.",
  },
  {
    slug: "fuer-autohaeuser",
    featured: true,
    visual: "workshop",
    card: {
      title: "Autohäuser und Werkstätten",
      text: "Werkstatt, Showroom, Ladeinfrastruktur, hohe Beanspruchung.",
    },
    seo: {
      title: "Elektroprüfung für Autohäuser",
      description:
        "Elektro im Autohaus: Werkstatt, Showroom und Büro geprüft, repariert und dokumentiert. Prüfplan nach Beanspruchung, zum festen Monatspreis.",
    },
    eyebrow: "Für Autohäuser",
    title: "Elektro im Autohaus: geprüft, repariert, dokumentiert. Zum Festpreis.",
    lead: "Werkstatt, Showroom und Büro aus einer Hand. Wir kennen die Belastung in der Werkstatt und planen danach.",
    pains: [
      { title: "Hohe Beanspruchung", text: "Werkstattgeräte, Kabeltrommeln und Ladegeräte sind stark beansprucht und brauchen kürzere Prüfzyklen." },
      { title: "Audits und Versicherer", text: "Hersteller-Audits und Versicherer fragen nach Nachweisen." },
      { title: "Defekte bremsen", text: "Kleine Defekte bremsen den Werkstattbetrieb." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfplan nach Beanspruchung", text: "Werkstatt, Showroom und Büro mit den Fristen, die Ihre Gefährdungsbeurteilung vorsieht." },
        { title: "Reparatur ohne Wartezeit", text: "Standardteile tauschen wir direkt bei der Prüfung." },
        { title: "Ein Betriebsbuch für die Gruppe", text: "Alle Betriebe Ihrer Gruppe in einem Betriebsbuch, mit Fristenampel pro Standort." },
      ],
    },
    example: { label: "Ein Autohaus mit Werkstatt, Standortgröße L", sites: 1, size: "l", term: 24, unit: "Betrieb" },
    faq: [
      {
        id: "zyklen",
        question: "Warum gelten in der Werkstatt kürzere Prüfzyklen?",
        answer: [
          "Geräte, die stark beansprucht werden, fallen häufiger aus. Wie oft geprüft wird, legen Sie in Ihrer Gefährdungsbeurteilung fest. Die Werte aus DGUV Vorschrift 3 sind Richtwerte. Wir unterstützen Sie dabei.",
        ],
      },
      {
        id: "laden",
        question: "Prüfen Sie auch Ladepunkte?",
        answer: [
          "Fest installierte Ladepunkte gehören zur elektrischen Anlage, mobile Ladegeräte zu den ortsveränderlichen Geräten. Welchen Umfang Ihr Abo umfasst, legen wir beim Erstbesuch je Standort fest.",
        ],
      },
      {
        id: "gruppe",
        question: "Wir haben mehrere Betriebe. Geht das in einem Vertrag?",
        answer: ["Ja. Ein Vertrag, ein Betriebsbuch für alle Betriebe und Mengenrabatt ab 5 Standorten."],
      },
    ],
  },
  {
    slug: "fuer-filialisten",
    featured: true,
    visual: "logbook",
    card: {
      title: "Filialisten mit 5 bis 50 Standorten",
      text: "Bäckereien, Supermärkte, Gastronomie, Handel.",
    },
    seo: {
      title: "Elektroprüfung für Filialisten",
      description:
        "Alle Filialen, ein Elektro-Partner, ein Preis: Prüfung, Reparatur und Fristenampel pro Standort für Bäckereien, Supermärkte, Gastro und Handel.",
    },
    eyebrow: "Für Filialisten",
    title: "Alle Filialen. Ein Elektro-Partner. Ein Preis.",
    lead: "Für Bäckereien, Supermärkte, Gastronomie und Handel mit 5 bis 50 Standorten.",
    pains: [
      { title: "Jede Filiale anders", text: "Jede Filiale hat einen anderen Elektriker oder keinen." },
      { title: "Kein Überblick in der Zentrale", text: "In der Zentrale weiß niemand, welche Filiale wann geprüft wurde." },
      { title: "Ausfälle kosten Umsatz", text: "Fällt die Kühlung oder der Ofen aus, steht der Verkauf." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Ein Vertrag für alle Filialen", text: "Ein Ansprechpartner, ein Preis pro Standort, eine Rechnung." },
        { title: "Fristenampel pro Standort", text: "Die Zentrale sieht im Betriebsbuch, welche Filiale geprüft ist und wo etwas fällig wird." },
        { title: "Mengenrabatt ab 5 Standorten", text: "Je mehr Standorte, desto günstiger der Preis pro Standort." },
      ],
    },
    example: { label: "12 Filialen, Standortgröße S", sites: 12, size: "s", term: 24, unit: "Filiale" },
    faq: [
      {
        id: "start",
        question: "Müssen alle Filialen auf einmal starten?",
        answer: ["Nein. Wir können mit einzelnen Filialen beginnen und weitere nach und nach aufnehmen."],
      },
      {
        id: "zentrale",
        question: "Wie sieht die Zentrale den Stand?",
        answer: ["Im digitalen Betriebsbuch: alle Filialen mit Fristenampel, Prüfberichten als PDF und offenen Mängeln."],
      },
      {
        id: "kuehlung",
        question: "Kümmern Sie sich auch um Kühlung und Öfen?",
        answer: [
          "Wir prüfen die elektrische Anlage und die Geräte, dazu gehören Zuleitungen und Anschlüsse. Die Kälte- und Ofentechnik selbst warten weiterhin Ihre Fachfirmen.",
        ],
      },
    ],
  },
  {
    slug: "fuer-hausverwaltungen",
    featured: true,
    visual: "stairwell",
    card: {
      title: "Hausverwaltungen",
      text: "Nachweise pro Objekt für Eigentümer und Versicherer.",
    },
    seo: {
      title: "Elektroprüfung für Hausverwaltungen",
      description:
        "Elektro-Nachweise für jedes Objekt: Allgemeinstrom, Gemeinschaftsflächen und Technikräume geprüft und pro Objekt dokumentiert. Feste Kosten.",
    },
    eyebrow: "Für Hausverwaltungen",
    title: "Elektro-Nachweise für jedes Objekt. Bereit für die Eigentümerversammlung.",
    lead: "Wir prüfen Allgemeinstrom, Gemeinschaftsflächen und Technikräume und dokumentieren alles pro Objekt.",
    pains: [
      { title: "Nachweise erwartet", text: "Eigentümer und Versicherer erwarten Nachweise." },
      { title: "Handwerkersuche", text: "Die Suche nach Handwerkern frisst Verwaltungszeit." },
      { title: "Viele Einzelaufträge", text: "Kleinreparaturen landen als Einzelaufträge auf dem Tisch." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Bericht pro Objekt", text: "Prüfbericht und Mängelstand für jedes Objekt, bereit für die Eigentümerversammlung." },
        { title: "Feste Kosten pro Objekt", text: "Ein Monatspreis pro Objekt, gut planbar für den Wirtschaftsplan." },
        { title: "Ein Ansprechpartner", text: "Für den ganzen Bestand, statt Einzelaufträgen pro Objekt." },
      ],
    },
    example: { label: "20 Objekte, Standortgröße S", sites: 20, size: "s", term: 24, unit: "Objekt" },
    faq: [
      {
        id: "dguv",
        question: "Gilt DGUV Vorschrift 3 auch für Wohngebäude?",
        answer: [
          "Nicht pauschal. DGUV Vorschrift 3 richtet sich an Arbeitgeber. Für Wohngebäude ist eine regelmäßige Prüfung trotzdem sinnvoll, weil Eigentümer und Versicherer nach dem Zustand der Anlage fragen. Welchen Umfang Sie je Objekt brauchen, besprechen wir mit Ihnen.",
        ],
      },
      {
        id: "umfang",
        question: "Was genau prüfen Sie im Objekt?",
        answer: [
          "Allgemeinstrom, Gemeinschaftsflächen wie Treppenhaus und Keller sowie Technikräume. Den genauen Umfang legen wir je Objekt beim Erstbesuch fest und halten ihn im Angebot fest. Wohnungen der Mieter gehören nicht dazu.",
        ],
      },
      {
        id: "umlage",
        question: "Können wir die Kosten umlegen?",
        answer: [
          "Das hängt von Ihren Mietverträgen und der Teilungserklärung ab und ist eine rechtliche Frage, die wir nicht beantworten können. Wir liefern feste Kosten und eine Rechnung pro Objekt, damit Sie sauber zuordnen können.",
        ],
      },
    ],
    todo: "Leistungsumfang pro Objekt mit Leon festlegen.",
  },
  {
    slug: "fuer-bueros",
    featured: false,
    visual: "office",
    card: { title: "Büros und Agenturen", text: "Viele Geräte an vielen Plätzen, Prüfung ohne Arbeitsunterbrechung." },
    seo: {
      title: "Elektroprüfung für Büros und Agenturen",
      description:
        "Geräteprüfung nach DGUV V3 im Büro: Monitore, PCs, Ladegeräte und Mehrfachsteckdosen geprüft, ohne den Arbeitstag zu stören. Fester Monatspreis.",
    },
    eyebrow: "Für Büros",
    title: "Elektroprüfung im Büro. Ohne dass jemand seinen Rechner suchen muss.",
    lead: "Wir prüfen Monitore, Rechner, Ladegeräte und Mehrfachsteckdosen nach Plan, beheben Kleinigkeiten direkt und führen alles im digitalen Betriebsbuch.",
    pains: [
      { title: "Geräte überall", text: "Unter jedem Schreibtisch Mehrfachsteckdosen, Ladegeräte und Netzteile. Niemand weiß, wie viele es sind." },
      { title: "Prüfung stört", text: "Für die Messung muss jedes Gerät kurz vom Netz. Das will niemand mitten im Termin." },
      { title: "Eigene Geräte", text: "Mitarbeitende bringen Wasserkocher, Lampen und Ladegeräte mit. Ob die geprüft sind, weiß keiner." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Nach Absprache vor oder nach der Arbeitszeit", text: "Wir stimmen die Reihenfolge ab, damit niemand Daten verliert." },
        { title: "Fristen nach Beanspruchung", text: "Bürogeräte werden weniger beansprucht. Bei niedriger Fehlerquote lassen sich die Abstände verlängern, wenn Ihre Gefährdungsbeurteilung das vorsieht." },
        { title: "Ein Verzeichnis aller Geräte", text: "Jedes Gerät mit Nummer, Standort und nächstem Termin im Betriebsbuch." },
      ],
    },
    example: { label: "Ein Büro, Standortgröße S-Büro", sites: 1, size: "s-buero", term: 24, unit: "Büro" },
    faq: [
      {
        id: "fristen",
        question: "Wie oft müssen Bürogeräte geprüft werden?",
        answer: [
          "Der Richtwert aus DGUV Vorschrift 3 liegt bei 6 Monaten. Liegt die Fehlerquote unter 2 %, kann die Frist in Büros auf bis zu 2 Jahre verlängert werden. Verbindlich ist Ihre Gefährdungsbeurteilung, wir unterstützen Sie dabei.",
        ],
      },
      {
        id: "privat",
        question: "Was ist mit privaten Geräten der Mitarbeitenden?",
        answer: ["Regeln Sie, ob private Geräte erlaubt sind. Erlaubte Geräte nehmen wir in die Prüfung auf."],
      },
      {
        id: "rechner",
        question: "Müssen wir für die Prüfung die Rechner herunterfahren?",
        answer: ["Für die Messung wird jedes Gerät kurz vom Netz genommen. Wir stimmen die Reihenfolge mit Ihnen ab, am besten vor oder nach der Arbeitszeit."],
      },
    ],
  },
  {
    slug: "fuer-gastronomie",
    featured: false,
    visual: "kitchen",
    card: { title: "Gastronomie", text: "Küchengeräte unter Dauerlast, Prüfung nur außerhalb des Service." },
    seo: {
      title: "Elektroprüfung für Gastronomie",
      description:
        "Elektroprüfung für Restaurants und Gastronomie: Küchengeräte und Anlage geprüft, außerhalb des Service, kleine Mängel direkt behoben. Fester Preis.",
    },
    eyebrow: "Für Gastronomie",
    title: "Elektroprüfung in der Gastronomie. Vor dem Service, nicht mittendrin.",
    lead: "Wir prüfen Küchengeräte und Anlage, wenn die Küche ruht, tauschen Standardteile direkt und liefern alle Nachweise digital.",
    pains: [
      { title: "Dauerlast in der Küche", text: "Hitze, Feuchtigkeit und Fett setzen Geräten und Leitungen zu." },
      { title: "Ausfall im Service", text: "Fällt ein Gerät am Abend aus, fehlt es genau dann, wenn es gebraucht wird." },
      { title: "Kein Zeitfenster", text: "Geprüft werden kann nur, wenn die Küche nicht läuft." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfung am Ruhetag oder vor der Öffnung", text: "Wir richten uns nach Ihren Zeiten, nicht umgekehrt." },
        { title: "Kleinreparaturen sofort", text: "Defekte Stecker, Leitungen oder Abdeckungen tauschen wir direkt bei der Prüfung." },
        { title: "Fristen nach Beanspruchung", text: "Für stark beanspruchte Küchengeräte kann Ihre Gefährdungsbeurteilung kürzere Fristen vorsehen. Wir planen danach." },
      ],
    },
    example: { label: "Ein Restaurant, Standortgröße M", sites: 1, size: "m", term: 24, unit: "Restaurant" },
    faq: [
      {
        id: "fest",
        question: "Prüfen Sie auch fest angeschlossene Küchengeräte?",
        answer: [
          "Ja, fest angeschlossene Geräte wie Herd oder Kombidämpfer gehören zur Anlagenprüfung. Die Wartung der Gerätetechnik selbst bleibt beim Kundendienst des Herstellers.",
        ],
      },
      {
        id: "wann",
        question: "Wann prüfen Sie?",
        answer: ["Nach Absprache am Ruhetag oder vor der Öffnung, damit der Betrieb nicht gestört wird."],
      },
      {
        id: "filialen",
        question: "Wir haben mehrere Betriebe. Geht das in einem Vertrag?",
        answer: ["Ja. Ein Vertrag, ein Betriebsbuch für alle Betriebe und Mengenrabatt ab 5 Standorten."],
      },
    ],
  },
  {
    slug: "fuer-baeckereien",
    featured: false,
    visual: "bakery",
    card: { title: "Bäckereien", text: "Backstube und Filialen, Öfen und Kaffeemaschinen im Dauerbetrieb." },
    seo: {
      title: "Elektroprüfung für Bäckereien",
      description:
        "Elektroprüfung für Bäckereien mit Backstube und Filialen: Prüfung in Randzeiten, Fristenampel für die Zentrale und Mengenrabatt ab 5 Standorten.",
    },
    eyebrow: "Für Bäckereien",
    title: "Backstube und alle Filialen. Ein Partner für die Elektrik.",
    lead: "Wir prüfen Backstube und Filialen in Randzeiten, beheben Kleinigkeiten direkt und zeigen der Zentrale den Stand jeder Filiale.",
    pains: [
      { title: "Rund um die Uhr in Betrieb", text: "Nachts läuft die Backstube, tagsüber verkaufen die Filialen. Ein Zeitfenster für die Prüfung ist knapp." },
      { title: "Viele Geräte pro Filiale", text: "Kaffeemaschinen, Aufbackofen, Kühltheken, Kassen: in jeder Filiale aufs Neue." },
      { title: "Kein Überblick", text: "Welche Filiale wann geprüft wurde, steht in verschiedenen Ordnern." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Termine in Randzeiten", text: "Wir prüfen jede Filiale dann, wenn es dort passt." },
        { title: "Fristenampel für die Zentrale", text: "Backstube und Filialen auf einen Blick im digitalen Betriebsbuch." },
        { title: "Mengenrabatt ab 5 Standorten", text: "Jede Filiale und die Backstube zählen als eigener Standort." },
      ],
    },
    example: { label: "8 Filialen, Standortgröße S", sites: 8, size: "s", term: 24, unit: "Filiale" },
    faq: [
      {
        id: "oefen",
        question: "Prüfen Sie auch die Backöfen?",
        answer: [
          "Elektrisch ja: Anschluss, Zuleitung und Schutzmaßnahmen. Die Wartung der Ofentechnik selbst bleibt beim Hersteller oder Ihrem Kundendienst.",
        ],
      },
      {
        id: "backstube",
        question: "Backstube und Filialen in einem Vertrag?",
        answer: ["Ja. Jede Filiale und die Backstube sind eigene Standorte im selben Vertrag und im selben Betriebsbuch."],
      },
      {
        id: "betrieb",
        question: "Stört die Prüfung den Verkauf?",
        answer: ["Nein. Wir prüfen nach Absprache außerhalb der Öffnungs- und Produktionszeiten."],
      },
    ],
  },
  {
    slug: "fuer-einzelhandel",
    featured: false,
    visual: "counter",
    card: { title: "Einzelhandel", text: "Kassen, Kühlmöbel, Beleuchtung und Werbeanlagen in jeder Filiale." },
    seo: {
      title: "Elektroprüfung für den Einzelhandel",
      description:
        "Elektroprüfung für Einzelhandel und Ladengeschäfte: Kassen, Kühlmöbel und Beleuchtung geprüft, vor oder nach Ladenöffnung. Bericht pro Filiale.",
    },
    eyebrow: "Für den Einzelhandel",
    title: "Elektroprüfung im Laden. Vor der Öffnung erledigt.",
    lead: "Wir prüfen Kassen, Kühlmöbel, Beleuchtung und Anlage vor oder nach Ladenöffnung und liefern einen Bericht pro Filiale.",
    pains: [
      { title: "Fläche ist Umsatz", text: "Während der Öffnungszeiten soll niemand mit Messgeräten zwischen den Regalen stehen." },
      { title: "Viele Geräte, viele Filialen", text: "Kassen, Kühlmöbel, Beleuchtung und Werbeanlagen, in jeder Filiale etwas anders." },
      { title: "Mietfläche", text: "Was gehört zum Vermieter, was zum Mieter? Oft ist das nicht klar dokumentiert." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfung vor oder nach Ladenöffnung", text: "Wir richten uns nach Ihren Öffnungszeiten." },
        { title: "Bericht pro Filiale", text: "Prüfstand und offene Mängel jeder Filiale im digitalen Betriebsbuch." },
        { title: "Klare Abgrenzung", text: "Wir halten fest, welche Anlagen zu Ihrer Fläche gehören." },
      ],
    },
    example: { label: "6 Filialen, Standortgröße M", sites: 6, size: "m", term: 24, unit: "Filiale" },
    faq: [
      {
        id: "vermieter",
        question: "Wer ist für die Anlage zuständig, wir oder der Vermieter?",
        answer: [
          "Das regelt Ihr Mietvertrag. Beim Erstbesuch klären wir mit Ihnen, welche Anlagen und Geräte zu Ihrer Fläche gehören, und prüfen genau diese.",
        ],
      },
      {
        id: "kuehlmoebel",
        question: "Prüfen Sie auch Kühlmöbel?",
        answer: ["Die elektrische Sicherheit ja: Anschluss, Leitung und Schutzmaßnahmen. Die Kältetechnik selbst wartet weiterhin Ihre Fachfirma."],
      },
      {
        id: "start",
        question: "Können wir mit einigen Filialen beginnen?",
        answer: ["Ja. Weitere Filialen nehmen wir nach und nach auf. Ab 5 Standorten gilt der Mengenrabatt."],
      },
    ],
  },
  {
    slug: "fuer-hotels",
    featured: false,
    visual: "hotel",
    card: { title: "Hotels", text: "Geräte in jedem Zimmer, Prüfung nach Belegungsplan." },
    seo: {
      title: "Elektroprüfung für Hotels",
      description:
        "Elektroprüfung für Hotels: Zimmergeräte, Küche und Haustechnik geprüft, nach Belegungsplan und ohne Gäste zu stören. Ein Betriebsbuch für alles.",
    },
    eyebrow: "Für Hotels",
    title: "Elektroprüfung im Hotel. Zimmer für Zimmer, nach Belegungsplan.",
    lead: "Wir prüfen Wasserkocher, Föhn und Lampen in den Zimmern, dazu Küche und Haustechnik, abgestimmt mit Ihrem Housekeeping.",
    pains: [
      { title: "Geräte in jedem Zimmer", text: "Wasserkocher, Föhn, Lampen, Fernseher: mal hundert Zimmer." },
      { title: "Zimmer sind belegt", text: "Geprüft werden kann nur, wo gerade kein Gast ist." },
      { title: "Haustechnik ausgelastet", text: "Die eigene Technik hat genug mit dem Tagesgeschäft zu tun." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfung nach Belegungsplan", text: "Wir stimmen uns mit dem Housekeeping ab und prüfen freie Zimmer." },
        { title: "Ein Betriebsbuch für alles", text: "Zimmer, Küche, Wellness und Technik an einem Ort." },
        { title: "Kleinreparaturen sofort", text: "Defekte Stecker oder Leitungen tauschen wir direkt." },
      ],
    },
    example: { label: "Ein Hotel, Standortgröße L", sites: 1, size: "l", term: 24, unit: "Hotel" },
    faq: [
      {
        id: "belegt",
        question: "Wie prüfen Sie, wenn das Haus voll ist?",
        answer: ["Wir prüfen nach Belegungsplan in freien Zimmern und kommen für die übrigen Zimmer wieder. Die Planung stimmen wir mit Ihnen ab."],
      },
      {
        id: "gaeste",
        question: "Prüfen Sie auch Geräte der Gäste?",
        answer: ["Nein. Geräte, die Gäste mitbringen, gehören nicht zu Ihren Betriebsmitteln."],
      },
      {
        id: "wellness",
        question: "Was gilt für Sauna und Schwimmbad?",
        answer: [
          "Bereiche wie Sauna oder Schwimmbad gelten als Anlagen besonderer Art. Der Richtwert aus DGUV Vorschrift 3 liegt dort bei einem Jahr, verbindlich ist Ihre Gefährdungsbeurteilung. Den Umfang legen wir beim Erstbesuch fest.",
        ],
      },
    ],
  },
  {
    slug: "fuer-fitnessstudios",
    featured: false,
    visual: "breakers",
    card: { title: "Fitnessstudios", text: "Cardio-Geräte im Dauerbetrieb, Sauna und Duschen." },
    seo: {
      title: "Elektroprüfung für Fitnessstudios",
      description:
        "Elektroprüfung für Fitnessstudios: Cardio-Geräte, Sauna und Anlage geprüft, zu Randzeiten und mit Nachweis im digitalen Betriebsbuch.",
    },
    eyebrow: "Für Fitnessstudios",
    title: "Elektroprüfung im Fitnessstudio. Zu Randzeiten, mit Nachweis.",
    lead: "Wir prüfen Laufbänder, Crosstrainer und die Anlage zu Randzeiten, beheben Kleinigkeiten direkt und dokumentieren alles im Betriebsbuch.",
    pains: [
      { title: "Geräte laufen fast pausenlos", text: "Laufbänder und Crosstrainer sind viele Stunden am Tag in Betrieb." },
      { title: "Sauna und Duschen", text: "Feuchte Bereiche brauchen besondere Aufmerksamkeit." },
      { title: "Gesperrte Geräte", text: "Ein defektes Gerät verärgert Mitglieder, bis es wieder läuft." },
    ],
    solution: {
      title: "So nehmen wir Ihnen das ab.",
      items: [
        { title: "Prüfung zu Randzeiten", text: "Früh morgens oder spät abends, wenn wenig los ist." },
        { title: "Fristen nach Beanspruchung", text: "Für Sauna und Feuchträume gelten kürzere Richtwerte. Wir planen nach Ihrer Gefährdungsbeurteilung." },
        { title: "Ein Betriebsbuch für alle Studios", text: "Jedes Studio mit Fristenampel, Prüfberichten und offenen Mängeln." },
      ],
    },
    example: { label: "3 Studios, Standortgröße M", sites: 3, size: "m", term: 24, unit: "Studio" },
    faq: [
      {
        id: "geraete",
        question: "Prüfen Sie auch Laufbänder und Crosstrainer?",
        answer: [
          "Wir prüfen die elektrische Sicherheit: Anschlussleitung, Schutzleiter und Isolation. Die mechanische Wartung übernimmt weiterhin der Hersteller oder Ihr Servicepartner.",
        ],
      },
      {
        id: "sauna",
        question: "Was gilt für die Sauna?",
        answer: [
          "Saunabereiche gelten als Anlagen besonderer Art. Der Richtwert aus DGUV Vorschrift 3 liegt dort bei einem Jahr, verbindlich ist Ihre Gefährdungsbeurteilung.",
        ],
      },
      {
        id: "mehrere",
        question: "Wir haben mehrere Studios. Geht das in einem Vertrag?",
        answer: ["Ja. Ein Vertrag, ein Betriebsbuch für alle Studios und Mengenrabatt ab 5 Standorten."],
      },
    ],
  },
];


export function segmentBySlug(slug: SegmentSlug): Segment {
  const s = segments.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown segment ${slug}`);
  return s;
}

export const segmentsHub = {
  seo: {
    title: "Branchen: Elektroprüfung im Abo",
    description:
      "Elektroprüfung, Reparatur und Betriebsbuch für Praxen, Autohäuser, Filialisten, Hausverwaltungen, Büros, Gastro, Bäckereien, Handel, Hotels, Studios.",
  },
  eyebrow: "Branchen",
  title: "Für Betriebe, in denen Elektrik arbeiten muss.",
  lead: "Jede Branche hat ihre eigenen Geräte, Zeiten und Fragen. Das Abo bleibt gleich: Prüfung, Kleinreparaturen und Betriebsbuch zum festen Monatspreis pro Standort.",
} as const;
