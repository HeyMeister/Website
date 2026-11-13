import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { robotsMeta, siteUrl } from "@/lib/seo";
import { colors } from "@/styles/tokens";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

// Inter, self-hosted (no request to Google). Variable font covers weights 100–900.
const inter = localFont({
  src: [
    { path: "../fonts/InterVariable-latin.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/InterVariable-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.defaultDescription,
  applicationName: site.name,
  robots: robotsMeta,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: colors.base,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-base px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
