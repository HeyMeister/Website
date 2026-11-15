import { home } from "@/content/home";
import { site } from "@/content/site";
import { contactHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { Today } from "@/components/home/Today";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Central } from "@/components/home/Central";
import { PilotStart } from "@/components/home/PilotStart";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { StickyCta } from "@/components/sections/StickyCta";
import { Section } from "@/components/ui/layout";

export const metadata = pageMetadata({ path: "/" });

/**
 * One-page site aimed at one qualified request for a first pilot site: hero, today's effort,
 * how it works, benefits for the head office, start with one site, FAQ, request form.
 */
export default function HomePage() {
  const f = home.faq;
  return (
    <>
      <HomeHero />
      <Today />
      <StepsPhoto />
      <Central />
      <PilotStart />
      <Section id="faq" layout="split" eyebrow={f.eyebrow} title={f.title}>
        <FAQ items={[...f.items]} disclaimer={f.disclaimer} />
      </Section>
      <CTASection tone="muted" />
      <StickyCta href={contactHref("pilot")} label={home.mainAction} tel={telHref(site.contact.phone)} />
    </>
  );
}
