import { home } from "@/content/home";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { TrustBar } from "./TrustBar";
import { LogbookMockup } from "./LogbookMockup";

export function Hero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden bg-surface pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-heading" className="max-w-[20ch] text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-muted">{hero.lead}</p>
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
