import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";

/** Public marketing pages: header, footer and cookieless analytics. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
