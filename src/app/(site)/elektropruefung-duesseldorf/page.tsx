import Image from "next/image";
import Link from "next/link";
import { localPage } from "@/content/local";
import { photos } from "@/content/photos";
import { lowestMonthlyPrice } from "@/content/pricing";
import { segments } from "@/content/segments";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { formatEuro } from "@/lib/format";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/icons";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { IconCards } from "@/components/sections/IconCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedGuides } from "@/components/seo/GuideLinks";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, sectionHeadingClass } from "@/components/ui/layout";

const p = localPage;

export const metadata = pageMetadata({ title: p.seo.title, description: p.seo.description, keywords: [...p.seo.keywords], path: p.path });

/** Local landing page for Düsseldorf: why local, districts, services, segments, price, FAQ. */
export default function DuesseldorfPage() {
  const faq = [
    ...p.faq,
    {
      id: "kosten",
      question: "Was kostet die Elektroprüfung in Düsseldorf?",
      answer: [
        `Ab ${formatEuro(lowestMonthlyPrice())} pro Standort und Monat, netto, je nach Standortgröße. Prüfung, Kleinreparaturen und Betriebsbuch sind enthalten.`,
      ],
    },
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Electrician",
          name: site.name,
          url: `${siteUrl()}${p.path}`,
          telephone: site.contact.phone,
          email: site.contact.email,
          areaServed: { "@type": "City", name: "Düsseldorf" },
          priceRange: `ab ${formatEuro(lowestMonthlyPrice())} pro Standort und Monat`,
        }}
      />
      <PageHero
        breadcrumbs={[{ label: "Elektroprüfung Düsseldorf", href: p.path }]}
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.lead}
        location="duesseldorf"
        aside={
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-2">
            <Image src={photos.hero.src} alt={photos.hero.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-[15%_50%]" />
          </div>
        }
      />

      <Section id="warum" tone="muted" layout="row" eyebrow={p.why.eyebrow} title={p.why.title}>
        <IconCards items={p.why.items} tone="muted" />
      </Section>

      <section id="einsatzgebiet" aria-labelledby="einsatzgebiet-heading" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>{p.districts.eyebrow}</Eyebrow>
            <h2 id="einsatzgebiet-heading" className={sectionHeadingClass}>
              {p.districts.title}
            </h2>
            <p className="mt-4 text-subheading text-ink-muted">{p.districts.text}</p>
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2">
              {p.districts.names.map((n) => (
                <li key={n} className="rounded-full border border-line bg-surface-raised px-3.5 py-1.5 text-small text-ink">
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-control border border-line bg-surface-2 px-5 py-4 text-small text-ink">{p.districts.outside}</p>
          </div>
        </Container>
      </section>

      <section id="leistungen" aria-labelledby="leistungen-heading" className="bg-surface-2 py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow tone="muted">Leistungen</Eyebrow>
            <h2 id="leistungen-heading" className="text-heading text-ink">
              Alles in einem Abo.
            </h2>
            <ul className="mt-6 border-t border-line">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-line">
                  <Link href={`/leistungen/${s.slug}`} className="m-link group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block font-semibold text-ink">{s.nav}</span>
                      <span className="block text-small text-ink-muted">{s.teaser}</span>
                    </span>
                    <ArrowRightIcon className="m-arrow h-4 w-4 shrink-0 text-accent-dark" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow tone="muted">Branchen</Eyebrow>
            <h2 className="text-heading text-ink">Für Betriebe in Düsseldorf.</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {segments.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="m-btn inline-flex min-h-[44px] items-center rounded-full border border-line-strong bg-surface-raised px-4 text-small font-semibold text-ink hover:border-base">
                    {s.card.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-heading font-bold text-ink">
              Ab <span className="text-accent-dark">{formatEuro(lowestMonthlyPrice())}</span> pro Standort und Monat, netto.
            </p>
            <Link href="/preise" className="m-link mt-2 inline-flex items-center gap-2 font-semibold text-accent-dark">
              Preis für Ihre Standorte berechnen
              <ArrowRightIcon className="m-arrow h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <Section id="faq" layout="split" eyebrow="Häufige Fragen" title="Elektroprüfung in Düsseldorf.">
        <FAQ items={faq} disclaimer="Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung." />
      </Section>

      <CtaBand title="Ein Anruf. Danach ist Elektro nicht mehr Ihr Thema." text="15 Minuten am Telefon: Standorte, Geräte, letzte Prüfung. Sie bekommen ein festes Angebot." location="duesseldorf-close" />
      <RelatedGuides slugs={["dguv-v3-pruefung", "pruefristen", "kosten-elektropruefung"]} tone="muted" />
    </>
  );
}
