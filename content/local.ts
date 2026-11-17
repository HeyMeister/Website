/**
 * Local landing page: /elektropruefung-duesseldorf.
 * Only what is true: HeyMeister is based in Düsseldorf and serves "Düsseldorf und Umgebung".
 * Towns outside Düsseldorf are not promised; they are asked about in the Standort-Check.
 */
import type { FaqItem } from "./faq";

export const localPage = {
  path: "/elektropruefung-duesseldorf",
  seo: {
    title: "Elektroprüfung in Düsseldorf",
    description:
      "Elektroprüfung nach DGUV V3 in Düsseldorf: Geräte- und Anlagenprüfung, Kleinreparaturen und digitales Betriebsbuch vom Meisterbetrieb. Fester Monatspreis.",
    keywords: ["Elektroprüfung Düsseldorf", "DGUV V3 Prüfung Düsseldorf", "E-Check Gewerbe Düsseldorf", "Geräteprüfung Düsseldorf", "Elektriker Gewerbe Düsseldorf"],
  },
  eyebrow: "Düsseldorf",
  title: "Elektroprüfung in Düsseldorf. Vom Meisterbetrieb aus der Stadt.",
  lead: "Wir prüfen Geräte und Anlagen nach DGUV Vorschrift 3, beheben kleine Mängel direkt und führen Ihr digitales Betriebsbuch. Für Betriebe in Düsseldorf und Umgebung, zum festen Monatspreis pro Standort.",
  why: {
    eyebrow: "Warum aus Düsseldorf",
    title: "Kurze Wege, feste Touren, ein Ansprechpartner.",
    items: [
      { icon: "calendar", title: "Feste Touren", text: "Wir planen Ihre Prüftermine fest in unsere Touren durch die Stadt ein. Sie werden informiert, bevor etwas fällig ist." },
      { icon: "person", title: "Eine feste Ansprechperson", text: "Kein Callcenter, sondern ein Meisterbetrieb, der Ihre Standorte kennt." },
      { icon: "tool", title: "Kleine Mängel direkt behoben", text: "Standardteile tauschen wir sofort vor Ort, objektspezifische Teile innerhalb von 10 Werktagen." },
      { icon: "list", title: "Alle Standorte in einem Betriebsbuch", text: "Ob ein Standort oder zwanzig in der Region: ein Stand für alle." },
    ],
  },
  districts: {
    eyebrow: "Einsatzgebiet",
    title: "In ganz Düsseldorf im Einsatz.",
    text: "Von der Altstadt bis Benrath, von Kaiserswerth bis Hassels. Zum Beispiel in:",
    names: [
      "Altstadt",
      "Carlstadt",
      "Stadtmitte",
      "Pempelfort",
      "Derendorf",
      "Golzheim",
      "Unterbilk",
      "Bilk",
      "Friedrichstadt",
      "Oberbilk",
      "Flingern",
      "Düsseltal",
      "Oberkassel",
      "Heerdt",
      "Lörick",
      "Rath",
      "Kaiserswerth",
      "Gerresheim",
      "Eller",
      "Wersten",
      "Holthausen",
      "Benrath",
      "Hassels",
      "Hafen",
    ],
    outside: "Ihr Betrieb liegt außerhalb von Düsseldorf? Fragen Sie an. Ob wir ihn in unsere Touren aufnehmen können, sagen wir Ihnen im Standort-Check.",
  },
  faq: [
    {
      id: "umland",
      question: "Kommen Sie auch ins Umland?",
      answer: ["Unser Einsatzgebiet ist Düsseldorf und Umgebung. Ob Ihr Standort dazugehört, klären wir im kostenlosen Standort-Check."],
    },
    {
      id: "termin",
      question: "Wie schnell bekomme ich einen Termin?",
      answer: ["Den Erstbesuch vereinbaren wir im Standort-Check. Danach planen wir Ihre Prüftermine fest in unsere Touren ein."],
    },
    {
      id: "pflicht",
      question: "Gilt die Prüfpflicht auch für meinen kleinen Betrieb?",
      answer: [
        "Ja. Sobald Sie Mitarbeitende beschäftigen, gilt die DGUV Vorschrift 3, unabhängig von der Betriebsgröße. Wie oft geprüft wird, legen Sie in Ihrer Gefährdungsbeurteilung fest. Wir unterstützen Sie dabei.",
      ],
    },
  ] satisfies FaqItem[],
} as const;
