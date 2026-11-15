/** Header navigation per site mode. Validation mode uses in-page jump links only. */
export const navigation = {
  validation: [
    { label: "Ablauf", href: "/#ablauf" },
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Konditionen", href: "/#konditionen" },
    { label: "Für Filialisten", href: "/#filialisten" },
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Partner werden", href: "/partner" },
  ],
  full: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Preise", href: "/preise" },
    { label: "Für wen", href: "/fuer-filialisten" },
    { label: "Pilotprogramm", href: "/pilot" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Partner werden", href: "/partner" },
  ],
  footer: {
    validation: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
    full: [
      { label: "Leistungen", href: "/leistungen" },
      { label: "Preise", href: "/preise" },
      { label: "Pilotprogramm", href: "/pilot" },
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Partner werden", href: "/partner" },
      { label: "Karriere", href: "/karriere" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
} as const;

export type NavItem = { label: string; href: string };
