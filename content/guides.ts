/**
 * Ratgeber (guides) for SEO: /ratgeber and /ratgeber/[slug].
 *
 * Rules: sober and correct, no fear, no legal advice. Intervals are indicative values and always
 * come with the risk-assessment note. No invented figures; prices only from content/pricing.ts.
 * Never use the withdrawn standard name; use DIN EN 50699 / DIN EN 50678.
 */
import type { FaqItem } from "./faq";
import type { PhotoKey } from "./photos";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: { term?: string; text: string }[];
  table?: { caption: string; head: string[]; rows: string[][] };
  note?: string;
};

export type Guide = {
  slug: string;
  title: string;
  /** Short title for cards and breadcrumbs. */
  short: string;
  seo: { title: string; description: string; keywords: string[] };
  teaser: string;
  lead: string;
  photo: PhotoKey;
  /** ISO date of the last content review. */
  updated: string;
  sections: GuideSection[];
  faq: FaqItem[];
  related: string[];
};

export const guidesHub = {
  seo: {
    title: "Ratgeber Elektroprüfung und DGUV V3",
    description:
      "Verständliche Antworten zu DGUV V3, Prüffristen, Prüfprotokoll, Mängeln und Kosten der Elektroprüfung. Für Betriebe mit einem oder vielen Standorten.",
  },
  eyebrow: "Ratgeber",
  title: "Elektroprüfung verständlich erklärt.",
  lead: "Was Pflicht ist, was Richtwert ist und was Sie konkret tun müssen. Kurz, sachlich und ohne Paragrafenwüste.",
  disclaimer: "Unsere Ratgeber geben einen allgemeinen Überblick und ersetzen keine Rechtsberatung.",
} as const;

const riskNote =
  "Die verbindlichen Prüffristen legen Sie in Ihrer Gefährdungsbeurteilung fest. Die Werte aus DGUV Vorschrift 3 sind Richtwerte. Wir unterstützen Sie dabei.";

export const guides: Guide[] = [
  {
    slug: "dguv-v3-pruefung",
    short: "DGUV V3 Prüfung",
    title: "DGUV V3 Prüfung: was sie ist, wen sie betrifft und wie sie abläuft",
    seo: {
      title: "DGUV V3 Prüfung: Pflicht und Ablauf",
      description:
        "Was die DGUV V3 Prüfung ist, welche Betriebe sie betrifft, was geprüft wird und wie der Ablauf aussieht. Verständlich erklärt vom Meisterbetrieb.",
      keywords: ["DGUV V3 Prüfung", "DGUV Vorschrift 3", "E-Prüfung Betrieb", "Elektroprüfung Pflicht", "Prüfung elektrischer Betriebsmittel"],
    },
    teaser: "Was hinter der Unfallverhütungsvorschrift steckt, wen sie betrifft und was bei der Prüfung passiert.",
    lead: "Die DGUV Vorschrift 3 ist die Unfallverhütungsvorschrift der Berufsgenossenschaften für elektrische Anlagen und Betriebsmittel. Sie verlangt, dass diese regelmäßig auf ihren ordnungsgemäßen Zustand geprüft werden. Hier lesen Sie, was das für Ihren Betrieb bedeutet.",
    photo: "devices",
    updated: "2026-11-17",
    sections: [
      {
        id: "was",
        title: "Was ist die DGUV Vorschrift 3?",
        paragraphs: [
          "Die DGUV Vorschrift 3 „Elektrische Anlagen und Betriebsmittel“ gilt für alle Unternehmen, die Mitarbeitende beschäftigen und bei einer Berufsgenossenschaft versichert sind. Für manche Unfallversicherungsträger heißt die inhaltsgleiche Vorschrift DGUV Vorschrift 4.",
          "Kern ist § 5: Der Unternehmer muss dafür sorgen, dass elektrische Anlagen und Betriebsmittel vor der ersten Inbetriebnahme, nach Änderungen oder Instandsetzung und in bestimmten Zeitabständen auf ihren ordnungsgemäßen Zustand geprüft werden.",
        ],
      },
      {
        id: "wen",
        title: "Wen betrifft die Prüfung?",
        paragraphs: [
          "Jeden Arbeitgeber, unabhängig von der Betriebsgröße: die Arztpraxis ebenso wie den Filialisten mit 30 Standorten. Entscheidend ist, dass Mitarbeitende mit elektrischen Anlagen oder Geräten arbeiten oder in ihrer Nähe sind.",
          "Neben der DGUV Vorschrift 3 verlangen auch das Arbeitsschutzgesetz und die Betriebssicherheitsverordnung, dass Arbeitsmittel sicher sind und regelmäßig geprüft werden.",
        ],
      },
      {
        id: "was-wird-geprueft",
        title: "Was wird geprüft?",
        paragraphs: ["Die Prüfung umfasst zwei Bereiche:"],
        list: [
          {
            term: "Ortsveränderliche Geräte",
            text: "Alles mit Stecker: vom Wasserkocher über den Monitor bis zur Kabeltrommel. Geprüft nach DIN EN 50699 (VDE 0702), nach einer Reparatur nach DIN EN 50678 (VDE 0701).",
          },
          {
            term: "Ortsfeste Anlagen",
            text: "Verteiler, Stromkreise, Steckdosen, Fehlerstrom-Schutzschalter und fest angeschlossene Geräte. Geprüft nach DIN VDE 0105-100.",
          },
        ],
      },
      {
        id: "ablauf",
        title: "Wie läuft eine Prüfung ab?",
        paragraphs: ["Eine Geräteprüfung besteht aus mehreren Schritten, die für jedes Gerät dokumentiert werden:"],
        list: [
          { term: "Sichtprüfung", text: "Gehäuse, Stecker, Leitung und Knickschutz werden auf Beschädigungen untersucht." },
          { term: "Messung", text: "Schutzleiterwiderstand, Isolationswiderstand und Schutzleiter- oder Berührungsstrom, je nach Schutzklasse." },
          { term: "Funktionsprüfung", text: "Das Gerät wird eingeschaltet und auf seine Funktion geprüft." },
          { term: "Dokumentation", text: "Ergebnis und Messwerte werden protokolliert, das Gerät erhält eine Prüfplakette mit dem nächsten Termin." },
        ],
      },
      {
        id: "fristen",
        title: "Wie oft muss geprüft werden?",
        paragraphs: [
          "DGUV Vorschrift 3 nennt Richtwerte, zum Beispiel 6 Monate für ortsveränderliche Geräte und 4 Jahre für ortsfeste Anlagen. Wie oft in Ihrem Betrieb geprüft wird, hängt davon ab, wie stark die Geräte beansprucht werden.",
        ],
        note: riskNote,
      },
    ],
    faq: [
      {
        id: "kleinbetrieb",
        question: "Gilt die DGUV V3 auch für kleine Betriebe?",
        answer: ["Ja. Sobald Sie Mitarbeitende beschäftigen, gilt die Vorschrift, unabhängig von der Zahl der Beschäftigten."],
      },
      {
        id: "neugeraete",
        question: "Müssen neue Geräte auch geprüft werden?",
        answer: [
          "Neue Geräte prüft der Hersteller vor der Auslieferung. Die Wiederholungsprüfung beginnt mit der Nutzung in Ihrem Betrieb. Nehmen Sie neue Geräte am besten gleich ins Verzeichnis auf, damit der nächste Termin feststeht.",
        ],
      },
    ],
    related: ["pruefristen", "ortsveraenderliche-geraete", "wer-darf-pruefen"],
  },
  {
    slug: "pruefristen",
    short: "Prüffristen",
    title: "Prüffristen nach DGUV V3: Richtwerte und was wirklich gilt",
    seo: {
      title: "Prüffristen nach DGUV V3",
      description:
        "Prüffristen für ortsveränderliche Geräte und ortsfeste Anlagen nach DGUV V3, Tabellen 1A bis 1C. Und warum Ihre Gefährdungsbeurteilung entscheidet.",
      keywords: ["Prüffristen DGUV V3", "Prüffrist ortsveränderliche Geräte", "Prüffrist Elektroanlage", "DGUV V3 Tabelle 1B", "Prüfintervall Elektrogeräte"],
    },
    teaser: "Die Richtwerte aus den Tabellen 1A bis 1C und warum Ihre Gefährdungsbeurteilung entscheidet.",
    lead: "Wie oft Geräte und Anlagen geprüft werden müssen, steht nicht als feste Zahl im Gesetz. DGUV Vorschrift 3 nennt Richtwerte, verbindlich ist Ihre Gefährdungsbeurteilung. So finden Sie die richtigen Fristen.",
    photo: "cableReel",
    updated: "2026-11-17",
    sections: [
      {
        id: "grundsatz",
        title: "Der Grundsatz: so oft, dass Mängel rechtzeitig auffallen",
        paragraphs: [
          "Die Fristen sind so zu bemessen, dass Mängel, mit denen gerechnet werden muss, rechtzeitig festgestellt werden. Wer seine Geräte stark beansprucht, prüft häufiger. Wer wenig Ausfälle hat, kann die Abstände verlängern.",
        ],
        note: riskNote,
      },
      {
        id: "geraete",
        title: "Ortsveränderliche Geräte (Tabelle 1B)",
        paragraphs: [
          "Der Richtwert für ortsveränderliche elektrische Betriebsmittel liegt bei 6 Monaten, auf Baustellen bei 3 Monaten. Liegt die Fehlerquote bei den Prüfungen unter 2 %, kann die Frist verlängert werden.",
        ],
        table: {
          caption: "Richtwerte für ortsveränderliche Geräte nach DGUV Vorschrift 3, Tabelle 1B",
          head: ["Bereich", "Richtwert", "Bei Fehlerquote unter 2 % höchstens"],
          rows: [
            ["Allgemein", "6 Monate", "–"],
            ["Baustellen", "3 Monate", "1 Jahr"],
            ["Werkstätten, Fertigungsstätten", "6 Monate", "1 Jahr"],
            ["Büros und ähnliche Bedingungen", "6 Monate", "2 Jahre"],
          ],
        },
      },
      {
        id: "anlagen",
        title: "Ortsfeste Anlagen (Tabelle 1A)",
        paragraphs: ["Für die festen Installationen gelten längere Richtwerte:"],
        table: {
          caption: "Richtwerte für ortsfeste Anlagen nach DGUV Vorschrift 3, Tabelle 1A",
          head: ["Anlage", "Richtwert", "Wer prüft"],
          rows: [
            ["Elektrische Anlagen und ortsfeste Betriebsmittel", "4 Jahre", "Elektrofachkraft"],
            ["Anlagen in Betriebsstätten, Räumen und Anlagen besonderer Art", "1 Jahr", "Elektrofachkraft"],
            ["Fehlerstrom-Schutzschalter in stationären Anlagen (Prüftaste)", "6 Monate", "Benutzer"],
          ],
        },
      },
      {
        id: "schutzmittel",
        title: "Schutz- und Hilfsmittel (Tabelle 1C)",
        paragraphs: [
          "Isolierende Schutzausrüstung, etwa Handschuhe oder Werkzeuge für Arbeiten unter Spannung, wird vor jeder Benutzung auf Mängel geprüft und in festen Abständen von 6 oder 12 Monaten auf ihre Isolationseigenschaften. Das betrifft vor allem Elektrobetriebe selbst.",
        ],
      },
      {
        id: "festlegen",
        title: "So legen Sie Ihre Fristen fest",
        paragraphs: ["Drei Fragen helfen bei der Gefährdungsbeurteilung:"],
        list: [
          { text: "Wie stark werden die Geräte beansprucht? Ein Monitor im Büro altert anders als eine Kabeltrommel in der Werkstatt." },
          { text: "Wie hoch war die Fehlerquote bei den letzten Prüfungen?" },
          { text: "Gibt es Bereiche besonderer Art, etwa Feuchträume, Saunen oder Baustellen?" },
        ],
      },
    ],
    faq: [
      {
        id: "verlaengern",
        question: "Darf ich die Frist einfach verlängern?",
        answer: [
          "Nur begründet. Grundlage ist die Fehlerquote der bisherigen Prüfungen und die Gefährdungsbeurteilung. Dokumentieren Sie, warum Sie eine längere Frist gewählt haben.",
        ],
      },
      {
        id: "ueberzogen",
        question: "Was ist, wenn eine Frist überschritten ist?",
        answer: ["Holen Sie die Prüfung so bald wie möglich nach. Bis dahin sollten auffällig beschädigte Geräte nicht benutzt werden."],
      },
    ],
    related: ["dguv-v3-pruefung", "ortsveraenderliche-geraete", "pruefprotokoll"],
  },
  {
    slug: "ortsveraenderliche-geraete",
    short: "Ortsveränderliche Geräte",
    title: "Ortsveränderliche Geräte: welche geprüft werden müssen",
    seo: {
      title: "Ortsveränderliche Geräte prüfen",
      description:
        "Welche Geräte als ortsveränderlich gelten, wie sie nach DIN EN 50699 geprüft werden und was mit privaten Geräten der Mitarbeitenden ist.",
      keywords: ["ortsveränderliche Geräte prüfen", "ortsveränderliche Betriebsmittel", "DIN EN 50699", "Geräteprüfung", "Prüfplakette"],
    },
    teaser: "Was als ortsveränderlich gilt, wie geprüft wird und was mit privaten Geräten ist.",
    lead: "Vom Kaffeevollautomaten bis zur Mehrfachsteckdose: Ortsveränderliche Geräte machen in den meisten Betrieben den größten Teil der Prüfung aus. Was dazugehört und worauf Sie achten sollten.",
    photo: "devices",
    updated: "2026-11-17",
    sections: [
      {
        id: "definition",
        title: "Was heißt ortsveränderlich?",
        paragraphs: [
          "Ortsveränderlich sind Geräte, die während des Betriebs bewegt werden oder sich leicht von einem Platz zum anderen bringen lassen, während sie angeschlossen sind. Faustregel: Alles mit Stecker, das nicht fest montiert ist.",
        ],
      },
      {
        id: "beispiele",
        title: "Typische Beispiele",
        paragraphs: ["In fast jedem Betrieb zu finden:"],
        list: [
          { term: "Büro", text: "Monitore, PCs, Drucker, Ladegeräte, Schreibtischlampen" },
          { term: "Küche und Sozialraum", text: "Kaffeemaschine, Wasserkocher, Mikrowelle, Kühlschrank mit Stecker" },
          { term: "Verlängerungen", text: "Mehrfachsteckdosen, Verlängerungsleitungen, Kabeltrommeln" },
          { term: "Werkstatt und Lager", text: "Elektrowerkzeuge, Ladegeräte, Staubsauger, Ventilatoren" },
        ],
      },
      {
        id: "pruefung",
        title: "Wie wird geprüft?",
        paragraphs: [
          "Die Wiederholungsprüfung folgt DIN EN 50699 (VDE 0702): Sichtprüfung, Messung von Schutzleiter- und Isolationswiderstand sowie Schutzleiter- oder Berührungsstrom, Funktionsprüfung und Dokumentation. Nach einer Reparatur wird nach DIN EN 50678 (VDE 0701) geprüft, bevor das Gerät wieder benutzt wird.",
          "Für die Messung wird jedes Gerät kurz vom Netz genommen. Bei Computern stimmt man die Reihenfolge deshalb mit den Nutzern ab.",
        ],
      },
      {
        id: "privat",
        title: "Und private Geräte der Mitarbeitenden?",
        paragraphs: [
          "Bringen Mitarbeitende eigene Geräte mit, etwa einen Wasserkocher oder ein Handy-Ladegerät, sollten Sie das klar regeln: entweder nicht erlauben oder in die Prüfung aufnehmen. Was im Betrieb benutzt wird, gehört in Ihre Verantwortung.",
        ],
      },
      {
        id: "verzeichnis",
        title: "Ohne Verzeichnis geht es nicht",
        paragraphs: [
          "Damit keine Geräte durchrutschen, braucht jedes Gerät eine eindeutige Nummer und einen Eintrag mit Standort, letzter Prüfung und nächstem Termin. Im digitalen Betriebsbuch geschieht das bei der ersten Prüfung automatisch.",
        ],
      },
    ],
    faq: [
      {
        id: "plakette",
        question: "Reicht eine Prüfplakette als Nachweis?",
        answer: [
          "Die Plakette zeigt den nächsten Termin, sie ersetzt aber nicht das Protokoll. Die Ergebnisse müssen aufgezeichnet und mindestens bis zur nächsten Prüfung aufbewahrt werden.",
        ],
      },
      {
        id: "fest",
        question: "Was ist mit fest angeschlossenen Geräten?",
        answer: ["Fest angeschlossene Geräte, etwa ein Durchlauferhitzer oder ein Herd, gehören zu den ortsfesten Betriebsmitteln und werden mit der Anlage geprüft."],
      },
    ],
    related: ["pruefristen", "pruefprotokoll", "wer-darf-pruefen"],
  },
  {
    slug: "wer-darf-pruefen",
    short: "Wer darf prüfen?",
    title: "Wer darf Elektroprüfungen durchführen? Elektrofachkraft und unterwiesene Person",
    seo: {
      title: "Wer darf Elektrogeräte prüfen?",
      description:
        "Wer Elektroprüfungen nach DGUV V3 durchführen darf: Elektrofachkraft, elektrotechnisch unterwiesene Person und zur Prüfung befähigte Person erklärt.",
      keywords: ["Elektrofachkraft Prüfung", "elektrotechnisch unterwiesene Person", "befähigte Person BetrSichV", "wer darf DGUV V3 prüfen", "EuP Geräteprüfung"],
    },
    teaser: "Elektrofachkraft, unterwiesene Person und befähigte Person: wer was prüfen darf.",
    lead: "Nicht jeder darf prüfen, aber auch nicht jede Prüfung braucht einen Meister. Wer welche Prüfung übernehmen darf, regeln DGUV Vorschrift 3 und die Betriebssicherheitsverordnung.",
    photo: "breakers",
    updated: "2026-11-17",
    sections: [
      {
        id: "efk",
        title: "Die Elektrofachkraft",
        paragraphs: [
          "Elektrofachkraft ist, wer aufgrund fachlicher Ausbildung, Kenntnissen und Erfahrungen sowie Kenntnis der einschlägigen Bestimmungen die übertragenen Arbeiten beurteilen und mögliche Gefahren erkennen kann. In der Regel ist das ein Elektroniker, Elektrotechniker oder Elektromeister.",
          "Ortsfeste Anlagen und Geräte nach einer Reparatur prüft die Elektrofachkraft.",
        ],
      },
      {
        id: "eup",
        title: "Die elektrotechnisch unterwiesene Person",
        paragraphs: [
          "Eine elektrotechnisch unterwiesene Person wurde von einer Elektrofachkraft über ihre Aufgaben und die möglichen Gefahren unterrichtet. Sie darf ortsveränderliche Geräte prüfen, wenn sie unter Leitung und Aufsicht einer Elektrofachkraft arbeitet und geeignete Mess- und Prüfgeräte verwendet.",
        ],
      },
      {
        id: "befaehigt",
        title: "Die zur Prüfung befähigte Person",
        paragraphs: [
          "Die Betriebssicherheitsverordnung spricht von der zur Prüfung befähigten Person: Sie hat durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit die nötigen Fachkenntnisse. Für elektrische Prüfungen erfüllt das in der Regel eine Elektrofachkraft.",
        ],
      },
      {
        id: "selbst",
        title: "Können wir selbst prüfen?",
        paragraphs: [
          "Grundsätzlich ja, wenn Sie eine Elektrofachkraft beschäftigen, die die Prüfungen leitet, und geeignete, kalibrierte Prüfgeräte haben. Für die meisten Betriebe ohne eigene Haustechnik ist das zu aufwendig. Dann übernimmt ein Elektrofachbetrieb die Prüfung.",
        ],
      },
    ],
    faq: [
      {
        id: "hausmeister",
        question: "Darf unser Hausmeister die Geräte prüfen?",
        answer: [
          "Nur, wenn er als elektrotechnisch unterwiesene Person unter Leitung und Aufsicht einer Elektrofachkraft arbeitet und ein geeignetes Prüfgerät verwendet. Eine Sichtprüfung allein reicht nicht.",
        ],
      },
      {
        id: "heymeister",
        question: "Wer prüft bei HeyMeister?",
        answer: [
          "Ortsfeste Anlagen prüft eine Elektrofachkraft. Geräte prüfen elektrotechnisch geschulte Mitarbeitende unter Leitung unseres Meisters, mit kalibrierten Prüfgeräten.",
        ],
      },
    ],
    related: ["dguv-v3-pruefung", "pruefprotokoll", "kosten-elektropruefung"],
  },
  {
    slug: "pruefprotokoll",
    short: "Prüfprotokoll",
    title: "Prüfprotokoll und Nachweis: was drinstehen muss",
    seo: {
      title: "Prüfprotokoll: Pflichtangaben",
      description:
        "Was ein Prüfprotokoll nach BetrSichV und DIN EN 50699 enthalten muss, wie lange Sie es aufbewahren und warum ein digitales Betriebsbuch hilft.",
      keywords: ["Prüfprotokoll Elektroprüfung", "Nachweis DGUV V3", "BetrSichV § 14 Aufzeichnung", "Prüfbericht Elektro", "Prüfdokumentation"],
    },
    teaser: "Pflichtangaben, Aufbewahrung und warum der Nachweis im entscheidenden Moment zählt.",
    lead: "Eine Prüfung ohne Nachweis ist im Ernstfall kaum etwas wert. Welche Angaben ins Protokoll gehören und wie lange Sie es aufbewahren.",
    photo: "cabinet",
    updated: "2026-11-17",
    sections: [
      {
        id: "pflicht",
        title: "Was muss im Protokoll stehen?",
        paragraphs: [
          "Die Betriebssicherheitsverordnung (§ 14) verlangt, dass das Ergebnis jeder Prüfung aufgezeichnet wird. Die Aufzeichnung muss mindestens Auskunft geben über:",
        ],
        list: [
          { text: "die Art der Prüfung" },
          { text: "den Prüfumfang" },
          { text: "das Ergebnis der Prüfung" },
          { text: "Name und Unterschrift der zur Prüfung befähigten Person (bei rein elektronischen Dokumenten eine elektronische Signatur)" },
        ],
      },
      {
        id: "praxis",
        title: "Was in der Praxis dazugehört",
        paragraphs: ["Damit ein Protokoll nachvollziehbar ist, enthält es zusätzlich:"],
        list: [
          { text: "Datum und Standort" },
          { text: "die eindeutige Kennung jedes Geräts oder Stromkreises" },
          { text: "die Messwerte und das verwendete Messgerät" },
          { text: "festgestellte Mängel und was damit passiert ist" },
          { text: "den Termin der nächsten Prüfung" },
        ],
      },
      {
        id: "aufbewahrung",
        title: "Wie lange aufbewahren?",
        paragraphs: [
          "Mindestens bis zur nächsten Prüfung. Sinnvoll ist es, Protokolle länger aufzubewahren: So lässt sich zeigen, dass lückenlos geprüft wurde, und die Fehlerquote der letzten Jahre belegt, ob längere Fristen gerechtfertigt sind.",
        ],
      },
      {
        id: "wer-fragt",
        title: "Wer nach dem Nachweis fragt",
        paragraphs: [
          "Nach einem Brand oder Unfall fragen Versicherer und Berufsgenossenschaft nach den Prüfprotokollen. Auch bei Begehungen oder Audits werden sie verlangt. Wer sie dann sofort vorlegen kann, ist auf der sicheren Seite.",
        ],
      },
      {
        id: "digital",
        title: "Papier, Excel oder Betriebsbuch?",
        paragraphs: [
          "Ordner und Excel-Listen funktionieren, solange ein Mensch sie pflegt. Bei mehreren Standorten wird es schnell unübersichtlich. Ein digitales Betriebsbuch hält alle Protokolle an einem Ort, zeigt die nächsten Fristen und ist abrufbar, wenn jemand fragt.",
        ],
      },
    ],
    faq: [
      {
        id: "digital-erlaubt",
        question: "Sind digitale Protokolle erlaubt?",
        answer: ["Ja. Bei ausschließlich elektronisch übermittelten Dokumenten tritt eine elektronische Signatur an die Stelle der Unterschrift."],
      },
      {
        id: "plakette-reicht",
        question: "Reicht die Plakette am Gerät?",
        answer: ["Nein. Die Plakette zeigt den nächsten Termin, der Nachweis ist das Protokoll."],
      },
    ],
    related: ["maengel-im-pruefbericht", "pruefristen", "dguv-v3-pruefung"],
  },
  {
    slug: "maengel-im-pruefbericht",
    short: "Mängel im Prüfbericht",
    title: "Mängel im Prüfbericht: so gehen Sie richtig vor",
    seo: {
      title: "Mängel im Prüfbericht: was tun?",
      description:
        "Der Prüfbericht listet Mängel auf? So priorisieren Sie, wann ein Gerät nicht mehr benutzt werden darf und wie Sie die Behebung nachweisen.",
      keywords: ["Mängel Prüfbericht Elektro", "Mängelbeseitigung Elektro", "DGUV V3 Mängel", "Mängelliste Elektroprüfung", "Elektromängel beheben"],
    },
    teaser: "Priorisieren, beheben, nachweisen: was nach dem Bericht zu tun ist.",
    lead: "Ein Mangel im Prüfbericht ist erst erledigt, wenn er behoben und dokumentiert ist. So gehen Sie vor, damit aus dem Bericht kein Papier in der Schublade wird.",
    photo: "installation",
    updated: "2026-11-17",
    sections: [
      {
        id: "pflicht",
        title: "Was die Vorschrift verlangt",
        paragraphs: [
          "Wird ein Mangel festgestellt, muss der Unternehmer dafür sorgen, dass er unverzüglich behoben wird. Besteht bis dahin eine dringende Gefahr, darf die Anlage oder das Gerät nicht benutzt werden (DGUV Vorschrift 3, § 3).",
        ],
      },
      {
        id: "priorisieren",
        title: "Schritt 1: priorisieren",
        paragraphs: ["Nicht jeder Mangel ist gleich dringend. Sortieren Sie den Bericht nach drei Fragen:"],
        list: [
          { text: "Geht von dem Mangel eine unmittelbare Gefahr aus? Dann Gerät sofort aus dem Verkehr ziehen oder Stromkreis abschalten lassen." },
          { text: "Lässt er sich mit einem Standardteil beheben, etwa einem neuen Stecker oder einer Abdeckung?" },
          { text: "Braucht es ein spezielles Ersatzteil oder größeren Aufwand?" },
        ],
      },
      {
        id: "beheben",
        title: "Schritt 2: beheben lassen",
        paragraphs: [
          "Arbeiten an elektrischen Anlagen gehören in die Hände einer Elektrofachkraft. Ein repariertes Gerät wird vor der Wiederinbetriebnahme nach DIN EN 50678 (VDE 0701) geprüft.",
        ],
      },
      {
        id: "nachweisen",
        title: "Schritt 3: Erledigung nachweisen",
        paragraphs: [
          "Halten Sie fest, wann welcher Mangel von wem behoben wurde. Ohne diesen Nachweis zeigt der Bericht später nur, dass ein Mangel bekannt war.",
        ],
      },
      {
        id: "abo",
        title: "So machen wir es im Abo",
        paragraphs: ["Wir ordnen jeden Mangel einer festen Klasse zu:"],
        list: [
          { term: "Klasse 1", text: "Standardteil wie Stecker, Abdeckung oder Leitung: direkt bei der Prüfung behoben." },
          { term: "Klasse 2", text: "Objektspezifisches Teil: innerhalb von 10 Werktagen." },
          { term: "Klasse 3", text: "Größerer Aufwand: eigenes Angebot, ohne Verpflichtung." },
        ],
        note: "Mängel, die vor Vertragsbeginn bestanden, erfassen wir beim Erstbesuch und bieten sie separat an.",
      },
    ],
    faq: [
      {
        id: "weiterbenutzen",
        question: "Darf ein Gerät mit Mangel weiter benutzt werden?",
        answer: ["Wenn von dem Mangel eine Gefahr ausgeht, nein. Im Zweifel nehmen Sie das Gerät außer Betrieb, bis eine Elektrofachkraft es beurteilt hat."],
      },
      {
        id: "anderer-betrieb",
        question: "Muss derselbe Betrieb prüfen und reparieren?",
        answer: [
          "Nein. Es ist aber einfacher: Wer prüft und repariert, kann kleine Mängel direkt beheben und dokumentiert alles an einem Ort.",
        ],
      },
    ],
    related: ["pruefprotokoll", "kosten-elektropruefung", "dguv-v3-pruefung"],
  },
  {
    slug: "kosten-elektropruefung",
    short: "Kosten",
    title: "Was kostet eine Elektroprüfung? Preismodelle im Vergleich",
    seo: {
      title: "Kosten der Elektroprüfung: Preismodelle",
      description:
        "Wovon die Kosten einer Elektroprüfung abhängen und welche Preismodelle es gibt: pro Gerät, nach Aufwand oder als Abo mit festem Monatspreis.",
      keywords: ["Kosten Elektroprüfung", "DGUV V3 Prüfung Kosten", "Preis Geräteprüfung", "Elektroprüfung Preis pro Gerät", "E-Prüfung Kosten"],
    },
    teaser: "Wovon der Preis abhängt und welche Modelle es gibt: pro Gerät, nach Aufwand oder im Abo.",
    lead: "Die Kosten einer Elektroprüfung hängen weniger vom Stundensatz ab als davon, was am Ende auf der Rechnung steht. Ein Überblick über die üblichen Preismodelle.",
    photo: "breakers",
    updated: "2026-11-17",
    sections: [
      {
        id: "faktoren",
        title: "Wovon die Kosten abhängen",
        paragraphs: ["Vier Faktoren bestimmen den Preis:"],
        list: [
          { term: "Menge", text: "Anzahl der Geräte, Verteilungen und Stromkreise." },
          { term: "Zugänglichkeit", text: "Wie leicht kommt man an Geräte und Verteiler? Muss außerhalb der Öffnungszeiten geprüft werden?" },
          { term: "Anfahrt", text: "Wie viele Standorte, wie weit auseinander?" },
          { term: "Mängel", text: "Was kostet die Behebung, und wird sie separat abgerechnet?" },
        ],
      },
      {
        id: "modelle",
        title: "Die üblichen Preismodelle",
        paragraphs: [],
        list: [
          { term: "Preis pro Gerät", text: "Übersichtlich für die Geräteprüfung. Anfahrt, Anlagenprüfung und Reparaturen kommen meist dazu." },
          { term: "Nach Aufwand", text: "Stundensatz plus Anfahrt und Material. Flexibel, aber schwer planbar." },
          { term: "Abo mit festem Monatspreis", text: "Prüfung, Kleinreparaturen und Dokumentation zu einem festen Preis pro Standort. Planbar, auch für mehrere Standorte." },
        ],
      },
      {
        id: "versteckt",
        title: "Worauf Sie beim Angebot achten sollten",
        paragraphs: ["Fragen Sie nach, ob diese Punkte enthalten sind:"],
        list: [
          { text: "Anfahrt und Anfahrtspauschalen" },
          { text: "Prüfung der ortsfesten Anlage, nicht nur der Geräte" },
          { text: "Behebung kleiner Mängel wie Stecker oder Abdeckungen" },
          { text: "Prüfbericht als PDF und Erinnerung an den nächsten Termin" },
        ],
      },
      {
        id: "heymeister",
        title: "Unser Modell",
        paragraphs: [
          "Bei HeyMeister zahlen Sie einen festen Monatspreis pro Standort, abhängig von der Standortgröße. Darin enthalten: Geräte- und Anlagenprüfung, Kleinreparaturen und das digitale Betriebsbuch. Ab 5 Standorten gibt es Mengenrabatt.",
        ],
      },
    ],
    faq: [
      {
        id: "guenstig",
        question: "Ist die Prüfung pro Gerät nicht günstiger?",
        answer: [
          "Für die reine Geräteprüfung manchmal. Rechnen Sie aber Anfahrt, Anlagenprüfung, Reparaturen und die eigene Zeit für Organisation dazu. Dann zeigt sich, welches Modell für Sie günstiger ist.",
        ],
      },
      {
        id: "erstgespraech",
        question: "Was kostet das Erstgespräch?",
        answer: ["Nichts. Im kostenlosen Standort-Check klären wir in 15 Minuten, was Sie brauchen, und Sie bekommen ein festes Angebot."],
      },
    ],
    related: ["maengel-im-pruefbericht", "dguv-v3-pruefung", "wer-darf-pruefen"],
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
