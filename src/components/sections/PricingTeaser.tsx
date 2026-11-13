import Link from "next/link";
import { home } from "@/content/home";
import { lowestMonthlyPrice, pricing } from "@/content/pricing";
import { isFullMode } from "@/lib/env";
import { formatEuro } from "@/lib/format";
import { contactHref, pricesHref } from "@/lib/links";
import { ArrowRightIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

export function PricingTeaser() {
  const t = home.pricingTeaser;
  return (
    <section id="preise" aria-labelledby="preise-heading" className="scroll-mt-20 bg-base py-16 text-white sm:py-20 lg:py-24">
      <Container className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <h2 id="preise-heading" className={sectionHeadingClass}>
            {t.prefix} <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span> {t.suffix}
          </h2>
          <p className="mt-4 max-w-prose text-ink-inverse-muted">{t.text}</p>
          <p className="mt-2 text-small text-ink-inverse-muted">Alle Preise {pricing.vatNote}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
          <LinkButton href={contactHref("angebot")} track="cta_offer_click">
            {t.cta}
          </LinkButton>
          {isFullMode && (
            <Link href={pricesHref()} className="inline-flex items-center gap-2 font-semibold text-white hover:underline">
              {t.fullLink} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
