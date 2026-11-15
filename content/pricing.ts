/**
 * Packages: price per site and month, "ab" prices, plus VAT, 36 months minimum term.
 * Edit here only; the packages section, the hero price and the tests read from this file.
 * Only list what is decided: no feature is added to a package that the brief does not name.
 */

export type PackageId = "basis" | "service" | "plus" | "objekt" | "objekt-plus";

export type Package = {
  id: PackageId;
  name: string;
  /** Monthly price per site in EUR, net ("ab"). */
  from: number;
  /** Short line under the name. */
  tagline: string;
  limits: { devices: number; circuits: number };
  features: string[];
  popular?: boolean;
  /** Larger sites and warehouses: shown in the second row. */
  large?: boolean;
};

export const pricing = {
  currency: "EUR",
  vatNote: "zzgl. MwSt.",
  minTermMonths: 36,

  packages: [
    {
      id: "basis",
      name: "Basis",
      from: 109,
      tagline: "Die Pflicht, sauber dokumentiert.",
      limits: { devices: 30, circuits: 24 },
      features: ["1 Prüftermin pro Jahr", "Dokumentation inklusive", "Reparaturen nach Aufwand"],
    },
    {
      id: "service",
      name: "Service",
      from: 279,
      tagline: "Prüfung und kleine Reparaturen.",
      limits: { devices: 80, circuits: 60 },
      features: ["2 Std. Reparaturen pro Jahr", "1 Reparatureinsatz", "50 € Materialbudget", "Rückmeldung innerhalb von 1 Werktag"],
      popular: true,
    },
    {
      id: "plus",
      name: "Plus",
      from: 529,
      tagline: "Mehr Reparaturen, mit Thermografie.",
      limits: { devices: 150, circuits: 120 },
      features: ["4 Std. Reparaturen pro Jahr", "2 Reparatureinsätze", "100 € Materialbudget", "Thermografie alle 2 Jahre"],
    },
    {
      id: "objekt",
      name: "Objekt",
      from: 1209,
      tagline: "Für größere Standorte und Lager.",
      limits: { devices: 350, circuits: 300 },
      features: [
        "2 Prüftermine pro Jahr",
        "8 Std. Reparaturen pro Jahr",
        "3 Reparatureinsätze",
        "200 € Materialbudget",
        "Jährliche Thermografie mit Bericht",
      ],
      large: true,
    },
    {
      id: "objekt-plus",
      name: "Objekt Plus",
      from: 2649,
      tagline: "Für sehr große Standorte.",
      limits: { devices: 800, circuits: 700 },
      features: [
        "4 Prüftermine pro Jahr",
        "16 Std. Reparaturen pro Jahr",
        "4 Reparatureinsätze",
        "400 € Materialbudget",
        "Jährliche Thermografie",
        "Halbjährliches Review",
      ],
      large: true,
    },
  ] satisfies Package[],

  /** Framework agreement for chains. */
  frameworkMinSites: 10,

  smallPrint: [
    "Bestandsaufnahme und Erstprüfung der festen Anlage bieten wir separat an.",
    "Nicht genutzte Reparaturstunden verfallen am Ende des Vertragsjahres.",
    "Servicezeiten Montag bis Freitag, 8 bis 17 Uhr. Kein 24/7-Notdienst.",
    "Die Preise gelten für Standorte im Umkreis von 30 km um unseren Servicestandort.",
  ],
} as const;

/** Lowest monthly price across all packages (used for "ab … €"). */
export function lowestMonthlyPrice(): number {
  return Math.min(...pricing.packages.map((p) => p.from));
}
