import type { Metadata } from "next";
import { partner, partnerConfig, partnerFaq } from "@/content/partner";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { CheckIcon, EuroIcon, FileIcon, SendIcon } from "@/components/icons";
import { ScreenBar } from "@/components/sections/LogbookMockup";
import { LinkButton } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Placeholder";
import {
  Container,
  Eyebrow,
  Section,
  sectionHeadingClass,
} from "@/components/ui/layout";
import { FAQ } from "@/components/sections/FAQ";
import { PartnerSignupForm, TipForm } from "@/components/forms/PartnerForms";

export const metadata: Metadata = pageMetadata({
  title: partner.seo.title,
  description: partner.seo.description,
  path: "/partner",
  keywords: [...partner.seo.keywords],
});

const stepIcons = {
  send: SendIcon,
  offer: FileIcon,
  payout: EuroIcon,
} as const;

/**
 * /partner: partner programme for tip-givers. Server component; only the two forms are client
 * components. Commission and payout rhythm come from content/partner.ts (TODO placeholders).
 */
export default function PartnerPage() {
  const { hero, steps, audiences, benefits, conduct, faq, signup, tip } =
    partner;
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="partner-hero-heading"
        className="bg-surface pb-16 pt-24 sm:pb-20 lg:min-h-[calc(100svh-4rem)] lg:pb-24 lg:pt-28"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1
              id="partner-hero-heading"
              className="max-w-[22ch] text-[2.125rem] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.75rem] sm:leading-[1.1] xl:text-[3.25rem]"
            >
              {hero.title}
            </h1>
            <p className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">
              {hero.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#partner-werden" arrow>
                {hero.cta}
              </LinkButton>
              <LinkButton href="#tipp" variant="secondary">
                {hero.secondary}
              </LinkButton>
            </div>
            <p className="mt-6 text-small text-ink-muted">
              Einsatzgebiet: {site.region.label}. Nur Gewerbekunden.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <StatusCard />
          </div>
        </Container>
      </section>

      {/* So funktioniert's */}
      <Section
        id="ablauf"
        tone="muted"
        eyebrow={steps.eyebrow}
        title={steps.title}
      >
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.items.map((s, i) => {
            const Icon = stepIcons[s.icon];
            return (
              <li
                key={s.title}
                className="rounded-card border border-line bg-surface-raised p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-data text-accent-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-subheading text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-muted">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Für wen */}
      <Section
        id="fuer-wen"
        eyebrow={audiences.eyebrow}
        title={audiences.title}
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.items.map((a) => (
            <li
              key={a.title}
              className="rounded-card border border-line bg-surface-raised p-6"
            >
              <h3 className="text-subheading text-ink">{a.title}</h3>
              <p className="mt-3 text-ink-muted">{a.occasion}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Was Sie davon haben */}
      <section
        id="vorteile"
        aria-labelledby="vorteile-heading"
        className="bg-base pb-16 pt-24 text-white sm:pb-20 lg:pb-24 lg:pt-[7.5rem]"
      >
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">{benefits.eyebrow}</Eyebrow>
            <h2 id="vorteile-heading" className={sectionHeadingClass}>
              {benefits.title}
            </h2>
            <p className="mt-10 font-display text-[3.5rem] font-bold leading-none tracking-[-0.02em] sm:text-[4.5rem]">
              <span className="mb-3 block text-subheading font-semibold tracking-normal text-ink-inverse-muted">
                {benefits.commissionPrefix}
              </span>
              <span className="text-accent">
                <Fill text={partnerConfig.commissionMaxPercent} />
              </span>{" "}
              <span className="text-heading">{benefits.commissionSuffix}</span>
            </p>
            <p className="mt-4 text-subheading text-white">
              {benefits.recurring}
            </p>
          </div>
          <ul className="border-t border-white/15 lg:col-span-7 lg:mt-2">
            {benefits.items.map((b) => (
              <li key={b.title} className="border-b border-white/15 py-6">
                <h3 className="text-subheading text-white">{b.title}</h3>
                <p className="mt-1 max-w-prose text-ink-inverse-muted">
                  {b.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Verhaltenskodex */}
      <Section id="kodex" eyebrow={conduct.eyebrow} title={conduct.title}>
        <ul className="grid gap-x-12 border-t border-line sm:grid-cols-2">
          {conduct.items.map((c) => (
            <li key={c.title} className="border-b border-line py-5">
              <h3 className="font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-ink-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        tone="muted"
        layout="split"
        eyebrow={faq.eyebrow}
        title={faq.title}
      >
        <FAQ items={partnerFaq} disclaimer={faq.disclaimer} />
      </Section>

      {/* Partner werden */}
      <section
        id="partner-werden"
        aria-labelledby="partner-werden-heading"
        className="pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-[7.5rem]"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>{signup.eyebrow}</Eyebrow>
            <h2 id="partner-werden-heading" className={sectionHeadingClass}>
              {signup.title}
            </h2>
            <p className="mt-4 max-w-prose text-subheading text-ink-muted">
              {signup.text}
            </p>
          </div>
          <div className="rounded-card border border-line bg-surface-raised p-6 lg:col-span-8 lg:p-8">
            <PartnerSignupForm
              submitLabel={signup.submit}
              successText={signup.success}
            />
          </div>
        </Container>
      </section>

      {/* Tipp einreichen */}
      <section
        id="tipp"
        aria-labelledby="tipp-heading"
        className="bg-surface-2 pb-16 pt-24 sm:pb-20 lg:pb-24 lg:pt-[7.5rem]"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="muted">{tip.eyebrow}</Eyebrow>
            <h2 id="tipp-heading" className="text-heading text-ink">
              {tip.title}
            </h2>
            <p className="mt-3 max-w-prose text-ink-muted">{tip.text}</p>
          </div>
          <div className="rounded-card border border-line bg-surface-raised p-6 lg:col-span-8 lg:p-8">
            <TipForm submitLabel={tip.submit} successText={tip.success} />
          </div>
        </Container>
      </section>
    </>
  );
}

/** Example status message for one tip: shows the model and the "Statusmeldung" promise. */
function StatusCard() {
  const s = partner.statusExample;
  return (
    <div
      data-ui
      className="overflow-hidden rounded-card border border-line bg-surface-raised"
    >
      <ScreenBar label="Statusmeldung" />
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-data text-ink-muted">{s.tip}</p>
            <p className="mt-1 font-display text-subheading font-bold text-ink">
              {s.customer}
            </p>
            <p className="text-small text-ink-muted">{s.reason}</p>
          </div>
          <span className="label shrink-0 rounded-full border border-dashed border-line-strong px-2.5 py-1 text-ink-muted">
            Beispiel
          </span>
        </div>
        <ol className="mt-6 space-y-0">
          {s.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0">
              {i < s.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[11px] top-6 h-[calc(100%-1rem)] w-0.5 ${step.done ? "bg-success" : "bg-line"}`}
                />
              )}
              <span
                className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  step.done
                    ? "bg-success text-white"
                    : "border-2 border-line-strong bg-surface-raised"
                }`}
              >
                {step.done && (
                  <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                )}
                <span className="sr-only">
                  {step.done ? "erledigt" : "offen"}
                </span>
              </span>
              <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
                <span
                  className={step.done ? "text-ink" : "font-semibold text-ink"}
                >
                  {step.title}
                </span>
                <span className="font-mono text-data text-ink-muted">
                  {step.date}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
