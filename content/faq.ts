/**
 * FAQ items. Short, honest, no legal advice; intervals always come from the risk assessment.
 * Homepage questions are here; segment and partner questions live with their pages.
 */

export type FaqItem = { id: string; question: string; answer: string[] };

export const homeFaq: FaqItem[] = [
  {
    id: "pflicht",
    question: "Muss ich meine Elektrik überhaupt prüfen lassen?",
    answer: [
      "Ja. Als Arbeitgeber müssen Sie für den sicheren Zustand Ihrer Arbeitsmittel und Anlagen sorgen (ArbSchG § 5, BetrSichV, DGUV Vorschrift 3). Wie oft, legen Sie in Ihrer Gefährdungsbeurteilung fest. Wir unterstützen Sie dabei.",
    ],
  },
  {
    id: "elektriker",
    question: "Wir haben doch schon einen Elektriker.",
    answer: [
      "Dann fragen Sie ihn, wann Ihre Geräte zuletzt geprüft wurden und wo der Nachweis liegt. Wenn die Antwort sofort kommt: gut. Wenn nicht, sprechen wir gern.",
    ],
  },
  {
    id: "nichts-kaputt",
    question: "Zahle ich auch, wenn nichts kaputt ist?",
    answer: [
      "Ja, genau wie bei einer Versicherung. Der Unterschied: Bei uns gibt es trotzdem jedes Jahr eine Leistung, nämlich die Prüfung und den Nachweis.",
    ],
  },
  {
    id: "mangel",
    question: "Was passiert, wenn ein Mangel gefunden wird?",
    answer: [
      "Kleine Mängel beheben wir sofort. Objektspezifische Teile innerhalb von 10 Werktagen. Für größere Arbeiten bekommen Sie ein eigenes Angebot, ohne Verpflichtung.",
    ],
  },
  {
    id: "wer",
    question: "Wer prüft?",
    answer: [
      "Ortsfeste Anlagen prüft eine Elektrofachkraft. Geräte prüfen elektrotechnisch geschulte Mitarbeitende unter Leitung unseres Meisters.",
    ],
  },
  {
    id: "laufzeit",
    question: "Wie lange läuft der Vertrag?",
    answer: ["12 Monate. Bei 24 Monaten entfällt die Einrichtungsgebühr."],
  },
  {
    id: "schliessung",
    question: "Was passiert, wenn ein Standort schließt?",
    answer: ["Sie melden ihn mit einer Frist von drei Monaten zum Monatsende ab."],
  },
  {
    id: "erstgespraech",
    question: "Was kostet das Erstgespräch?",
    answer: ["Nichts."],
  },
];
