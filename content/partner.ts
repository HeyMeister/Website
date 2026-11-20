/**
 * Page for electrical contractors (/partner): "Sie wollen Prüfaufträge? Wir vermitteln Ihnen Aufträge."
 *
 * Audience: electrical contractors (Elektrofachbetriebe) who want inspection jobs and, where they
 * fit, approved defect repairs at the branches of HeyMeister's customers.
 *
 * Rules: no promised job volumes, no invented figures or rates. Conditions are agreed in the first
 * conversation and the partner agreement.
 */
import type { FaqItem } from "./faq";

export const partner = {
  seo: {
    title: "Prüfaufträge für Elektrobetriebe",
    description:
      "Sie wollen Prüfaufträge? HeyMeister vermittelt Elektrofachbetrieben Elektroprüfungen und freigegebene Reparaturen in Filialen ihrer Region.",
    keywords: ["Prüfaufträge Elektro", "Aufträge für Elektriker", "Elektroprüfung Subunternehmer", "DGUV V3 Aufträge", "Fachpartner Elektro"],
  },

  hero: {
    eyebrow: "Für Elektrobetriebe",
    title: "Sie wollen Prüfaufträge? Wir vermitteln Ihnen Aufträge.",
    lead: "HeyMeister betreut Filialunternehmen bei Elektroprüfung und Mängelbeseitigung. Für Standorte in Ihrer Region suchen wir Elektrofachbetriebe, die Prüfungen und freigegebene Reparaturen übernehmen.",
    cta: "Als Fachpartner bewerben",
    secondary: "So funktioniert es",
    meta: "Keine Akquise. Umfang vorab klar. Sie entscheiden, was Sie annehmen.",
  },

  /** Example job request for the hero (fictitious customer, always shown with the "Beispiel" label). */
  jobExample: {
    label: "Auftragsanfrage",
    customer: "Beispiel GmbH",
    site: "Filiale Benrath, Verkaufsfläche",
    rows: [
      { term: "Leistung", value: "Wiederholungsprüfung ortsfeste Anlage und ortsveränderliche Geräte" },
      { term: "Umfang", value: "1 Unterverteilung, rund 40 Geräte" },
      { term: "Terminvorschlag", value: "KW 48, vor Ladenöffnung" },
      { term: "Unterlagen", value: "Letzter Prüfbericht, Verteilerplan" },
    ],
    accept: "Zusagen",
    decline: "Ablehnen",
  },

  steps: {
    eyebrow: "Ablauf",
    title: "Vom Kennenlernen zum ersten Auftrag.",
    items: [
      { icon: "send", title: "Bewerben", text: "Sie schicken uns Ihre Region und Ihre Leistungen über das Formular." },
      { icon: "calendar", title: "Kennenlernen", text: "Wir sprechen über Qualifikation, Kapazität und Konditionen und schließen eine Partnervereinbarung." },
      { icon: "file", title: "Anfrage erhalten", text: "Steht in Ihrer Region ein Auftrag an, schicken wir Ihnen Standort, Umfang und Terminvorschlag. Sie sagen zu oder ab." },
      { icon: "check", title: "Prüfen und abrechnen", text: "Sie führen die Arbeiten aus und liefern Bericht und Nachweise. Abgerechnet wird mit uns." },
    ],
  },

  benefits: {
    eyebrow: "Was Sie davon haben",
    title: "Aufträge ohne Akquise. Organisation übernehmen wir.",
    items: [
      { title: "Keine Akquise", text: "Wir gewinnen die Kunden und schicken Ihnen passende Anfragen aus Ihrer Region." },
      { title: "Umfang vorab klar", text: "Sie wissen vor der Zusage, was zu prüfen ist und welche Unterlagen vorliegen." },
      { title: "Termine stimmen wir ab", text: "Wir klären Termin und Zugang mit der Filiale. Sie kommen, wenn alles vorbereitet ist." },
      { title: "Ein Auftraggeber", text: "Sie rechnen mit HeyMeister ab, nicht mit jeder Filiale einzeln." },
      { title: "Freiwillig", text: "Keine Mindestmengen. Sie nehmen an, was in Ihre Planung passt." },
    ],
  },

  requirements: {
    eyebrow: "Voraussetzungen",
    title: "Wen wir suchen.",
    items: [
      { title: "Elektrofachbetrieb", text: "Eingetragen in die Handwerksrolle, mit verantwortlicher Elektrofachkraft." },
      { title: "Erfahrung mit Prüfungen", text: "Prüfung ortsfester Anlagen und/oder ortsveränderlicher Geräte im gewerblichen Umfeld." },
      { title: "Geeignete Messtechnik", text: "Kalibrierte Prüf- und Messgeräte, Prüfprotokolle in digitaler Form." },
      { title: "Betriebshaftpflicht", text: "Eine bestehende Betriebshaftpflichtversicherung." },
    ],
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Fragen von Elektrobetrieben.",
    disclaimer: "Die Einzelheiten regelt die Partnervereinbarung.",
  },

  signup: {
    eyebrow: "Bewerbung",
    title: "Als Fachpartner bewerben.",
    text: "Wir melden uns, lernen Sie kennen und besprechen, welche Aufträge in Ihrer Region passen.",
    submit: "Als Fachpartner bewerben",
    success: "Danke. Ihre Bewerbung ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen.",
  },
} as const;

export const partnerFaq: FaqItem[] = [
  {
    id: "menge",
    question: "Wie viele Aufträge kann ich erwarten?",
    answer: [
      "Das hängt davon ab, welche Kunden wir in Ihrer Region betreuen. Wir versprechen keine Mengen. Wenn ein Auftrag zu Ihrer Region und Ihren Leistungen passt, fragen wir Sie zuerst.",
    ],
  },
  {
    id: "pflicht",
    question: "Muss ich jede Anfrage annehmen?",
    answer: ["Nein. Sie sagen zu, was in Ihre Planung passt, und lehnen ab, was nicht passt. Es gibt keine Mindestmengen."],
  },
  {
    id: "verguetung",
    question: "Wie werde ich vergütet?",
    answer: [
      "Die Konditionen vereinbaren wir im Kennenlernen und halten sie in der Partnervereinbarung fest. Für jede Anfrage nennen wir Ihnen vorab Umfang und Vergütung.",
    ],
  },
  {
    id: "kunde",
    question: "Wer ist mein Auftraggeber?",
    answer: [
      "HeyMeister. Die Filialen haben uns als Ansprechpartner. Termine, Zugang und Rückfragen laufen über uns, die Dokumentation geht an uns.",
    ],
  },
  {
    id: "maengel",
    question: "Kann ich auch Mängel beseitigen?",
    answer: [
      "Ja, wenn es passt. Festgestellte Mängel legen wir dem Kunden mit Angebot zur Freigabe vor. Freigegebene Arbeiten können wir an Sie vergeben.",
    ],
  },
  {
    id: "region",
    question: "In welchen Regionen suchen Sie Partner?",
    answer: [
      "Wir starten in Düsseldorf und Umgebung. Bewerbungen aus anderen Regionen nehmen wir gern auf und melden uns, sobald dort Aufträge anstehen.",
    ],
  },
];
