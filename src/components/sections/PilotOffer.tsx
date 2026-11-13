import { site } from "@/content/site";
import { contactHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Placeholder";
import { Section, cardClass } from "@/components/ui/layout";

export function PilotOffer({ headingLevel = 2, tone = "light" }: { headingLevel?: 1 | 2; tone?: "light" | "muted" }) {
  const { pilot } = site;
  return (
    <Section
      id="pilot"
      tone={tone}
      eyebrow="Pilotprogramm"
      headingLevel={headingLevel}
      title={`${pilot.headline}: ${pilot.period}`}
      intro={`${pilot.seats} ${pilot.region}. ${pilot.intro}`}
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className={`${cardClass} lg:col-span-8`}>
          <h3 className="text-subheading text-ink">Konditionen für Pilotkunden</h3>
          <ul className="mt-4 space-y-3">
            {pilot.conditions.map((c) => (
              <li key={c} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2.6} />
                <span className="text-ink">
                  <Fill text={c} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-3 lg:col-span-4">
          <LinkButton href={contactHref("pilot")} track="cta_pilot_click" trackLocation="pilot" arrow>
            Pilotplatz anfragen
          </LinkButton>
          <p className="text-small text-ink-muted">Unverbindlich. Wir melden uns {site.contact.responseTime}.</p>
        </div>
      </div>
    </Section>
  );
}
