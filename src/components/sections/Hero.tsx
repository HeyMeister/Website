import { home } from "@/content/home";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { TrustBar } from "./TrustBar";
import { LogbookMockup } from "./LogbookMockup";

export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-heading" className="bg-surface pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* display-xl (64/68) on desktop; scaled down on small screens so "Elektroprüfung" fits. */}
          <h1 id="hero-heading" className="text-[2.25rem] leading-[2.625rem] tracking-[-0.02em] text-ink sm:text-display-l xl:text-display-xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={contactHref("angebot")} track="cta_offer_click">
              {hero.primaryCta}
            </LinkButton>
            <LinkButton href={contactHref("erstgespraech")} variant="secondary" track="cta_call_click">
              {hero.secondaryCta}
            </LinkButton>
          </div>
          <TrustBar className="mt-10" />
        </div>
        <div className="lg:col-span-5">
          <LogbookMockup />
        </div>
      </Container>
    </section>
  );
}
