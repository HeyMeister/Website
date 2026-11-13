import type { Metadata } from "next";
import { site } from "@/content/site";
import { hasPlaceholder } from "./placeholders";
import { isLaunched } from "./env";

/** Absolute site URL: configured domain, else Vercel URL, else localhost. */
export function siteUrl(): string {
  if (!hasPlaceholder(site.domain)) return `https://${site.domain}`;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Robots meta: always noindex until PUBLIC_LAUNCH=true. */
export const robotsMeta: Metadata["robots"] = isLaunched
  ? { index: true, follow: true }
  : { index: false, follow: false, googleBot: { index: false, follow: false } };

/** Per-page metadata helper. Title ≤ 60, description ≤ 155 chars (checked in tests). */
export function pageMetadata(opts: {
  title?: string;
  description?: string;
  path: string;
  noindex?: boolean;
  keywords?: string[];
}): Metadata {
  const description = opts.description ?? site.seo.defaultDescription;
  return {
    title: opts.title ?? { absolute: site.seo.defaultTitle },
    description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path },
    robots: opts.noindex ? { index: false, follow: false } : robotsMeta,
    // Page-specific Open Graph; image, locale and site name come from the root layout.
    openGraph: opts.title
      ? { title: opts.title, description, url: opts.path, type: "website", locale: "de_DE", siteName: site.name }
      : undefined,
  };
}
