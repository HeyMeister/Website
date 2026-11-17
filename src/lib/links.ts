import { hasPlaceholder } from "./placeholders";

/** Converts a display number like "+49 211 123456-0" into a tel: href, or null for placeholders. */
export function telHref(phone: string): string | null {
  if (hasPlaceholder(phone)) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 6 ? `tel:${digits}` : null;
}

export function mailHref(email: string): string | null {
  if (hasPlaceholder(email) || !email.includes("@")) return null;
  return `mailto:${email}`;
}

export type Wish = "check" | "erstgespraech" | "pilot" | "angebot";

/** The contact page with the form. Every page's calls to action point here, except the homepage's own form. */
export function contactHref(wish?: Wish): string {
  return wish ? `/kontakt?wunsch=${wish}` : "/kontakt";
}

/** The form at the end of the homepage (used by homepage sections only). */
export function homeFormHref(wish: Wish = "check"): string {
  return `/?wunsch=${wish}#kontakt`;
}

/** Secondary action "15-Minuten-Gespräch buchen": the booking tool if configured, else the form. */
export function callHref(bookingUrl: string | null): string {
  return bookingUrl ?? contactHref("erstgespraech");
}
