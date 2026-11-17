/** Header, mobile and footer navigation. */
export type NavItem = { label: string; href: string };

export const navigation = {
  /** Header (from xl) and the top of the mobile menu. */
  main: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Branchen", href: "/branchen" },
    { label: "Preise", href: "/preise" },
    { label: "Ratgeber", href: "/ratgeber" },
    { label: "Über uns", href: "/ueber-uns" },
  ],
  /** Extra entries at the bottom of the mobile menu. */
  mobileExtra: [
    { label: "Elektroprüfung Düsseldorf", href: "/elektropruefung-duesseldorf" },
    { label: "Pilotprogramm", href: "/pilot" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footer: {
    leistungen: [
      { label: "Alle Leistungen", href: "/leistungen" },
      { label: "Geräteprüfung", href: "/leistungen/geraete" },
      { label: "Anlagenprüfung", href: "/leistungen/anlagen" },
      { label: "Reparatur", href: "/leistungen/reparatur" },
      { label: "Betriebsbuch", href: "/leistungen/betriebsbuch" },
      { label: "Preise", href: "/preise" },
    ],
    branchen: [
      { label: "Praxen", href: "/fuer-praxen" },
      { label: "Autohäuser", href: "/fuer-autohaeuser" },
      { label: "Filialisten", href: "/fuer-filialisten" },
      { label: "Hausverwaltungen", href: "/fuer-hausverwaltungen" },
      { label: "Gastronomie", href: "/fuer-gastronomie" },
      { label: "Büros", href: "/fuer-bueros" },
      { label: "Alle Branchen", href: "/branchen" },
    ],
    ratgeber: [
      { label: "Betreiberpflichten", href: "/betreiberpflichten" },
      { label: "DGUV V3 Prüfung", href: "/ratgeber/dguv-v3-pruefung" },
      { label: "Prüffristen", href: "/ratgeber/pruefristen" },
      { label: "Prüfprotokoll", href: "/ratgeber/pruefprotokoll" },
      { label: "Kosten", href: "/ratgeber/kosten-elektropruefung" },
      { label: "Alle Artikel", href: "/ratgeber" },
    ],
    unternehmen: [
      { label: "Elektroprüfung Düsseldorf", href: "/elektropruefung-duesseldorf" },
      { label: "Pilotprogramm", href: "/pilot" },
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Karriere", href: "/karriere" },
      { label: "Für Elektrobetriebe", href: "/partner" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    legal: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
} satisfies { main: NavItem[]; mobileExtra: NavItem[]; footer: Record<string, NavItem[]> };
