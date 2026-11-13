import type { MetadataRoute } from "next";
import { isLaunched } from "@/lib/env";
import { siteUrl } from "@/lib/seo";

/** Disallow everything until PUBLIC_LAUNCH=true. */
export default function robots(): MetadataRoute.Robots {
  if (!isLaunched) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/danke", "/dataroom"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
