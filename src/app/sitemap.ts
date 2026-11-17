import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { segments } from "@/content/segments";
import { services } from "@/content/services";
import { isLaunched } from "@/lib/env";
import { siteUrl } from "@/lib/seo";

/** Empty until PUBLIC_LAUNCH=true. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLaunched) return [];
  const base = siteUrl();
  const paths = [
    "/",
    "/leistungen",
    ...services.map((s) => `/leistungen/${s.slug}`),
    "/branchen",
    ...segments.map((s) => `/${s.slug}`),
    "/preise",
    "/ratgeber",
    "/betreiberpflichten",
    ...guides.map((g) => `/ratgeber/${g.slug}`),
    "/elektropruefung-duesseldorf",
    "/pilot",
    "/ueber-uns",
    "/karriere",
    "/kontakt",
    "/partner",
    "/impressum",
    "/datenschutz",
  ];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.5 }));
}
