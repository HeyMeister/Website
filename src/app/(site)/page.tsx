import { home } from "@/content/home";
import { site } from "@/content/site";
import { contactHref, telHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { StepsPhoto } from "@/components/home/StepsPhoto";
import { Services } from "@/components/home/Services";
import { Packages } from "@/components/home/Packages";
import { Framework } from "@/components/home/Framework";
import { CTASection } from "@/components/sections/CTASection";
import { StickyCta } from "@/components/sections/StickyCta";

export const metadata = pageMetadata({ path: "/" });

/**
 * One-page site: hero, how it works, services, packages (with small print), framework agreement
 * for chains, contact. Brand colours and fonts follow the HeyMeister brandbook.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StepsPhoto />
      <Services />
      <Packages />
      <Framework />
      <CTASection tone="muted" />
      <StickyCta href={contactHref("angebot")} label={home.mainAction} tel={telHref(site.contact.phone)} />
    </>
  );
}
