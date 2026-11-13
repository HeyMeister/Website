import { faq } from "@/content/faq";
import { home } from "@/content/home";
import { isFullMode } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ProblemCards } from "@/components/sections/ProblemCards";
import { IncludedList } from "@/components/sections/IncludedList";
import { DefectClasses } from "@/components/sections/DefectClasses";
import { InspectionIntervals } from "@/components/sections/InspectionIntervals";
import { Steps } from "@/components/sections/Steps";
import { SegmentCards } from "@/components/sections/SegmentCards";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { PilotOffer } from "@/components/sections/PilotOffer";
import { MeisterSection } from "@/components/sections/MeisterSection";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * Validation mode: single landing page with jump links.
 * Sections alternate paper / surface-2, with navy for prices (brandbook ratio 80/15/5).
 */
export default function HomePage() {
  const faqItems = isFullMode ? faq : faq.filter((f) => f.short);
  return (
    <>
      <Hero />
      <ProblemCards />
      <Section id="leistung" eyebrow={home.included.eyebrow} title={home.included.title} intro={home.included.intro}>
        <IncludedList />
        <div className="mt-16 border-t border-line pt-16">
          <DefectClasses />
        </div>
      </Section>
      <InspectionIntervals tone="muted" />
      <Steps />
      <SegmentCards tone="muted" />
      <PricingTeaser />
      <PilotOffer tone="light" />
      <MeisterSection tone="muted" />
      <Section id="faq" layout="split" eyebrow={home.faq.eyebrow} title={home.faq.title} intro={home.faq.intro}>
        <FAQ items={faqItems} disclaimer={home.faq.disclaimer} />
      </Section>
      <CTASection tone="muted" />
    </>
  );
}
