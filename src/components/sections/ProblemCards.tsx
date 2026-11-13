import { home } from "@/content/home";
import { Section, cardClass } from "@/components/ui/layout";

export function ProblemCards() {
  const { problem } = home;
  return (
    <Section id="problem" tone="muted" eyebrow={problem.eyebrow} title={problem.title}>
      <ul className="grid gap-6 md:grid-cols-3">
        {problem.items.map((item) => (
          <li key={item.title} className={cardClass}>
            <h3 className="text-subheading text-ink">{item.title}</h3>
            <p className="mt-3 text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
