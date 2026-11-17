import Link from "next/link";
import { siteUrl } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList JSON-LD. "Startseite" is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Startseite", href: "/" }, ...items];
  const base = siteUrl();
  return (
    <>
      <nav aria-label="Brotkrumen" className="mb-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-ink-muted">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="m-link hover:text-ink">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${base}${c.href}` })),
        }}
      />
    </>
  );
}
