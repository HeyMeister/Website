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
      monthly: { basis: 29, plus: 49 },
      setupFee: 225,
      /** Indicative thresholds (devices, sub-distributions, circuits). */
      guide: "[SCHWELLEN OFFEN, von Leon festlegen]",
    },
    { id: "s", label: "S", monthly: { basis: 39, plus: 65 }, setupFee: 225, guide: "[SCHWELLEN OFFEN, von Leon festlegen]" },
    { id: "m", label: "M", monthly: { basis: 79, plus: 125 }, setupFee: 375, guide: "[SCHWELLEN OFFEN, von Leon festlegen]" },
    { id: "l", label: "L", monthly: { basis: 145, plus: 219 }, setupFee: 750, guide: "[SCHWELLEN OFFEN, von Leon festlegen]" },
  ] satisfies Array<{ id: SiteSize; label: string; monthly: Record<Tier, number>; setupFee: number; guide: string }>,

  /** Setup fee mapping to sizes still needs confirmation. */
  setupFeeNote: "[Zuordnung Einrichtungsgebühr zu Größen bestätigen]",
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
    { id: "basis", label: "Basis", description: "[LEISTUNGSUNTERSCHIED OFFEN]" },
    { id: "plus", label: "Plus", description: "[LEISTUNGSUNTERSCHIED OFFEN, z. B. Prüfintervall, Reaktionszeit, Anzahl Kleinreparaturen]" },
  ] satisfies Array<{ id: Tier; label: string; description: string }>,
} as const;

/** Lowest monthly price across all sizes and tiers (used for "ab … €"). */
export function lowestMonthlyPrice(): number {
  return Math.min(...pricing.sizes.flatMap((s) => [s.monthly.basis, s.monthly.plus]));
}
