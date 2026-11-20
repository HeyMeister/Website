import { home } from "@/content/home";
import { homeFaq } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { Compare } from "@/components/home/Compare";
import { Included } from "@/components/home/Included";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Segments } from "@/components/home/Segments";
import { Meister } from "@/components/home/Meister";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * Homepage: the price in the first screen, then why (like an insurance), what is included, how it
 * works, for whom, who is behind it, questions and the form. The hero's price check carries the
 * visitor's choice into the form; header, mobile bar and form repeat the main action.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Compare />
      <Included />
      <StepsPhoto />
      <Segments />
      <Meister />
      <Section id="faq" tone="muted" layout="split" title={home.faq.title} intro={home.faq.intro}>
        <FAQ items={homeFaq} disclaimer={home.faq.disclaimer} />
      </Section>
      <CTASection tone="light" />
    </>
  );
}
