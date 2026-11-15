/**
 * The offer: one package, "HeyMeister Elektro-Service". Edit here only; the hero, the offer
 * section, the conditions and the tests read from this file.
 *
 * Text in **double asterisks** is set in bold (see components/ui/Rich.tsx).
 * Keep the wording close to the approved offer text: it is phrased with care (no guaranteed
 * repair time, intervals from the risk assessment).
 */

export const pricing = {
  currency: "EUR",
  name: "HeyMeister Elektro-Service",
  /** Monthly price per site in EUR, net. */
  monthly: 199,
  /** One-off site survey in EUR, net. */
  setupFee: 299,
  /** Extra working time in EUR, net, per hour (billed per started 15 minutes). */
  hourlyRate: 99,
  minTermMonths: 12,
  vatNote: "zzgl. gesetzlicher Umsatzsteuer",
  serviceRadiusKm: 25,

  included: [
    {
      icon: "plug",
      title: "Elektroprüfung",
      scope: "Ein Prüftermin pro Vertragsjahr für bis zu **50 ortsveränderliche Elektrogeräte und 10 Stromkreise** der Elektroinstallation",
    },
    { icon: "file", title: "Prüfdokumentation", scope: "Digitale Prüfprotokolle, Geräteverzeichnis und Übersicht festgestellter Mängel" },
    { icon: "calendar", title: "Fristenverwaltung", scope: "Überwachung der vereinbarten Prüftermine und rechtzeitige Terminabstimmung" },
    {
      icon: "wrench",
      title: "Reparaturservice",
      scope: "Bis zu **3 zusätzliche Serviceeinsätze pro Vertragsjahr**, insgesamt maximal **6 Arbeitsstunden vor Ort**",
    },
    { icon: "pin", title: "Anfahrt", scope: "Für die enthaltenen Prüf- und Serviceeinsätze innerhalb von **25 km um unseren Servicestützpunkt**" },
    { icon: "phone", title: "Telefonische Ersthilfe", scope: "Erste Einschätzung bei elektrischen Störungen während unserer Servicezeiten" },
    {
      icon: "bolt",
      title: "Bevorzugte Bearbeitung",
      scope: "Qualifizierte Rückmeldung spätestens am folgenden Arbeitstag; Vor-Ort-Termin nach Dringlichkeit und Vereinbarung",
    },
  ],

  typicalWork:
    "Fehlersuche bei ausgefallenen Steckdosen oder Beleuchtung, Prüfung wiederholt auslösender Sicherungen sowie kleinere Reparaturen an der allgemeinen Elektroinstallation.",

  extras: [
    "Weitere Arbeitszeit: **99 € netto pro Stunde**, Abrechnung je angefangene 15 Minuten.",
    "Material und Ersatzteile werden separat berechnet.",
    "Zusätzliche Prüfgeräte, Stromkreise oder häufigere Prüfungen werden vorab angeboten.",
    "Umbauten, Neuinstallationen und Reparaturen an Backöfen, Kälteanlagen oder anderen Produktionsmaschinen sind separat zu beauftragen.",
    "Nacht-, Wochenend- und Feiertagseinsätze sind nicht im Paket enthalten.",
  ],

  conditions: [
    "Die einmalige Standortaufnahme kostet **299 € netto**. Dabei erfassen wir Geräte, Anlagenumfang und Zustand und bestätigen, ob der Standort in das Paket passt. Bestehende Mängel bieten wir gesondert zur Behebung an.",
    "Die erforderlichen Prüffristen werden anhand der betrieblichen Gefährdungsbeurteilung festgelegt. Das Paket umfasst maximal einen Prüftermin jährlich; zusätzlich erforderliche Prüfungen werden separat vereinbart.",
    "Mindestlaufzeit: **12 Monate**. Monatliche Abrechnung. Nicht genutzte Serviceeinsätze und Arbeitsstunden verfallen zum Ende des Vertragsjahres. Eine bestimmte Reparaturdauer oder garantierte Wiederherstellung ist nicht Bestandteil des Pakets.",
  ],

  /** Framework agreement for chains. */
  frameworkMinSites: 10,
} as const;

/** Entry price used for "… €" mentions. */
export function lowestMonthlyPrice(): number {
  return pricing.monthly;
}
