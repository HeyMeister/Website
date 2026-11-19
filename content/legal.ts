/**
 * Legal content (Impressum, Datenschutz).
 *
 * IMPORTANT: The build fails when PUBLIC_LAUNCH=true and this file still contains
 * [PLACEHOLDERS] (scripts/check-launch.ts). The operator of the website is still open
 * (Leon's company or a joint company); the Meisterbetrieb/Handwerksrolle statements
 * must apply to exactly this operator.
 */

export const operator = {
  company: "[BETREIBER-FIRMA]",
  /** GmbH in formation. Change to "GmbH" after registration in the commercial register. */
  legalForm: "GmbH i. G.",
  street: "[STRASSE UND HAUSNUMMER]",
  zip: "[PLZ]",
  city: "[ORT]",
  representatives: "[GESCHÄFTSFÜHRER/IN]",
  phone: "+49 1588 8628386",
  email: "info@hey-meister.de",
  /** Fill in after registration (GmbH i. G. is not registered yet). */
  registerCourt: "[REGISTERGERICHT, nach Eintragung]",
  registerNumber: "[HRB-NUMMER, nach Eintragung]",
  vatId: "[UST-IDNR.]",
  /** Handwerk-specific information (§ 5 Abs. 1 Nr. 5 DDG) */
  chamber: "Handwerkskammer Düsseldorf, Georg-Schulhoff-Platz 1, 40221 Düsseldorf",
  professionalTitle: "Elektrotechnikermeister (verliehen in der Bundesrepublik Deutschland)",
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

/**
 * Parts of the privacy policy that only apply when a feature is switched on (see the env
 * variables in .env.example). The page leaves them out otherwise, so the text always matches
 * what the site really does.
 */
export type DataFeature = "booking" | "analytics" | "crm" | "redis";
export type LegalParagraph = string | { text: string; when: DataFeature };
export type LegalSection = { heading: string; paragraphs: LegalParagraph[]; list?: string[]; when?: DataFeature };

export const datenschutz = {
  title: "Datenschutzerklärung",
  seoDescription: "Datenschutzerklärung von HeyMeister Elektro: welche Daten wir verarbeiten und welche Rechte Sie haben.",
  updated: "Stand: 19. November 2026",
  sections: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        /* {VERANTWORTLICHER} is replaced on the page with the operator's name and address. */
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist {VERANTWORTLICHER}, E-Mail: info@hey-meister.de, Telefon: +49 1588 8628386.",
        "Einen Datenschutzbeauftragten müssen wir nach Art. 37 DSGVO und § 38 BDSG nicht benennen. Fragen zum Datenschutz richten Sie bitte an info@hey-meister.de.",
      ],
    },
    {
      heading: "Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und Browser-Informationen in Server-Logfiles. Formulare und Serverfunktionen werden in Rechenzentren in Frankfurt am Main verarbeitet.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; zusätzlich gelten die Standardvertragsklauseln der EU-Kommission.",
      ],
    },
    {
      heading: "Kontakt- und Angebotsformular",
      paragraphs: [
        "Wenn Sie uns über das Formular kontaktieren, verarbeiten wir Ihre Angaben (Name, Firma, E-Mail, Telefon, Anzahl Standorte, optional der Zeitpunkt der letzten Prüfung und gegebenenfalls Ihre Auswahl aus dem Preisrechner), um Ihre Anfrage zu beantworten und ein Angebot zu erstellen.",
        "Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) und unser berechtigtes Interesse an der Bearbeitung von Geschäftsanfragen (Art. 6 Abs. 1 lit. f DSGVO).",
        "Die Formulardaten werden per E-Mail an uns übermittelt. Für den Versand nutzen wir Resend (Resend, Inc., San Francisco, USA) als Auftragsverarbeiter. Die E-Mails werden über Server in der EU (Irland) versendet. Ein Zugriff aus den USA ist nicht ausgeschlossen; als Garantie gelten die Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO).",
        {
          when: "crm",
          text: "Die Anfrage wird zusätzlich an unser Kundenverwaltungssystem (CRM) übertragen, das in unserem Auftrag nach Art. 28 DSGVO betrieben wird.",
        },
        "Zum Schutz vor Missbrauch verarbeiten wir Ihre IP-Adresse kurzfristig, um die Zahl der Anfragen pro Zeitraum zu begrenzen. Der Zähler wird nach spätestens zehn Minuten gelöscht.",
        {
          when: "redis",
          text: "Für diesen Zähler nutzen wir den Datenbankdienst Upstash (Upstash, Inc., USA) als Auftragsverarbeiter; es gelten die Standardvertragsklauseln der EU-Kommission.",
        },
      ],
    },
    {
      heading: "Bewerbung als Fachpartner",
      paragraphs: [
        "Wenn Sie sich über das Formular „Als Fachpartner bewerben“ bewerben, verarbeiten wir Ihre Angaben (Betrieb, Ansprechpartner, E-Mail, optional Telefon, Einsatzgebiet, Leistungen, optional Anzahl Mitarbeitende und Anmerkungen), um die Zusammenarbeit mit Ihnen anzubahnen. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).",
        "Die Angaben werden per E-Mail über Resend an uns übermittelt und nicht dauerhaft auf dem Webserver gespeichert. Kommt keine Zusammenarbeit zustande, löschen wir sie spätestens sechs Monate nach Ihrer Bewerbung.",
      ],
    },
    {
      heading: "Terminbuchung",
      when: "booking",
      paragraphs: [
        "Für die Buchung eines Erstgesprächs können Sie ein Buchungswerkzeug eines Drittanbieters nutzen. Das Buchungsfenster wird erst geladen, wenn Sie es aktiv anklicken. Vorher werden keine Daten an den Anbieter übertragen.",
        "Nach dem Klick verarbeitet der Anbieter Ihre IP-Adresse sowie die Daten, die Sie bei der Buchung eingeben. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO) sowie die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).",
      ],
    },
    {
      heading: "Reichweitenmessung",
      when: "analytics",
      paragraphs: [
        "Wir nutzen Plausible Analytics (Plausible Insights OÜ, Tartu, Estland) zur Reichweitenmessung ohne Cookies. Es werden keine Informationen auf Ihrem Endgerät gespeichert oder ausgelesen und keine personenbezogenen Profile erstellt; IP-Adressen werden nur gekürzt und gehasht verarbeitet und nicht gespeichert. Die Daten werden über unsere eigene Domain übermittelt und auf Servern in der EU verarbeitet.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einer statistischen Auswertung zur Verbesserung der Website (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      heading: "Bewerbungen",
      paragraphs: [
        "Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre Angaben und Unterlagen zur Durchführung des Bewerbungsverfahrens (§ 26 BDSG, Art. 6 Abs. 1 lit. b DSGVO). Hochgeladene Dateien werden per E-Mail an uns übermittelt und nicht dauerhaft auf dem Webserver gespeichert.",
        "Kommt kein Arbeitsverhältnis zustande, löschen wir Ihre Daten spätestens sechs Monate nach Abschluss des Verfahrens.",
      ],
    },
    {
      heading: "Datenraum für Investoren",
      paragraphs: [
        "Für eingeladene Investoren betreiben wir einen geschützten Datenraum. Dafür verarbeiten wir Name, E-Mail-Adresse, Firma, Anmeldezeitpunkte sowie Zeitpunkte, zu denen Dokumente angesehen oder heruntergeladen werden. IP-Adressen speichern wir dabei nicht.",
        "Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) und unser berechtigtes Interesse am Schutz vertraulicher Unterlagen (Art. 6 Abs. 1 lit. f DSGVO). Anbieter für Anmeldung, Datenbank und Dateispeicher ist Supabase Inc. mit Serverstandort Frankfurt am Main, auf Grundlage eines Vertrags zur Auftragsverarbeitung nach Art. 28 DSGVO und der Standardvertragsklauseln der EU-Kommission.",
        "Zugänge und Protokolle löschen wir spätestens zwölf Monate nach Ende des Gesprächs.",
      ],
    },
    {
      heading: "Speicherdauer",
      paragraphs: [
        "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. Anfragen, aus denen kein Auftrag entsteht, löschen wir spätestens sechs Monate nach dem letzten Kontakt. Kommt ein Vertrag zustande, bewahren wir Angebote, Verträge und Rechnungen so lange auf, wie es das Handels- und Steuerrecht verlangt: sechs Jahre für Geschäftsbriefe (§ 257 HGB), acht Jahre für Buchungsbelege (§ 257 HGB, § 147 AO) und zehn Jahre für Jahresabschlüsse.",
      ],
    },
    {
      heading: "Ihre Rechte",
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
