/**
 * FAQ entries. Short, honest, no legal advice.
 * `short: true` = shown on the validation landing page.
 * Never write "gesetzlich vorgeschrieben alle 6 Monate": intervals are set in the risk assessment.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  short?: boolean;
};

export const faq: FaqItem[] = [
  {
    id: "pflicht",
    question: "Muss ich meine elektrischen Geräte und Anlagen prüfen lassen?",
    answer: [
      "Ja. Als Arbeitgeber müssen Sie dafür sorgen, dass elektrische Anlagen und Betriebsmittel in sicherem Zustand sind (§ 5 ArbSchG, §§ 3, 4 und 14 BetrSichV, § 5 DGUV Vorschrift 3).",
      "Art, Umfang und Fristen der Prüfungen legen Sie in Ihrer Gefährdungsbeurteilung fest. Wir unterstützen Sie dabei.",
    ],
    short: true,
  },
  {
    id: "intervall",
    question: "Wie oft wird geprüft?",
    answer: [
      "Die DGUV Vorschrift 3 nennt Richtwerte: ortsveränderliche Geräte zum Beispiel alle 6 Monate, in Büros bei einer Fehlerquote unter 2 % bis zu 2 Jahre. Ortsfeste Anlagen in der Regel alle 4 Jahre, in Betriebsstätten, Räumen und Anlagen besonderer Art jährlich.",
      "Maßgeblich ist Ihre Gefährdungsbeurteilung.",
    ],
    short: true,
  },
  {
    id: "wer",
    question: "Wer darf prüfen?",
    answer: [
      "Ortsfeste Anlagen prüft nur eine Elektrofachkraft. Ortsveränderliche Geräte darf auch eine elektrotechnisch unterwiesene Person mit geeignetem Mess- und Prüfgerät prüfen, unter Leitung und Aufsicht einer Elektrofachkraft.",
    ],
  },
  {
    id: "mangel",
    question: "Was passiert, wenn ein Mangel gefunden wird?",
    answer: [
      "Wir ordnen jeden Mangel einer von drei Mängelklassen zu. Sie legt fest, wie schnell und auf welchem Weg er behoben wird.",
      "Klasse 1, ein Standardteil wie Stecker oder Abdeckung: Wir beheben den Mangel direkt bei der Prüfung.",
      "Klasse 2, ein objektspezifisches Teil: über die Ersatzteilbox oder innerhalb von 10 Werktagen.",
      "Klasse 3, größerer Aufwand: Sie bekommen ein eigenes Angebot.",
    ],
    short: true,
  },
  {
    id: "altmaengel",
    question: "Was ist mit Mängeln, die schon vorher da waren?",
    answer: [
      "Mängel, die vor Vertragsbeginn bestanden, sind nicht im Abo enthalten. Wir erfassen sie beim Erstbesuch und machen Ihnen ein separates Angebot.",
    ],
  },
  {
    id: "unterschied",
    question: "Was unterscheidet Sie von einem reinen Prüfdienstleister?",
    answer: [
      "Wir sind ein Meisterbetrieb. Prüfung und Reparatur kommen aus einer Hand, das digitale Betriebsbuch ist inklusive, und Sie zahlen einen festen Preis pro Standort.",
    ],
  },
  {
    id: "laufzeit",
    question: "Welche Laufzeit hat das Abo?",
    answer: ["Die Laufzeit beträgt 12 Monate. Bei 24 Monaten Laufzeit entfällt die einmalige Einrichtungsgebühr."],
    short: true,
  },
  {
    id: "schliessung",
    question: "Was passiert, wenn ein Standort schließt?",
    answer: ["Sie können einen Standort mit einer Frist von [X] Monaten abmelden."],
  },
  {
    id: "erstgespraech",
    question: "Kostet das Erstgespräch etwas?",
    answer: ["Nein. Das Erstgespräch dauert etwa 15 Minuten und ist unverbindlich."],
    short: true,
  },
];
