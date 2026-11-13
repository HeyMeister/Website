import { home } from "@/content/home";
import { lowestMonthlyPrice } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { contactHref } from "@/lib/links";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { Reassurance } from "@/components/ui/Reassurance";
import { TrustBar } from "./TrustBar";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const { hero } = home;
  const [lineOne, lineTwo] = hero.titleLines;
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-surface pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20"
    >
      <div aria-hidden="true" className="hm-grid-bg pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          {/* Eyebrow as a badge: keeps the search term at the top, with a coral status dot. */}
          <p className="label inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-accent-dark">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>

          {/* 54/60 on wide screens so each line fits the half-width column; second line is the proof. */}
          <h1
            id="hero-heading"
            className="mt-6 text-[2.375rem] leading-[2.75rem] tracking-[-0.02em] text-ink sm:text-display-l xl:text-[3.375rem] xl:leading-[3.75rem]"
          >
            <span className="block">{lineOne}</span> <span className="block text-ink-muted">{lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">{hero.lead}</p>

          {/* Price up front: the strongest "planbar" signal. Coral is allowed here as large bold text. */}
          <div className="mt-8 border-l-2 border-accent pl-4">
            <p className="flex flex-wrap items-baseline gap-x-2 text-ink">
              <span className="font-display text-heading font-bold">
                ab <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span>
              </span>
              <span className="text-body font-semibold">{hero.priceSuffix}</span>
            </p>
            <p className="mt-1 text-small text-ink-muted">{hero.priceNote}</p>
          </div>

          {/* One dominant action; the intro call is a quieter text link (brandbook: never two primaries). */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <LinkButton href={contactHref("angebot")} track="cta_offer_click" trackLocation="hero" arrow>
              <span className="sm:hidden">{hero.primaryCtaShort}</span>
              <span className="hidden sm:inline">{hero.primaryCta}</span>
            </LinkButton>
            <Link
              href={contactHref("erstgespraech")}
              data-track="cta_call_click"
              data-track-location="hero"
              className="inline-flex min-h-[44px] items-center gap-2 rounded font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              <CalendarIcon className="h-5 w-5 shrink-0 text-accent" />
              {hero.secondaryCta}
            </Link>
          </div>
          <Reassurance className="mt-4" />
          <TrustBar className="mt-10 border-t border-line pt-6" />
        </div>

        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
