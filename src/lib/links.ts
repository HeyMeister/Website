import { hasPlaceholder } from "./placeholders";
import { siteMode, type SiteMode } from "./env";

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

export type Wish = "angebot" | "erstgespraech" | "pilot";

/**
 * Where calls to action point. In validation mode everything lives on the landing page,
 * in full mode on dedicated pages.
 */
export function contactHref(wish?: Wish, mode: SiteMode = siteMode): string {
  const base = mode === "full" ? "/kontakt" : "/";
  return wish ? `${base}?wunsch=${wish}#kontakt` : `${base}#kontakt`;
}

export function pricesHref(mode: SiteMode = siteMode): string {
  return mode === "full" ? "/preise" : "/#preise";
}
