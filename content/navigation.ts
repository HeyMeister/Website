/** Header, mobile and footer navigation. */
export type NavItem = { label: string; href: string };

export const navigation = {
  /** Header (from xl) and the top of the mobile menu. */
  main: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Für wen", href: "/#fuer-wen" },
    { label: "Preise", href: "/preise" },
    { label: "Betreiberpflichten", href: "/betreiberpflichten" },
    { label: "Über uns", href: "/ueber-uns" },
  ],
  footer: {
    leistungen: [
      { label: "Alle Leistungen", href: "/leistungen" },
      { label: "Geräteprüfung", href: "/leistungen/geraete" },
      { label: "Anlagenprüfung", href: "/leistungen/anlagen" },
      { label: "Reparatur", href: "/leistungen/reparatur" },
      { label: "Betriebsbuch", href: "/leistungen/betriebsbuch" },
    ],
    branchen: [
      { label: "Für Praxen", href: "/fuer-praxen" },
      { label: "Für Autohäuser", href: "/fuer-autohaeuser" },
      { label: "Für Filialisten", href: "/fuer-filialisten" },
      { label: "Für Hausverwaltungen", href: "/fuer-hausverwaltungen" },
    ],
    unternehmen: [
      { label: "Preise", href: "/preise" },
      { label: "Betreiberpflichten", href: "/betreiberpflichten" },
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
} satisfies { main: NavItem[]; footer: Record<string, NavItem[]> };
