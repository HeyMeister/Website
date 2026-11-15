import { home } from "@/content/home";
import { site } from "@/content/site";
import { contactHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Offer } from "@/components/home/Offer";
import { Conditions } from "@/components/home/Conditions";
import { Framework } from "@/components/home/Framework";
import { CTASection } from "@/components/sections/CTASection";
import { StickyCta } from "@/components/sections/StickyCta";

export const metadata = pageMetadata({ path: "/" });

/**
 * One-page site: hero, how it works, included services with price, conditions, framework agreement
 * for chains, contact. Brand colours and fonts follow the HeyMeister brandbook.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StepsPhoto />
      <Offer />
      <Conditions />
      <Framework />
      <CTASection tone="muted" />
      <StickyCta href={contactHref("angebot")} label={home.mainAction} tel={telHref(site.contact.phone)} />
    </>
  );
}
