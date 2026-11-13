import { home } from "@/content/home";
import { lowestMonthlyPrice, pricing } from "@/content/pricing";
import { formatEuro, formatPercent } from "@/lib/format";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/layout";

/**
 * Prices (calm section): the entry price set large as the heading, volume discounts as three
 * tiles. The main action is not repeated here as a filled button (tasteskill: it lives in nav,
 * hero, close and phone bar); this one is the tonal secondary.
 */
export function Pricing() {
  const p = home.pricing;
  return (
    <section id="preise" aria-labelledby="preise-heading" className="pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]">
      <Container className="flex flex-col lg:min-h-[calc(100svh-13.5rem)]">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2
            id="preise-heading"
            className="text-[2.5rem] leading-[1.02] tracking-[-0.025em] text-ink sm:text-[3.5rem] lg:col-span-7 xl:text-[4rem]"
          >
            {p.prefix} <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span>{" "}
            <span className="mt-2 block font-display text-subheading font-bold tracking-normal text-ink sm:text-heading">{p.suffix}</span>
          </h2>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="max-w-prose text-subheading text-ink-muted">{p.text}</p>
            <LinkButton href={contactHref("angebot")} variant="secondary" track="cta_offer_click" trackLocation="pricing" arrow className="mt-6">
              {p.cta}
            </LinkButton>
          </div>
        </div>

        <div className="mt-16 lg:mt-auto">
          <h3 className="label text-ink-muted">{p.discountsTitle}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {pricing.volumeDiscounts.map((d) => (
              <li key={d.minSites} className="rounded-card border border-line bg-surface-raised p-6">
                <span className="block font-display text-heading font-bold text-ink sm:text-display-l">{formatPercent(d.percent)}</span>
                <span className="mt-1 block text-ink-muted">ab {d.minSites} Standorten</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-ink-muted">
            {p.setupNote} Alle Preise {pricing.vatNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
