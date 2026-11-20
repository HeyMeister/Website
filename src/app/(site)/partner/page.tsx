import type { Metadata } from "next";
import { partner, partnerFaq } from "@/content/partner";
import { pageMetadata } from "@/lib/seo";
import { CalendarIcon, CheckIcon, FileIcon, SendIcon } from "@/components/icons";
import { ScreenBar } from "@/components/sections/LogbookMockup";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, Section, sectionHeadingClass } from "@/components/ui/layout";
import { FAQ } from "@/components/sections/FAQ";
import { PartnerSignupForm } from "@/components/forms/PartnerForms";

export const metadata: Metadata = pageMetadata({
  title: partner.seo.title,
  description: partner.seo.description,
  path: "/partner",
  keywords: [...partner.seo.keywords],
});

const stepIcons = {
  send: SendIcon,
  calendar: CalendarIcon,
  file: FileIcon,
  check: CheckIcon,
} as const;

/**
 * /partner: for electrical contractors who want inspection jobs. Server component; only the
 * application form is a client component.
 */
export default function PartnerPage() {
  const { hero, steps, benefits, requirements, faq, signup } = partner;
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="partner-hero-heading"
        className="bg-surface pb-16 pt-24 sm:pb-20 lg:grid lg:min-h-[calc(100svh-4rem)] lg:content-center lg:pb-24 lg:pt-20"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1
              id="partner-hero-heading"
              className="max-w-[20ch] hyphens-auto break-words text-[2.125rem] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.75rem] sm:leading-[1.1] xl:text-[3.25rem]"
            >
              {hero.title}
            </h1>
            <p className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">{hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#bewerben" track="cta_partner_click" trackLocation="partner_hero">
                {hero.cta}
              </LinkButton>
              <LinkButton href="#ablauf" variant="secondary">
                {hero.secondary}
              </LinkButton>
            </div>
            <p className="mt-6 text-small text-ink-muted">{hero.meta}</p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <JobCard />
          </div>
        </Container>
      </section>

      {/* Ablauf */}
      <Section id="ablauf" tone="muted" eyebrow={steps.eyebrow} title={steps.title}>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((s, i) => {
            const Icon = stepIcons[s.icon];
            return (
              <li key={s.title} className="rounded-card border border-line bg-surface-raised p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-data text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-subheading text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-muted">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Was Sie davon haben */}
      <section
        id="vorteile"
        aria-labelledby="vorteile-heading"
        className="bg-base py-20 text-white lg:py-28"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">{benefits.eyebrow}</Eyebrow>
            <h2 id="vorteile-heading" className={sectionHeadingClass}>
              {benefits.title}
            </h2>
          </div>
          <ul className="border-t border-white/15 lg:col-span-7 lg:mt-2">
            {benefits.items.map((b) => (
              <li key={b.title} className="border-b border-white/15 py-6">
                <h3 className="text-subheading text-white">{b.title}</h3>
                <p className="mt-1 max-w-prose text-ink-inverse-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Voraussetzungen */}
      <Section id="voraussetzungen" eyebrow={requirements.eyebrow} title={requirements.title}>
        <ul className="grid gap-x-12 border-t border-line sm:grid-cols-2">
          {requirements.items.map((r) => (
            <li key={r.title} className="flex gap-4 border-b border-line py-5">
              <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent-dark" strokeWidth={2.5} />
              <span>
                <span className="block font-semibold text-ink">{r.title}</span>
                <span className="mt-1 block text-ink-muted">{r.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted" layout="split" eyebrow={faq.eyebrow} title={faq.title}>
        <FAQ items={partnerFaq} disclaimer={faq.disclaimer} />
      </Section>

      {/* Bewerbung */}
      <section id="bewerben" aria-labelledby="bewerben-heading" className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>{signup.eyebrow}</Eyebrow>
            <h2 id="bewerben-heading" className={sectionHeadingClass}>
              {signup.title}
            </h2>
            <p className="mt-4 max-w-prose text-subheading text-ink-muted">{signup.text}</p>
          </div>
          <div className="min-w-0 rounded-card border border-line bg-surface-raised p-6 lg:col-span-8 lg:self-start lg:p-8">
            <PartnerSignupForm submitLabel={signup.submit} successText={signup.success} />
          </div>
        </Container>
      </section>
    </>
  );
}

/** Example job request (fictitious customer, labelled "Beispiel"): what a partner receives. */
function JobCard() {
  const j = partner.jobExample;
  return (
    <div data-ui className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <ScreenBar label={j.label} />
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-subheading font-bold text-ink">{j.customer}</p>
            <p className="text-small text-ink-muted">{j.site}</p>
          </div>
          <span className="label shrink-0 rounded-full border border-dashed border-line-strong px-2.5 py-1 text-ink-muted">
            Beispiel
          </span>
        </div>
        <dl className="mt-5 border-t border-line">
          {j.rows.map((r) => (
            <div key={r.term} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-small text-ink-muted">{r.term}</dt>
              <dd className="text-small font-medium text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div aria-hidden="true" className="mt-5 flex gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-small font-semibold text-white">
            <CheckIcon className="h-4 w-4" strokeWidth={3} />
            {j.accept}
          </span>
          <span className="inline-flex items-center rounded-full border border-line-strong px-4 py-2 text-small font-semibold text-ink-muted">
            {j.decline}
          </span>
        </div>
      </div>
    </div>
  );
}
