import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/layout";

/** Typical service work, extra services and contract conditions, word for word from the offer. */
export function Conditions() {
  const t = home.conditions;
  return (
    <Section id="konditionen" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div>
          <h3 className="text-subheading text-ink">{t.typicalTitle}</h3>
          <p className="mt-3 text-ink-muted">{pricing.typicalWork}</p>
        </div>
        <div>
          <h3 className="text-subheading text-ink">{t.extrasTitle}</h3>
          <ul className="mt-3 space-y-2.5 text-ink-muted">
            {pricing.extras.map((e) => (
              <li key={e} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <Rich text={e} strongClassName="font-semibold text-ink" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-subheading text-ink">{t.conditionsTitle}</h3>
          <div className="mt-3 space-y-3 text-ink-muted">
            {pricing.conditions.map((c) => (
              <p key={c}>
                <Rich text={c} strongClassName="font-semibold text-ink" />
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
