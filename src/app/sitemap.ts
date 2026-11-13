import type { MetadataRoute } from "next";
import { isFullMode, isLaunched } from "@/lib/env";
import { siteUrl } from "@/lib/seo";

/** Empty until PUBLIC_LAUNCH=true. Full-mode routes are added in later phases. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLaunched) return [];
  const base = siteUrl();
  const paths = ["/", "/impressum", "/datenschutz"];
  if (isFullMode) {
    // Extended when the full-mode pages exist.
  }
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.3 }));
}
