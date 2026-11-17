import Link from "next/link";
import { guide as operatorGuide } from "@/content/pages";
import { guides, guidesHub } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";
import { GuideCard } from "@/components/seo/GuideLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...guidesHub.seo, path: "/ratgeber" });

/** Guides hub: the operator-duty guide first, then every article. */
export default function RatgeberPage() {
  const h = guidesHub;
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Ratgeber", href: "/ratgeber" }]} eyebrow={h.eyebrow} title={h.title} lead={h.lead} location="ratgeber-hub" />
      <Section id="artikel" tone="muted">
        <Link
          href="/betreiberpflichten"
          className="m-card group mb-8 flex flex-col gap-4 rounded-card bg-base p-8 text-white lg:flex-row lg:items-center lg:justify-between lg:p-10"
        >
          <span>
            <span className="label block text-accent-light">Grundlagen</span>
            <span className="mt-2 block font-display text-heading font-bold">{operatorGuide.title}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-white">
            Zum Ratgeber
            <ArrowRightIcon className="m-arrow h-4 w-4" />
          </span>
        </Link>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug} className="min-w-0">
              <GuideCard guide={g} headingLevel={2} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-small text-ink-muted">{h.disclaimer}</p>
      </Section>
      <CtaBand title="Lieber abgeben als selbst nachlesen?" text="15 Minuten am Telefon. Danach wissen Sie, was fällig ist und was es kostet." location="ratgeber-hub-close" />
    </>
  );
}
