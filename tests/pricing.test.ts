import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pricing, lowestMonthlyPrice } from "@/content/pricing";
import { segments } from "@/content/segments";
import { services, servicesOverview } from "@/content/services";
import { guides, guidesHub } from "@/content/guides";
import { localPage } from "@/content/local";
import { segmentsHub } from "@/content/segments";
import { photos } from "@/content/photos";
import * as pages from "@/content/pages";
import { site } from "@/content/site";
import { discountFor, quote, siteCountBucket } from "@/lib/pricing";
import { siteCountOptions } from "@/lib/lead-schema";

describe("quote", () => {
  it("sums sites, applies the volume discount and waives the setup fee for 24 months", () => {
    const q = quote({ lines: [{ size: "s", count: 12 }], tier: "basis", term: 24 });
    expect(q.sites).toBe(12);
    expect(q.monthlyGross).toBe(12 * 249);
    expect(q.discountPercent).toBe(5);
    expect(q.monthly).toBe(2838.6);
    expect(q.setup).toBe(0);
    expect(q.setupWaived).toBe(true);
  });

  it("charges the setup fee for 12 months and mixes sizes", () => {
    const q = quote({ lines: [{ size: "m", count: 1 }, { size: "l", count: 1 }], tier: "plus", term: 12 });
    expect(q.monthly).toBe(549 + 899);
    expect(q.setup).toBe(375 + 750);
    expect(q.discountPercent).toBe(0);
  });

  it("ignores negative and fractional counts", () => {
    expect(quote({ lines: [{ size: "s", count: -3 }, { size: "m", count: 1.8 }], tier: "basis", term: 24 }).sites).toBe(1);
  });

  it("uses the highest matching discount step", () => {
    expect(discountFor(4)).toBe(0);
    expect(discountFor(5)).toBe(5);
    expect(discountFor(15)).toBe(10);
    expect(discountFor(100)).toBe(15);
  });

  it("maps site counts to the form's select values", () => {
    const values = siteCountOptions.map((o) => o.value as string);
    for (const n of [1, 3, 5, 14, 15, 29, 30, 200]) expect(values).toContain(siteCountBucket(n));
    expect(siteCountBucket(5)).toBe("5-14");
  });

  it("starts at 199 euros", () => {
    expect(lowestMonthlyPrice()).toBe(199);
  });

  it("starts the teaser at the lowest price", () => {
    expect(lowestMonthlyPrice()).toBe(Math.min(...pricing.sizes.map((s) => s.monthly.basis)));
  });
});

describe("page SEO", () => {
  const all = [
    servicesOverview.seo,
    ...services.map((s) => s.seo),
    ...segments.map((s) => s.seo),
    pages.guide.seo,
    pages.pricesPage.seo,
    pages.pilotPage.seo,
    pages.aboutPage.seo,
    pages.careersPage.seo,
    pages.contactPage.seo,
    guidesHub.seo,
    ...guides.map((g) => g.seo),
    segmentsHub.seo,
    localPage.seo,
  ];
  it.each(all.map((s) => [s.title, s] as const))("%s stays within title and description limits", (_t, seo) => {
    expect(site.seo.titleTemplate.replace("%s", seo.title).length).toBeLessThanOrEqual(60);
    expect(seo.description.length).toBeLessThanOrEqual(155);
  });
});

describe("copy rules", () => {
  const text = JSON.stringify([pages, segments, services, guides, localPage]);
  it("never calls the subscription an insurance without 'wie'", () => {
    const hits = text.match(/[^.]{0,40}Versicherung(?!sprodukt)[^.]{0,10}/g) ?? [];
    for (const h of hits) expect(h).toMatch(/wie (eine|bei einer) Versicherung|Versicherer|Betriebshaftpflicht|Versicherungs/);
  });
  it("does not use the withdrawn standard name", () => {
    expect(text).not.toMatch(/0701-0702/);
  });
});

describe("links between content", () => {
  it("links only to guides that exist", () => {
    const slugs = new Set(guides.map((g) => g.slug));
    for (const g of guides) for (const r of g.related) expect(slugs).toContain(r);
    for (const s of services) for (const r of s.related) expect(slugs).toContain(r);
  });
  it("uses only photographs that exist, each with alt text", () => {
    for (const g of guides) expect(photos[g.photo]?.alt).toBeTruthy();
    for (const s of segments) if (s.visual !== "logbook") expect(photos[s.visual]?.alt).toBeTruthy();
  });
  it("has a route for every segment", () => {
    for (const s of segments) expect(fs.existsSync(path.join(process.cwd(), "src/app/(site)", s.slug, "page.tsx"))).toBe(true);
  });
  it("keeps every segment and guide slug unique", () => {
    expect(new Set(segments.map((s) => s.slug)).size).toBe(segments.length);
    expect(new Set(guides.map((g) => g.slug)).size).toBe(guides.length);
  });
});
