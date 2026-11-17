import Link from "next/link";
import { services, servicesOverview } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { InspectionIntervals } from "@/components/sections/InspectionIntervals";
import { LogbookScreen } from "@/components/sections/LogbookMockup";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...servicesOverview.seo, path: "/leistungen" });

export default function LeistungenPage() {
  const o = servicesOverview;
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Leistungen", href: "/leistungen" }]} eyebrow={o.eyebrow} title={o.title} lead={o.lead} aside={<LogbookScreen />} location="leistungen" />
      <Section id="uebersicht" tone="muted" eyebrow="Im Abo enthalten" title="Vier Leistungen, ein Monatspreis.">
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="min-w-0">
              <Link
                href={`/leistungen/${s.slug}`}
                className="m-card group flex h-full flex-col justify-between gap-8 rounded-card border border-line bg-surface-raised p-6 hover:border-line-strong lg:p-8"
              >
                <span>
                  <span className="block hyphens-auto break-words font-display text-heading font-bold text-ink">{s.nav}</span>
                  <span className="mt-2 block text-ink-muted">{s.teaser}</span>
                </span>
                <span className="inline-flex items-center gap-2 font-semibold text-accent-dark">
                  Details
                  <ArrowRightIcon className="m-arrow h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <InspectionIntervals tone="light" />
      <CtaBand title="Ein Anruf, und das Thema ist erledigt." text="15 Minuten am Telefon. Danach wissen Sie, was fällig ist und was es kostet." location="leistungen-close" />
    </>
  );
}
