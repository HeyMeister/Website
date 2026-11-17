import { pricing, type SiteSize, type Tier } from "@/content/pricing";

/** One line of a configuration: how many sites of one size. */
export type QuoteLine = { size: SiteSize; count: number };
export type QuoteInput = { lines: QuoteLine[]; tier: Tier; term: 12 | 24 };

export type Quote = {
  sites: number;
  /** Monthly sum before discount, net. */
  monthlyGross: number;
  discountPercent: number;
  /** Monthly sum after volume discount, net. */
  monthly: number;
  /** One-time setup fee, net (0 when waived for the term). */
  setup: number;
  setupWaived: boolean;
};

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Volume discount for a total number of sites (the highest matching step applies). */
export function discountFor(sites: number): number {
  return pricing.volumeDiscounts.reduce((best, d) => (sites >= d.minSites ? Math.max(best, d.percent) : best), 0);
}

/** Price for a configuration, from content/pricing.ts. Counts are clamped to whole numbers ≥ 0. */
export function quote({ lines, tier, term }: QuoteInput): Quote {
  let sites = 0;
  let monthlyGross = 0;
  let setupSum = 0;
  for (const line of lines) {
    const size = pricing.sizes.find((s) => s.id === line.size);
    const count = Math.max(0, Math.floor(line.count || 0));
    if (!size || count === 0) continue;
    sites += count;
    monthlyGross += size.monthly[tier] * count;
    setupSum += size.setupFee * count;
  }
  const discountPercent = discountFor(sites);
  const setupWaived = term >= pricing.setupFeeWaivedForTermMonths;
  return {
    sites,
    monthlyGross: round2(monthlyGross),
    discountPercent,
    monthly: round2(monthlyGross * (1 - discountPercent / 100)),
    setup: setupWaived ? 0 : round2(setupSum),
    setupWaived,
  };
}

/** Maps a number of sites to the value of the "Anzahl Standorte" select in the form. */
export function siteCountBucket(sites: number): string {
  if (sites <= 1) return "1";
  if (sites <= 4) return "2-4";
  if (sites <= 14) return "5-14";
  if (sites <= 29) return "15-29";
  return "30+";
}
