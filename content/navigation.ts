/** Header navigation per site mode. Validation mode uses in-page jump links only. */
export const navigation = {
  validation: [
    { label: "Leistung", href: "/#leistung" },
    { label: "Fristen", href: "/#fristen" },
    { label: "Für wen", href: "/#fuer-wen" },
    { label: "Preise", href: "/#preise" },
    { label: "Pilotprogramm", href: "/#pilot" },
    { label: "FAQ", href: "/#faq" },
  ],
  full: [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Preise", href: "/preise" },
    { label: "Für wen", href: "/fuer-filialisten" },
    { label: "Pilotprogramm", href: "/pilot" },
    { label: "Über uns", href: "/ueber-uns" },
  ],
  footer: {
    validation: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    full: [
      { label: "Leistungen", href: "/leistungen" },
      { label: "Preise", href: "/preise" },
      { label: "Pilotprogramm", href: "/pilot" },
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Karriere", href: "/karriere" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
} as const;

export type NavItem = { label: string; href: string };
