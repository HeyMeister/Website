import { home } from "@/content/home";
import { homeFaq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { Problem } from "@/components/home/Problem";
import { Core } from "@/components/home/Core";
import { Compare } from "@/components/home/Compare";
import { Included } from "@/components/home/Included";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Segments } from "@/components/home/Segments";
import { PriceTeaser } from "@/components/home/PriceTeaser";
import { Meister } from "@/components/home/Meister";
import { PilotBanner } from "@/components/home/PilotBanner";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * Homepage: understand it in 20 seconds, build trust, get the lead.
 * The main action appears in the hero, after the arguments, after the price teaser (via the
 * calculator) and at the end (form), plus in the header, the mobile bar and the footer close.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <Problem />
      <Core />
      <Compare />
      <Included />
      <StepsPhoto />
      <Segments />
      <PriceTeaser />
      <Meister />
      <PilotBanner />
      <Section id="faq" tone="muted" layout="split" eyebrow={home.faq.eyebrow} title={home.faq.title} intro={home.faq.intro}>
        <FAQ items={homeFaq} disclaimer={home.faq.disclaimer} />
      </Section>
      <CTASection tone="light" />
    </>
  );
}
