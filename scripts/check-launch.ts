/**
 * Pre-build launch guard (runs automatically before `next build`).
 *
 * - PUBLIC_LAUNCH=true and placeholders in content/legal.ts  -> build fails.
 * - PUBLIC_LAUNCH=true and placeholders in other content      -> warning (see launch checklist).
 * - PUBLIC_LAUNCH not true                                     -> summary only.
 */
import * as legal from "../content/legal";
import { site } from "../content/site";
import { pricing } from "../content/pricing";
import { faq } from "../content/faq";
import { publishedTeam } from "../content/team";
import { findPlaceholders } from "../src/lib/placeholders";

export function checkLaunch(env: Record<string, string | undefined> = process.env): { ok: boolean; messages: string[] } {
  const launched = env.PUBLIC_LAUNCH === "true";
  const legalHits = findPlaceholders(legal);
  const otherHits = [
    ...findPlaceholders(site, "site"),
    ...findPlaceholders(pricing, "pricing"),
    ...findPlaceholders(faq, "faq"),
    ...findPlaceholders(publishedTeam, "team"),
  ];
  const messages: string[] = [];

  if (!launched) {
    messages.push(
      `[launch-check] PUBLIC_LAUNCH is not "true": site stays noindex. ${legalHits.length} placeholder(s) in legal.ts, ${otherHits.length} elsewhere.`,
    );
    return { ok: true, messages };
  }

  if (otherHits.length) {
    messages.push(`[launch-check] WARNING: ${otherHits.length} placeholder(s) outside legal.ts:`);
    for (const h of otherHits) messages.push(`  - ${h.path}: ${h.match}`);
  }
  if (legalHits.length) {
    messages.push(`[launch-check] FAILED: PUBLIC_LAUNCH=true but content/legal.ts still contains placeholders:`);
    for (const h of legalHits) messages.push(`  - ${h.path}: ${h.match}`);
    return { ok: false, messages };
  }
  messages.push("[launch-check] OK: no placeholders in legal content.");
  return { ok: true, messages };
}

// Run when executed directly (not when imported by tests).
if (process.argv[1] && /check-launch\.ts$/.test(process.argv[1])) {
  const { ok, messages } = checkLaunch();
  for (const m of messages) (ok ? console.log : console.error)(m);
  if (!ok) process.exit(1);
}
