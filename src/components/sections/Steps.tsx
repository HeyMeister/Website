import { home } from "@/content/home";
import { Section } from "@/components/ui/layout";

export function Steps() {
  const { steps } = home;
  return (
    <Section id="ablauf" eyebrow={steps.eyebrow} title={steps.title}>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.items.map((step, i) => (
          <li key={step.title} className="relative border-t-2 border-base pt-6">
            <span className="text-sm font-semibold tabular-nums text-accent-strong">
              Schritt {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
