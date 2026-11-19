import { pilotPage } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { CheckIcon } from "@/components/icons";
import { CTASection } from "@/components/sections/CTASection";
import { Actions } from "@/components/ui/Actions";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...pilotPage.seo, path: "/pilot" });

export default function PilotPage() {
  const p = pilotPage;
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Pilotprogramm", href: "/pilot" }]}
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.text}
        location="pilot"
        actions={<Actions location="pilot" primaryHref="#kontakt" primaryLabel={p.cta} primaryWish="pilot" />}
        aside={
          <div className="rounded-card bg-base p-8 text-white">
            <p className="label text-accent-light">{site.pilot.seats}</p>
            <p className="mt-3 font-display text-[4rem] font-bold leading-none tracking-[-0.02em]">02–06</p>
            <p className="font-display text-heading font-bold text-ink-inverse-muted">2027</p>
            <p className="mt-6 text-ink-inverse-muted">{site.pilot.period}, {site.pilot.region}.</p>
          </div>
        }
      />
      <Section id="konditionen" tone="muted" layout="split" eyebrow="Pilotprogramm" title={p.conditionsTitle}>
        <ul className="border-t border-line">
          {site.pilot.conditions.map((c) => (
            <li key={c} className="flex gap-4 border-b border-line py-5 text-subheading text-ink">
              <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-deep" strokeWidth={2.6} />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink-muted">{site.pilot.intro}</p>
      </Section>
      <CTASection tone="light" eyebrow={p.eyebrow} title={p.cta + "."} text="Schreiben Sie uns kurz, wie viele Standorte Sie haben. Wir melden uns innerhalb eines Werktags." initialWish="pilot" />
    </>
  );
}
