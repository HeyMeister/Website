import { cta } from "@/content/home";
import { bookingUrl } from "@/lib/env";
import { callHref, contactHref, type Wish } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";

/**
 * The two actions every page offers: primary "Kostenlosen Standort-Check anfordern", secondary
 * "15-Minuten-Gespräch buchen" (booking tool if configured, else the form), plus the micro line.
 */
export function Actions({
  location,
  primaryHref = contactHref("check"),
  primaryLabel = cta.primary,
  primaryWish = "check",
  onDark = false,
  micro = true,
  className = "",
}: {
  location: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryWish?: Wish;
  onDark?: boolean;
  micro?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <LinkButton href={primaryHref} track={primaryWish === "pilot" ? "cta_pilot_click" : "cta_check_click"} trackLocation={location} arrow>
          {primaryLabel}
        </LinkButton>
        <LinkButton href={callHref(bookingUrl)} variant={onDark ? "inverse" : "secondary"} track="cta_call_click" trackLocation={location}>
          {cta.secondary}
        </LinkButton>
      </div>
      {micro && <p className={`mt-4 text-small ${onDark ? "text-ink-inverse-muted" : "text-ink-muted"}`}>{cta.micro}</p>}
    </div>
  );
}
