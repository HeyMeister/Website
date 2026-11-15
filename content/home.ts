/**
 * Copy for the landing page. Edit text here; components only handle layout.
 *
 * Audience: managing directors, operations managers and technical leads of companies with several
 * sites and no large in-house facilities team.
 * Pain: after the inspection there is a report, but the work stays with the head office.
 * Positioning: one contact for inspection and defect repair across all sites. HeyMeister does the
 * work itself and coordinates suitable specialist partners where needed.
 * Goal: a qualified request for a first pilot site.
 *
 * Page plan: hero · heute (today's effort) · ablauf (4 steps) · zentrale (benefits + example
 * overview) · pilot (start with one site) · faq · kontakt · closing
 *
 * Rules: no invented references, certificates, figures or logos; no promises of legal certainty,
 * fault-free operation or nationwide coverage; no blanket inspection intervals; no unlimited
 * repairs. Prices follow the actual scope; repairs only after separate approval.
 */
import type { FaqItem } from "./faq";

export const home = {
  hero: {
    eyebrow: "Elektroprüfung und Mängelbeseitigung für Filialisten",
    title: "Elektroprüfung erledigt. Mängel auch.",
    lead: "Wir organisieren die Elektroprüfungen Ihrer Filialen und kümmern uns um die anschließende Mängelbeseitigung. Sie geben die Arbeiten frei. Wir koordinieren die Umsetzung und dokumentieren das Ergebnis.",
    primaryCta: "Pilotfiliale anfragen",
    secondaryCta: "So funktioniert es",
    meta: "Start mit einer Filiale · Umfang und Preis vorab vereinbart",
  },

  /** Main action, word for word the same in nav, hero, pilot, close and phone bar. */
  mainAction: "Pilotfiliale anfragen",

  today: {
    eyebrow: "Heute",
    title: "Nach der Prüfung kommt der Bericht. Die Arbeit bleibt in der Zentrale.",
    lead: "Wer mehrere Standorte betreut, kennt diese Situationen:",
    items: [
      {
        icon: "file",
        title: "Prüfberichte an vielen Stellen",
        text: "PDFs im Postfach, Ordner in der Filiale, Listen vom letzten Dienstleister. Ein Gesamtbild fehlt.",
      },
      {
        icon: "people",
        title: "Unterschiedliche Ansprechpartner",
        text: "Jede Region hat einen anderen Elektriker. Für jeden Mangel beginnt die Suche nach jemandem, der Zeit hat.",
      },
      {
        icon: "list",
        title: "Offene Mängel ohne klaren Status",
        text: "Ist der Mangel aus dem letzten Bericht behoben, beauftragt oder noch offen? Das lässt sich oft nur durch Nachfragen klären.",
      },
      {
        icon: "calendar",
        title: "Filialleiter koordinieren Handwerker",
        text: "Termine abstimmen, Zugang organisieren, Rückfragen beantworten: Das läuft neben dem Tagesgeschäft.",
      },
    ],
  },

  steps: {
    eyebrow: "Ablauf",
    title: "Von der Prüfplanung bis zur dokumentierten Erledigung.",
    items: [
      { title: "Aufnehmen", text: "Wir erfassen Ihre Standorte, vorhandene Unterlagen und den Prüfbedarf." },
      { title: "Prüfen", text: "Wir stimmen die Prüftermine mit den Filialen ab und führen die Prüfungen durch." },
      { title: "Freigeben", text: "Festgestellte Mängel legen wir Ihnen mit Angebot zur Freigabe vor." },
      {
        title: "Erledigen",
        text: "Freigegebene Arbeiten führen wir aus oder koordinieren geeignete Fachpartner. Die Erledigung dokumentieren wir.",
      },
    ],
  },

  central: {
    eyebrow: "Für die Zentrale",
    title: "Ein Ansprechpartner. Ein Stand für alle Filialen.",
    items: [
      { title: "Ein Ansprechpartner", text: "Für Prüfung und Mängelbeseitigung, über alle Filialen." },
      { title: "Weniger Terminabstimmung", text: "Wir stimmen Termine direkt mit den Filialen ab." },
      { title: "Übersicht über offene Punkte", text: "Pro Standort sehen Sie Prüfstatus, offene Mängel und Bearbeitungsstand." },
      { title: "Zentrale Dokumentation", text: "Prüfberichte, Angebote und Erledigungsnachweise an einem Ort." },
    ],
  },

  pilot: {
    eyebrow: "Einstieg",
    title: "Starten Sie mit einer Filiale.",
    lead: "Sie müssen Ihren bisherigen Dienstleister nicht sofort wechseln. Wir beginnen mit einem bezahlten Pilotauftrag für einen Standort.",
    steps: [
      { title: "Umfang und Preis vorab", text: "Wir vereinbaren vor Beginn, was geprüft wird und was der Pilot kostet." },
      { title: "Prüfung und Mängel", text: "Wir prüfen die Pilotfiliale, legen Mängel zur Freigabe vor und erledigen die freigegebenen Arbeiten." },
      { title: "Dann entscheiden Sie", text: "Passt die Zusammenarbeit, erweitern wir die Betreuung auf weitere Standorte." },
    ],
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz beantwortet.",
    items: [
      {
        id: "elektriker",
        question: "Können wir unseren bisherigen Elektriker behalten?",
        answer: [
          "Ja. Sie starten mit einer Filiale, für die übrigen Standorte bleibt zunächst alles, wie es ist. Ob und wie Ihr bisheriger Elektriker bei der Mängelbeseitigung eingebunden werden kann, besprechen wir gern mit Ihnen.",
        ],
      },
      {
        id: "reparaturen",
        question: "Sind Reparaturen im Prüfpreis enthalten?",
        answer: [
          "Nein. Die Prüfung bieten wir nach tatsächlichem Umfang an. Festgestellte Mängel legen wir Ihnen mit einem Angebot vor. Ausgeführt wird erst, wenn Sie die Arbeiten freigegeben haben.",
        ],
      },
      {
        id: "wer",
        question: "Wer führt die Arbeiten aus?",
        answer: [
          "HeyMeister führt Prüfungen und Reparaturen selbst aus. Wo es die Anlage oder die Kapazität erfordert, koordinieren wir geeignete Fachpartner. Ihr Ansprechpartner und die Dokumentation bleiben dieselben.",
        ],
      },
      {
        id: "unterlagen",
        question: "Welche Unterlagen werden benötigt?",
        answer: [
          "Hilfreich sind eine Liste der Standorte mit Ansprechpartnern vor Ort, die letzten Prüfberichte und Mängellisten sowie die in Ihrer Gefährdungsbeurteilung festgelegten Prüffristen. Was fehlt, erfassen wir bei der Aufnahme.",
        ],
      },
    ] satisfies FaqItem[],
    disclaimer: "Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung.",
  },

  contact: {
    eyebrow: "Anfrage",
    title: "Pilotfiliale anfragen.",
    text: "Erzählen Sie uns kurz, um welche Filialen es geht. Wir melden uns und vereinbaren Umfang und Preis für den Pilot.",
    nextStepsTitle: "So geht es weiter",
    nextSteps: [
      "Sie senden uns Ihre Anfrage.",
      "Leon Ellerbrake meldet sich innerhalb von einem Werktag und bespricht die Pilotfiliale mit Ihnen.",
      "Sie erhalten ein Angebot mit festem Umfang und Preis für den Pilot.",
    ],
    submit: "Pilotfiliale anfragen",
    submitNote: "Unverbindlich.",
  },

  closing: {
    title: "Starten Sie mit einer Filiale.",
    text: "Prüfung, Mängel zur Freigabe, dokumentierte Erledigung. Ein Ansprechpartner.",
  },

  /**
   * Example site overview for the "Für die Zentrale" section (fictitious "Beispiel GmbH"),
   * always shown with the "Beispiel" label. Values are stored, not computed.
   */
  overviewExample: {
    title: "Standortübersicht",
    company: "Beispiel GmbH",
    summary: "5 Filialen",
    columns: { site: "Filiale", check: "Prüfstatus", defects: "Offene Mängel", work: "Bearbeitungsstand" },
    sites: [
      { name: "Bilk", check: "Geprüft 14.08.2026", checkTone: "ok", defects: 0, work: "Erledigt und dokumentiert", workTone: "ok" },
      { name: "Oberkassel", check: "Geprüft 02.10.2026", checkTone: "ok", defects: 3, work: "Angebot zur Freigabe", workTone: "due" },
      { name: "Flingern", check: "Geprüft 21.10.2026", checkTone: "ok", defects: 2, work: "In Ausführung", workTone: "info" },
      { name: "Benrath", check: "Termin 25.11.2026", checkTone: "due", defects: 0, work: "Prüfung geplant", workTone: "info" },
      { name: "Gerresheim", check: "Unterlagen fehlen", checkTone: "open", defects: 0, work: "Aufnahme folgt", workTone: "open" },
    ],
  },
} as const;

export type Tone = "ok" | "due" | "info" | "open";
