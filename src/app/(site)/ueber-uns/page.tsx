import { aboutPage } from "@/content/pages";
import { site } from "@/content/site";
import { publishedTeam } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...aboutPage.seo, path: "/ueber-uns" });

export default function UeberUnsPage() {
  const a = aboutPage;
  const leon = publishedTeam[0];
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Über uns", href: "/ueber-uns" }]} eyebrow={a.eyebrow} title={a.title} lead={a.story} location="ueber-uns" />
      <Section id="werte" tone="muted" eyebrow={a.valuesTitle} title="Planbar, dokumentiert, ehrlich.">
        <ul className="grid gap-6 md:grid-cols-3">
          {a.values.map((v, i) => (
            <li key={v.title} className="rounded-card border border-line bg-surface-raised p-6">
              <span className="font-mono text-data text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-heading text-ink">{v.title}</h3>
              <p className="mt-2 text-ink-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      {leon && (
        <section aria-labelledby="meister-heading" className="py-16 sm:py-20 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Eyebrow>Der Meister</Eyebrow>
              <h2 id="meister-heading" className="text-heading text-ink">
                {leon.name}
              </h2>
              <p className="mt-2 text-ink-muted">{leon.role}</p>
              {site.trust.handwerksrolle && (
                <p className="mt-2 text-small text-ink-muted">
                  Eingetragen in der Handwerksrolle der {site.trust.chamber}.
                </p>
              )}
            </div>
            <div className="lg:col-span-8">
              {leon.quote && (
                <blockquote className="border-l-4 border-accent pl-6 font-display text-heading font-bold leading-snug text-ink">
                  „{leon.quote}“
                </blockquote>
              )}
              <p className="mt-8 text-ink-muted">
                Einsatzgebiet: {site.region.label}. Sitz in {site.contact.address.city}.
              </p>
            </div>
          </Container>
        </section>
      )}
      <CtaBand title="Lernen Sie uns kennen. In 15 Minuten." location="ueber-uns-close" />
    </>
  );
}
