import { homeFaq } from "@/content/faq";
import { pricesPage } from "@/content/pages";
import { pricing } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { PriceCalculator } from "@/components/pages/PriceCalculator";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section, sectionHeadingClass } from "@/components/ui/layout";

export const metadata = pageMetadata({ ...pricesPage.seo, path: "/preise" });

const priceFaq = homeFaq.filter((f) => ["nichts-kaputt", "laufzeit", "schliessung", "mangel"].includes(f.id));

export default function PreisePage() {
  const p = pricesPage;
  return (
    <>
      <PageHero breadcrumbs={[{ label: "Preise", href: "/preise" }]} eyebrow={p.eyebrow} title={p.title} lead={p.lead} location="preise" />

      <Section id="tabelle" tone="muted" eyebrow="Preistabelle" title={p.tableTitle}>
        <div className="overflow-x-auto rounded-card border border-line bg-surface-raised">
          <table className="w-full min-w-[36rem] text-left">
            <caption className="sr-only">{p.tableTitle}, netto pro Standort und Monat</caption>
            <thead className="border-b border-line bg-surface-2">
              <tr className="label text-ink">
                <th scope="col" className="px-6 py-3 font-semibold">Standortgröße</th>
                {pricing.tiers.map((t) => (
                  <th key={t.id} scope="col" className="px-4 py-3 font-semibold">
                    {t.label}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 font-semibold">Einrichtung, einmalig</th>
              </tr>
            </thead>
            <tbody>
              {pricing.sizes.map((s) => (
                <tr key={s.id} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-6 py-4 font-normal">
                    <span className="block font-semibold text-ink">{s.label}</span>
                    <span className="mt-1 block text-small text-ink-muted">
                      {s.guide}
                    </span>
                  </th>
                  <td className="px-4 py-4 font-display text-subheading font-bold text-ink">{formatEuro(s.monthly.basis)}</td>
                  <td className="px-4 py-4 font-display text-subheading font-bold text-ink">{formatEuro(s.monthly.plus)}</td>
                  <td className="px-6 py-4 text-ink">{formatEuro(s.setupFee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-card border border-line bg-surface-raised p-6">
            <p className="font-semibold text-ink">Basis und Plus</p>
            <ul className="mt-2 space-y-2 text-small text-ink-muted">
              {pricing.tiers.map((t) => (
                <li key={t.id}>
                  <span className="font-semibold text-ink">{t.label}:</span> {t.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface-raised p-6">
            <p className="font-semibold text-ink">Einrichtung</p>
            <p className="mt-2 text-small text-ink-muted">
              Einmalig pro Standort. Entfällt bei {pricing.setupFeeWaivedForTermMonths} Monaten Laufzeit. {pricing.setupFeeNote}
            </p>
          </div>
          <div className="rounded-card border border-line bg-surface-raised p-6">
            <p className="font-semibold text-ink">Mengenrabatt</p>
            <ul className="mt-2 space-y-1 text-small text-ink-muted">
              {pricing.volumeDiscounts.map((d) => (
                <li key={d.minSites}>
                  {d.percent} % ab {d.minSites} Standorten
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-small text-ink-muted">
          Alle Preise {pricing.vatNote} pro Standort und Monat. Kleinreparaturen inklusive. {pricing.classificationNote}
        </p>
      </Section>

      <section id="rechner" aria-labelledby="rechner-heading" className="scroll-mt-20 py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-9">
            <Eyebrow>Preisrechner</Eyebrow>
            <h2 id="rechner-heading" className={`${sectionHeadingClass} mb-10`}>
              {p.calculatorTitle}
            </h2>
            <PriceCalculator ctaLabel={p.calculatorCta} />
          </div>
          <aside className="self-end rounded-card border border-line bg-surface-2 p-6 lg:col-span-3">
            <p className="font-semibold text-ink">{p.anchor.title}</p>
            <p className="mt-2 text-small text-ink-muted">{p.anchor.text}</p>
            {p.riskReversal.enabled && <p className="mt-4 text-small font-semibold text-ink">{p.riskReversal.text}</p>}
          </aside>
        </Container>
      </section>

      <Section id="faq" tone="muted" layout="split" eyebrow="Häufige Fragen" title="Fragen zum Preis.">
        <FAQ items={priceFaq} disclaimer="Diese Antworten sind allgemeine Hinweise und keine Rechtsberatung." />
      </Section>

      <CtaBand title="Ihr festes Angebot in 15 Minuten." text="Erzählen Sie uns, wie viele Standorte Sie haben. Den Rest klären wir am Telefon." location="preise-close" />
    </>
  );
}
