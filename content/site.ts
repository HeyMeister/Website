/**
 * Global site settings.
 *
 * Text in [SQUARE BRACKETS] is a placeholder. It is rendered as a clearly visible marker
 * and must be replaced before launch.
 */

export const site = {
  name: "HeyMeister Elektro",
  shortName: "HeyMeister",
  tagline: "Elektroprüfung im Abo",
  /** Without protocol, e.g. "heymeister-elektro.de". Never hard-code the domain elsewhere. */
  domain: "[DOMAIN]",
  locale: "de-DE",

  contact: {
    /** Display format, e.g. "+49 211 123456-0". The tel: link is derived from it. */
    phone: "[TELEFON]",
    email: "[E-MAIL]",
    address: {
      street: "[STRASSE UND HAUSNUMMER]",
      zip: "[PLZ]",
      city: "Düsseldorf",
    },
    /** Shown as "Wir melden uns …" after a form submission. */
    responseTime: "innerhalb von einem Werktag",
    /** Duration of the free intro call. */
    callDuration: "15 Minuten",
  },

  /** Service area, used in copy and LocalBusiness JSON-LD. */
  region: {
    label: "Düsseldorf und NRW",
    areaServed: "Nordrhein-Westfalen",
  },

  /**
   * Trust signals. Only enable what is true for the legal operator of this website
   * (see content/legal.ts). The operator is still [OFFEN].
   */
  trust: {
    meisterbetrieb: true,
    /** Off until the GmbH (i. G.) itself is entered in the Handwerksrolle. */
    handwerksrolle: false,
    /** Chamber shown next to the Handwerksrolle entry. */
    chamber: "[HWK Düsseldorf]",
    norms: true,
  },

  /** Optional service pages. Only enable after Leon confirms. */
  services: {
    wallbox: false,
    emergencyLighting: false,
  },

  pilot: {
    headline: "Pilotkunde werden",
    period: "Februar bis Juni 2027",
    region: "im Raum Düsseldorf",
    intro:
      "Wir starten mit einer kleinen Gruppe von Betrieben. Sie bekommen das volle Abo und einen direkten Draht zu uns. Wir bekommen Ihre ehrliche Rückmeldung.",
    /** Conditions are not decided yet. Do not promise anything that is not decided. */
    conditions: [
      "[KONDITION OFFEN, z. B. Einrichtung entfällt]",
      "[KONDITION OFFEN, z. B. Pilotpreis]",
      "[KONDITION OFFEN, z. B. Feedbackgespräch nach 3 Monaten]",
    ],
    seats: "Begrenzte Plätze",
  },

  seo: {
    titleTemplate: "%s | HeyMeister Elektro",
    defaultTitle: "Elektroprüfung DGUV V3 im Abo | HeyMeister Düsseldorf",
    defaultDescription:
      "Elektroprüfung nach DGUV Vorschrift 3 und BetrSichV im Monatsabo pro Standort: Prüfung, digitales Betriebsbuch und Kleinreparaturen vom Meisterbetrieb.",
  },
} as const;

export type Site = typeof site;
