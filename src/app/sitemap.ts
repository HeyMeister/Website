import type { MetadataRoute } from "next";
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
    ...segments.map((s) => `/${s.slug}`),
    "/preise",
    "/betreiberpflichten",
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
