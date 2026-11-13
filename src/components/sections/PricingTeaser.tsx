import Link from "next/link";
import { home } from "@/content/home";
import { lowestMonthlyPrice, pricing } from "@/content/pricing";
import { isFullMode } from "@/lib/env";
import { formatEuro, formatPercent } from "@/lib/format";
import { contactHref, pricesHref } from "@/lib/links";
import { ArrowRightIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";
import { Reassurance } from "@/components/ui/Reassurance";

export function PricingTeaser() {
  const t = home.pricingTeaser;
  return (
    <section id="preise" aria-labelledby="preise-heading" className="scroll-mt-20 bg-base py-16 text-white sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
            <h2 id="preise-heading" className={sectionHeadingClass}>
              {t.prefix} <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span> {t.suffix}
            </h2>
            <p className="mt-4 max-w-prose text-ink-inverse-muted">{t.text}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            <LinkButton href={contactHref("angebot")} track="cta_offer_click" trackLocation="pricing" arrow>
              {t.cta}
            </LinkButton>
            <Reassurance tone="dark" className="lg:max-w-xs lg:flex-col lg:items-end" />
            {isFullMode && (
              <Link href={pricesHref()} className="inline-flex items-center gap-2 font-semibold text-white hover:underline">
                {t.fullLink} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <h3 className="label text-accent-light">{t.discountsTitle}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {pricing.volumeDiscounts.map((d) => (
              <li key={d.minSites} className="rounded-card border border-white/15 bg-base-light p-6">
                <span className="block font-display text-heading font-bold text-white">{formatPercent(d.percent)}</span>
                <span className="mt-1 block text-small text-ink-inverse-muted">ab {d.minSites} Standorten</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-ink-inverse-muted">
            {t.setupNote} Alle Preise {pricing.vatNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
