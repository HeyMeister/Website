/**
 * Prices per site and month, net (plus VAT). Edit here only.
 * The pricing calculator and all price mentions read from this file.
 */

export type SiteSize = "s-buero" | "s" | "m" | "l";
export type Tier = "basis" | "plus";

export const pricing = {
  currency: "EUR",
  vatNote: "netto zzgl. USt.",

  sizes: [
    {
      id: "s-buero",
      label: "S-Büro",
      monthly: { basis: 199, plus: 279 },
      setupFee: 225,
      /** Indicative size (devices, sub-distributions). Final classification at the first visit. */
      guide: "Büro oder Agentur, bis etwa 50 Geräte, eine Unterverteilung",
      /** Short choice in the hero price check. */
      pick: { label: "Büro", hint: "bis etwa 50 Geräte" },
    },
    { id: "s", label: "S", monthly: { basis: 249, plus: 349 }, setupFee: 225, guide: "Laden, Praxis oder kleiner Betrieb, bis etwa 100 Geräte", pick: { label: "Laden oder Praxis", hint: "bis etwa 100 Geräte" } },
    { id: "m", label: "M", monthly: { basis: 399, plus: 549 }, setupFee: 375, guide: "Mittlerer Betrieb, bis etwa 250 Geräte, mehrere Unterverteilungen", pick: { label: "Mittlerer Betrieb", hint: "bis etwa 250 Geräte" } },
    { id: "l", label: "L", monthly: { basis: 649, plus: 899 }, setupFee: 750, guide: "Werkstatt, Halle oder großer Betrieb, mehr als 250 Geräte", pick: { label: "Werkstatt oder Halle", hint: "mehr als 250 Geräte" } },
  ] satisfies Array<{ id: SiteSize; label: string; monthly: Record<Tier, number>; setupFee: number; guide: string; pick: { label: string; hint: string } }>,

  /** Shown under the setup fee table on /preise. */
  setupFeeNote: "Sie deckt Bestandsaufnahme, Geräteerfassung und Prüfplan beim Erstbesuch.",
  /** Setup fee is waived for this contract term (months). */
  setupFeeWaivedForTermMonths: 24,
  terms: [12, 24],

  /** Volume discount by total number of sites (highest matching step applies). */
  volumeDiscounts: [
    { minSites: 5, percent: 5 },
    { minSites: 15, percent: 10 },
    { minSites: 30, percent: 15 },
  ],

  classificationNote: "Die endgültige Einstufung erfolgt beim Erstbesuch.",

  tiers: [
    {
      id: "basis",
      label: "Basis",
      description: "Prüfung von Geräten und Anlagen nach Prüfplan, Kleinreparaturen beim Prüftermin, digitales Betriebsbuch.",
    },
    {
      id: "plus",
      label: "Plus",
      description: "Alles aus Basis, dazu Mängelbehebung zwischen den Prüfterminen, bevorzugte Termine und ein fester Ansprechpartner für alle Standorte.",
    },
  ] satisfies Array<{ id: Tier; label: string; description: string }>,
} as const;

/** Lowest monthly price across all sizes and tiers (used for "ab … €"). */
export function lowestMonthlyPrice(): number {
  return Math.min(...pricing.sizes.flatMap((s) => [s.monthly.basis, s.monthly.plus]));
}
