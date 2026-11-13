import { home } from "@/content/home";
import { lowestMonthlyPrice } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { TrustBar } from "./TrustBar";
import { LogbookMockup } from "./LogbookMockup";

export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-heading" className="bg-surface pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          {/* display-xl (64/68) on desktop; scaled down on small screens. */}
          <h1 id="hero-heading" className="text-[2.25rem] leading-[2.625rem] tracking-[-0.02em] text-ink sm:text-display-l xl:text-display-xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">{hero.lead}</p>

          {/* Price up front: the strongest "planbar" signal. Coral is allowed here as large bold text. */}
          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 text-ink">
            <span className="font-display text-heading font-bold">
              ab <span className="text-accent">{formatEuro(lowestMonthlyPrice())}</span>
            </span>
            <span className="text-body font-semibold">{hero.priceSuffix}</span>
          </p>
          <p className="mt-1 text-small text-ink-muted">{hero.priceNote}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={contactHref("angebot")} track="cta_offer_click">
              {hero.primaryCta}
            </LinkButton>
            <LinkButton href={contactHref("erstgespraech")} variant="secondary" track="cta_call_click">
              {hero.secondaryCta}
            </LinkButton>
          </div>
          <TrustBar className="mt-10 border-t border-line pt-6" />
        </div>
        <div className="lg:col-span-5">
          <LogbookMockup />
        </div>
      </Container>
    </section>
  );
}
