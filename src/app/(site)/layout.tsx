import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { StickyCta } from "@/components/sections/StickyCta";
import { cta } from "@/content/home";
import { site } from "@/content/site";
import { contactHref, telHref } from "@/lib/links";

/** Public marketing pages: header, footer, the mobile action bar and cookieless analytics. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <StickyCta href={contactHref("check")} label={cta.primaryShort} tel={telHref(site.contact.phone)} />
      <Analytics />
    </>
  );
}
