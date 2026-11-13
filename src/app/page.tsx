import { faq } from "@/content/faq";
import { home } from "@/content/home";
import { isFullMode } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { IncludedList } from "@/components/sections/IncludedList";
import { DefectClasses } from "@/components/sections/DefectClasses";
import { Steps } from "@/components/sections/Steps";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { PilotOffer } from "@/components/sections/PilotOffer";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * Validation mode: single landing page (jump links only).
 * Full mode adds segments, Meister card and references in a later phase.
 */
export default function HomePage() {
  const faqItems = isFullMode ? faq : faq.filter((f) => f.short);
  return (
    <>
      <Hero />
      <ProblemCards />
      <Section id="leistung" eyebrow={home.included.eyebrow} title={home.included.title} intro={home.included.intro}>
        <IncludedList />
        <div className="mt-16">
          <DefectClasses />
        </div>
      </Section>
      <Steps />
      <PricingTeaser />
      <PilotOffer />
      <Section id="faq" eyebrow={home.faq.eyebrow} title={home.faq.title}>
        <FAQ items={faqItems} disclaimer={home.faq.disclaimer} />
      </Section>
      <div className="border-t border-line">
        <CTASection />
      </div>
    </>
  );
}
