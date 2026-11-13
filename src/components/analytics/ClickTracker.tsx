"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated listener instead of client components everywhere:
 * - elements with data-track="<event>" send that event
 * - every tel: link sends phone_click
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-track], a[href^='tel:']");
      if (!el) return;
      const event = el.dataset.track as AnalyticsEvent | undefined;
      if (event) track(event);
      if (el instanceof HTMLAnchorElement && el.href.startsWith("tel:")) track("phone_click");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
