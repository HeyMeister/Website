import Link from "next/link";
import { home } from "@/content/home";
import { lowestMonthlyPrice, pricing } from "@/content/pricing";
import { isFullMode } from "@/lib/env";
import { formatEuro } from "@/lib/format";
import { contactHref, pricesHref } from "@/lib/links";
import { ArrowRightIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/layout";

export function PricingTeaser() {
  const t = home.pricingTeaser;
  return (
    <section id="preise" aria-labelledby="preise-heading" className="scroll-mt-20 bg-base py-16 text-surface sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <h2 id="preise-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.prefix} <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span> {t.suffix}
          </h2>
          <p className="mt-4 max-w-prose text-lg text-ink-inverse-muted">{t.text}</p>
          <p className="mt-2 text-sm text-ink-inverse-muted">Alle Preise {pricing.vatNote}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
          <LinkButton href={contactHref("angebot")} track="cta_offer_click">
            {t.cta}
          </LinkButton>
          {isFullMode && (
            <Link href={pricesHref()} className="inline-flex items-center gap-2 font-semibold text-surface hover:underline">
              {t.fullLink} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
