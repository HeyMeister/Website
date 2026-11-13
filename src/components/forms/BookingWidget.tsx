"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

/**
 * Two-click solution: the third-party booking iframe (e.g. Cal.com) is only loaded after
 * an explicit click, so no data flows to the provider without the visitor's action.
 */
export function BookingWidget({ url, duration }: { url: string | null; duration: string }) {
  const [loaded, setLoaded] = useState(false);

  // No booking provider yet: show nothing on the public site rather than a placeholder.
  if (!url) return null;

  let host = url;
  try {
    host = new URL(url).hostname;
  } catch {
    /* keep raw */
  }

  if (loaded) {
    return (
      <iframe
        src={url}
        title="Erstgespräch buchen"
        className="h-[640px] w-full rounded-card border border-line bg-surface-raised"
        loading="lazy"
      />
    );
  }

  return (
    <div className="rounded-card border border-line bg-surface-raised p-5">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <CalendarIcon className="h-5 w-5 text-accent" /> Erstgespräch buchen ({duration})
      </p>
      <p className="mt-2 text-small text-ink-muted">
        Der Kalender wird von {host} bereitgestellt. Erst wenn Sie ihn laden, werden Daten (z. B. Ihre IP-Adresse) an diesen
        Anbieter übertragen.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            track("cta_call_click", { via: "embed" });
          }}
          className={buttonClass("secondary", "md")}
        >
          Kalender laden
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer" data-track="cta_call_click" className={buttonClass("secondary", "md")}>
          In neuem Tab öffnen<span className="sr-only"> (öffnet externe Seite)</span>
        </a>
      </div>
    </div>
  );
}
