/**
 * Legal content (Impressum, Datenschutz).
 *
 * IMPORTANT: The build fails when PUBLIC_LAUNCH=true and this file still contains
 * [PLACEHOLDERS] (scripts/check-launch.ts). The operator of the website is still open
 * (Leon's company or a joint company); the Meisterbetrieb/Handwerksrolle statements
 * must apply to exactly this operator.
 */

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export const operator = {
  company: "[BETREIBER-FIRMA]",
  /** GmbH in formation. Change to "GmbH" after registration in the commercial register. */
  legalForm: "GmbH i. G.",
  street: "[STRASSE UND HAUSNUMMER]",
  zip: "[PLZ]",
  city: "[ORT]",
  representatives: "[GESCHÄFTSFÜHRER/IN]",
  phone: "[TELEFON]",
  email: "[E-MAIL]",
  /** Fill in after registration (GmbH i. G. is not registered yet). */
  registerCourt: "[REGISTERGERICHT, nach Eintragung]",
  registerNumber: "[HRB-NUMMER, nach Eintragung]",
  vatId: "[UST-IDNR.]",
  /** Handwerk-specific information (§ 5 Abs. 1 Nr. 5 DDG) */
  chamber: "[Handwerkskammer Düsseldorf, Georg-Schulhoff-Platz 1, 40221 Düsseldorf]",
  professionalTitle: "[Elektrotechnikermeister, verliehen in Deutschland]",
  professionalRules: "Handwerksordnung (HwO), abrufbar unter www.gesetze-im-internet.de/hwo",
  /** § 18 Abs. 2 MStV */
  contentResponsible: "[NAME, ANSCHRIFT]",
};

export const impressum = {
  title: "Impressum",
  seoDescription: "Impressum von HeyMeister Elektro: Anbieterkennzeichnung nach § 5 DDG.",
  disputeResolution: [
    "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  ],
};

export const datenschutz = {
  title: "Datenschutzerklärung",
  seoDescription: "Datenschutzerklärung von HeyMeister Elektro: welche Daten wir verarbeiten und welche Rechte Sie haben.",
  draftNotice: "Entwurf. Vor Veröffentlichung durch Datenschutzbeauftragten oder Anwalt prüfen lassen.",
  updated: "[STAND: TT.MM.JJJJ]",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist [BETREIBER-FIRMA], [STRASSE UND HAUSNUMMER], [PLZ] [ORT], E-Mail: [E-MAIL], Telefon: [TELEFON].",
        "[Falls vorhanden: Kontaktdaten des Datenschutzbeauftragten]",
      ],
    },
    {
      heading: "2. Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und Browser-Informationen in Server-Logfiles.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; zusätzlich gelten Standardvertragsklauseln. [Prüfen und Region der Server-Funktionen angeben]",
      ],
    },
    {
      heading: "3. Kontakt- und Angebotsformular",
      paragraphs: [
        "Wenn Sie uns über das Formular kontaktieren, verarbeiten wir Ihre Angaben (Name, Firma, E-Mail, optional Telefon, Branche, Anzahl Standorte, PLZ, Angaben zur letzten Prüfung, Nachricht und Ihr Anliegen), um Ihre Anfrage zu beantworten und ein Angebot zu erstellen.",
        "Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) und unser berechtigtes Interesse an der Bearbeitung von Geschäftsanfragen (Art. 6 Abs. 1 lit. f DSGVO).",
        "Für den Versand der Formulardaten per E-Mail nutzen wir Resend (Resend, Inc., USA) als Auftragsverarbeiter. [Datenübermittlung und Garantien prüfen]",
        "Die Anfrage wird zusätzlich an unser Kundenverwaltungssystem (CRM) übertragen. [Anbieter, Serverstandort und Auftragsverarbeitungsvertrag ergänzen]",
        "Zum Schutz vor Missbrauch verarbeiten wir Ihre IP-Adresse kurzfristig zur Begrenzung der Anfragen pro Zeitraum. [Falls Upstash genutzt wird: Anbieter und Region ergänzen]",
      ],
    },
    {
      heading: "4. Terminbuchung",
      paragraphs: [
        "Für die Buchung eines Erstgesprächs können Sie ein Buchungswerkzeug eines Drittanbieters nutzen. [ANBIETER, z. B. Cal.com, Anschrift] Das Buchungsfenster wird erst geladen, wenn Sie es aktiv anklicken. Vorher werden keine Daten an den Anbieter übertragen.",
        "Nach dem Klick verarbeitet der Anbieter Ihre IP-Adresse sowie die Daten, die Sie bei der Buchung eingeben. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO) sowie die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).",
      ],
    },
    {
      heading: "5. Reichweitenmessung",
      paragraphs: [
        "Wir nutzen [Plausible Analytics (Plausible Insights OÜ, Estland)] zur Reichweitenmessung ohne Cookies. Es werden keine personenbezogenen Profile erstellt; IP-Adressen werden nur gekürzt und gehasht verarbeitet und nicht gespeichert. Die Daten werden über unsere eigene Domain übermittelt.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einer statistischen Auswertung zur Verbesserung der Website (Art. 6 Abs. 1 lit. f DSGVO). [Mit § 25 TDDDG abgleichen]",
      ],
    },
    {
      heading: "6. Bewerbungen",
      paragraphs: [
        "Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre Angaben und Unterlagen zur Durchführung des Bewerbungsverfahrens (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Hochgeladene Dateien werden per E-Mail an uns übermittelt und nicht dauerhaft auf dem Webserver gespeichert.",
        "Kommt kein Arbeitsverhältnis zustande, löschen wir Ihre Daten spätestens [6] Monate nach Abschluss des Verfahrens.",
      ],
    },
    {
      heading: "7. Speicherdauer",
      paragraphs: [
        "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen (z. B. nach HGB und AO). [Konkrete Fristen ergänzen]",
      ],
    },
    {
      heading: "8. Ihre Rechte",
      paragraphs: ["Sie haben jederzeit das Recht auf:"],
      list: [
        "Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)",
        "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
        "Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)",
        "Datenübertragbarkeit (Art. 20 DSGVO)",
        "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)",
        "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
        "Beschwerde bei einer Aufsichtsbehörde, z. B. der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (Art. 77 DSGVO)",
      ],
    },
  ] satisfies LegalSection[],
};
