import { faq } from "@/content/faq";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { publishedTeam } from "@/content/team";
import { isFullMode } from "@/lib/env";
import { contactHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Pillars } from "@/components/home/Pillars";
import { ReportBand } from "@/components/home/ReportBand";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Statement } from "@/components/home/Statement";
import { Segments } from "@/components/home/Segments";
import { Pricing } from "@/components/home/Pricing";
import { Pilot } from "@/components/home/Pilot";
import { InspectionIntervals } from "@/components/sections/InspectionIntervals";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { StickyCta } from "@/components/sections/StickyCta";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * Landing page, built with tasteskill (kind: service; deal: photo hero, nav-centre,
 * footer-visit, close-type, dark-band, tonal buttons; moment: word-highlight) and the
 * structure of floy.com: big claim, before/after, two pillars, report, steps, close.
 * Brand colours and fonts follow the HeyMeister brandbook.
 */
export default function HomePage() {
  const faqItems = isFullMode ? faq : faq.filter((f) => f.short);
  const meister = publishedTeam[0];
  return (
    <>
      <HomeHero />
      <BeforeAfter />
      <Pillars />
      <InspectionIntervals tone="light" />
      <ReportBand />
      <StepsPhoto />
      <Statement
        eyebrow={home.promise.eyebrow}
        before={home.promise.before}
        strong={home.promise.strong}
        signature={meister ? [meister.name, meister.role, meister.contactLine].filter(Boolean).join(" · ") : undefined}
        portrait={
          meister?.photo && meister.photoSize
            ? { src: meister.photo, ...meister.photoSize, alt: `${meister.name}, ${meister.role}` }
            : undefined
        }
      />
      <Segments />
      <Pricing />
      <Pilot />
      <Section id="faq" layout="split" eyebrow={home.faq.eyebrow} title={home.faq.title} intro={home.faq.intro}>
        <FAQ items={faqItems} disclaimer={home.faq.disclaimer} />
      </Section>
      <CTASection tone="muted" />
      <StickyCta href={contactHref("angebot")} label={home.mainAction} tel={telHref(site.contact.phone)} />
    </>
  );
}
