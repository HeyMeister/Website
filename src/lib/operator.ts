import { operator } from "@/content/legal";
import { site } from "@/content/site";
import { hasPlaceholder } from "@/lib/placeholders";

/**
 * Operator details for Impressum, Datenschutz and footer. Values that are still
 * [PLACEHOLDERS] are left out instead of being shown; the launch check
 * (scripts/check-launch.ts) keeps the site from going public until they are filled in.
 */
export function known(value: string | null | undefined): string | null {
  return value && !hasPlaceholder(value) ? value : null;
}

/** Company with legal form once known, otherwise the brand name. */
export function operatorName(): string {
  const company = known(operator.company);
  return company ? `${company} ${operator.legalForm}` : site.name;
}

/** Street and "PLZ Ort", or null while any part is missing. */
export function operatorAddress(): { street: string; cityLine: string } | null {
  const street = known(operator.street);
  const zip = known(operator.zip);
  const city = known(operator.city);
  return street && zip && city ? { street, cityLine: `${zip} ${city}` } : null;
}
