import { site } from "@/content/site";
import { contactHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/layout";

export function PilotOffer({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const { pilot } = site;
  return (
    <Section id="pilot" tone="muted" eyebrow="Pilotprogramm" headingLevel={headingLevel}
      title={`${pilot.headline}: ${pilot.period}`}
      intro={`${pilot.seats} ${pilot.region}. ${pilot.intro}`}
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="rounded-card border border-line bg-surface-raised p-6 sm:p-8 lg:col-span-8">
          <h3 className="text-lg font-semibold text-ink">Konditionen für Pilotkunden</h3>
          <ul className="mt-4 space-y-3">
            {pilot.conditions.map((c) => (
              <li key={c} className="flex gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} />
                <span className="text-ink">
                  <Fill text={c} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-3 lg:col-span-4">
          <LinkButton href={contactHref("pilot")} track="cta_pilot_click">
            Pilotkunde werden
          </LinkButton>
          <p className="text-sm text-ink-muted">Unverbindlich. Wir melden uns {site.contact.responseTime}.</p>
        </div>
      </div>
    </Section>
  );
}
