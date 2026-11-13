import Script from "next/script";
import { analyticsDomain } from "@/lib/env";
import { ClickTracker } from "./ClickTracker";

/**
 * Plausible via first-party proxy (/stats/*, see next.config.ts): cookieless, no
 * third-party request from the browser, therefore no consent banner needed.
 */
export function Analytics() {
  if (!analyticsDomain) return null;
  return (
    <>
      <Script
        id="plausible-queue"
        strategy="afterInteractive"
      >{`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}</Script>
      <Script
        src="/stats/script.js"
        data-domain={analyticsDomain}
        data-api="/stats/event"
        strategy="afterInteractive"
      />
      <ClickTracker />
    </>
  );
}
