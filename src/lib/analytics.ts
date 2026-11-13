/** Cookieless analytics events (Plausible; Umami supported if its script is loaded instead). */
export type AnalyticsEvent =
  | "cta_offer_click"
  | "cta_call_click"
  | "cta_pilot_click"
  | "form_submit_success"
  | "calculator_used"
  | "phone_click";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    umami?: { track: (event: string, data?: Props) => void };
  }
}

export function track(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === "undefined") return;
  try {
    if (window.plausible) window.plausible(event, props ? { props } : undefined);
    else if (window.umami) window.umami.track(event, props);
  } catch {
    // Analytics must never break the page.
  }
}
