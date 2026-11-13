import { home } from "@/content/home";
import { Section } from "@/components/ui/layout";

export function Steps() {
  const { steps } = home;
  return (
    <Section id="ablauf" eyebrow={steps.eyebrow} title={steps.title}>
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.items.map((step, i) => (
          <li key={step.title} className="border-t-2 border-base pt-6">
            <span className="font-mono text-data text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-subheading text-ink">{step.title}</h3>
            <p className="mt-2 text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
