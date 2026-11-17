/**
 * Segment landing pages (targets for cold-outreach emails to exactly this segment).
 * Same structure for all: hero → 3 pain points → solution → example calculation → 3 FAQ → CTA.
 *
 * Example calculations are computed from content/pricing.ts (tier "basis"); the size per site is an
 * assumption for the example and always labelled as such.
 */
import type { FaqItem } from "./faq";
import type { SiteSize } from "./pricing";

export type SegmentSlug = "fuer-praxen" | "fuer-autohaeuser" | "fuer-filialisten" | "fuer-hausverwaltungen";

export type Segment = {
  slug: SegmentSlug;
  /** Card on the homepage. */
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
          "Medizinprodukte haben eigene Prüfpflichten, etwa sicherheitstechnische und messtechnische Kontrollen nach der Medizinprodukte-Betreiberverordnung. Was davon im Abo enthalten ist, klären wir im Erstgespräch. [Abgrenzung STK/MTK mit Leon klären]",
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
          "Allgemeinstrom, Gemeinschaftsflächen wie Treppenhaus und Keller sowie Technikräume. Den genauen Umfang legen wir je Objekt fest. [Leistungsumfang mit Leon festlegen]",
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
];

export function segmentBySlug(slug: SegmentSlug): Segment {
  const s = segments.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown segment ${slug}`);
  return s;
}
