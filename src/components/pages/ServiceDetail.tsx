import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { intervalNote, services, type Service } from "@/content/services";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { LogbookScreen, ReportScreen } from "@/components/sections/LogbookMockup";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedGuides } from "@/components/seo/GuideLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/layout";

function Visual({ kind }: { kind: Service["visual"] }) {
  if (kind === "logbook") return <LogbookScreen />;
  if (kind === "defects") return <ReportScreen />;
  const photo = kind === "photo-devices" ? photos.devices : photos.installation;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
    </div>
  );
}

/**
 * One service page: what · standard · who · how often (indicative) · what you get · CTA.
 * Same structure for all four services (content/services.ts).
 */
export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Leistungen", href: "/leistungen" },
          { label: service.nav, href: `/leistungen/${service.slug}` },
        ]}
        title={service.title}
        lead={service.lead}
        aside={<Visual kind={service.visual} />}
        location={`service-${service.slug}`}
      />

      <Section id="details" tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="muted">{service.what.heading}</Eyebrow>
            <ul className="space-y-3">
              {service.what.items.map((item) => (
                <li key={item} className="flex gap-3 text-subheading text-ink">
                  <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-deep" strokeWidth={2.6} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-line border-y border-line">
              {service.facts.map((f) => (
                <div key={f.label} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="label pt-1 text-accent-deep">{f.label}</dt>
                  <dd>
                    <p className="text-ink">{f.value}</p>
                    {f.note && <p className="mt-2 text-small text-ink-muted">{f.note}</p>}
                  </dd>
                </div>
              ))}
            </dl>
            {service.showIntervalNote && (
              <p className="mt-6 rounded-control border border-line bg-surface-raised px-5 py-4 text-small text-ink">{intervalNote}</p>
            )}
          </div>
        </div>
      </Section>

      <section aria-labelledby="bekommen-heading" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Was Sie bekommen</Eyebrow>
            <h2 id="bekommen-heading" className="text-heading text-ink">
              Nach jedem Termin, ohne dass Sie nachfragen.
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 rounded-card border border-line bg-surface-raised p-5 text-ink">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" strokeWidth={2.6} />
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Ein Abo für alles, was Ihre Elektrik braucht." text="Prüfung, Reparatur und Betriebsbuch zum festen Monatspreis pro Standort." location={`service-${service.slug}-close`} />

      <RelatedGuides slugs={service.related} />

      <nav aria-label="Weitere Leistungen" className="border-t border-line py-12">
        <Container>
          <p className="label mb-4 text-ink-muted">Weitere Leistungen</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/leistungen/${s.slug}`} className="m-link group inline-flex items-center gap-2 font-display text-subheading font-bold text-ink">
                  {s.nav}
                  <ArrowRightIcon className="m-arrow h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
}
