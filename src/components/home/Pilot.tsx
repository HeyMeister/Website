import { home } from "@/content/home";
import { site } from "@/content/site";
import { hasPlaceholder } from "@/lib/placeholders";
import { contactHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/**
 * Pilot programme (Floy: "Become a partner"). The picture is type: the pilot period set very
 * large. Conditions in site.ts that are still [PLACEHOLDERS] are not shown on the public page;
 * until one is decided, one honest line stands in their place.
 */
export function Pilot() {
  const { pilot } = site;
  const t = home.pilot;
  const conditions = pilot.conditions.filter((c) => !hasPlaceholder(c));
  return (
    <section
      id="pilot"
      aria-labelledby="pilot-heading"
      className="bg-surface-2 pb-16 pt-24 sm:pb-20 lg:min-h-[100svh] lg:pb-24 lg:pt-[7.5rem]"
    >
      <Container className="grid gap-10 lg:min-h-[calc(100svh-13.5rem)] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow tone="muted">{t.eyebrow}</Eyebrow>
          <h2 id="pilot-heading" className={sectionHeadingClass}>
            {pilot.headline}: {pilot.period}.
          </h2>
          <p className="mt-4 max-w-prose text-subheading text-ink-muted">
            {pilot.seats} {pilot.region}. {pilot.intro}
          </p>
          {conditions.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {conditions.map((c) => (
                <li key={c} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2.6} />
                  <span className="text-ink">{c}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-prose font-semibold text-ink">{t.conditionsPending}</p>
          )}
          <LinkButton href={contactHref("pilot")} variant="secondary" track="cta_pilot_click" trackLocation="pilot" arrow className="mt-8">
            {t.cta}
          </LinkButton>
        </div>
        <p
          aria-hidden="true"
          className="self-start whitespace-nowrap lg:pt-2 font-display font-bold leading-[0.9] tracking-[-0.04em] text-ink lg:col-span-6 lg:text-right"
        >
          <span className="block text-[5rem] sm:text-[8rem] xl:text-[8.75rem]">{t.dates.months}</span>
          <span className="block text-[5rem] text-accent sm:text-[8rem] xl:text-[8.75rem]">{t.dates.year}</span>
        </p>
      </Container>
    </section>
  );
}
