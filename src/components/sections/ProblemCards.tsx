import { home } from "@/content/home";
import { Section } from "@/components/ui/layout";

export function ProblemCards() {
  const { problem } = home;
  return (
    <Section id="problem" tone="muted" eyebrow={problem.eyebrow} title={problem.title}>
      <ul className="grid gap-6 md:grid-cols-3">
        {problem.items.map((item) => (
          <li key={item.title} className="rounded-card border border-line bg-surface-raised p-6 sm:p-8">
            <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-accent" />
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
