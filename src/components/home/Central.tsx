import { home } from "@/content/home";
import { CheckIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";
import { SiteOverviewScreen } from "@/components/sections/LogbookMockup";

/** Benefits for the head office beside the example site overview. */
export function Central() {
  const c = home.central;
  return (
    <Section id="zentrale" tone="muted" eyebrow={c.eyebrow} title={c.title}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ul className="min-w-0 space-y-6 lg:col-span-5">
          {c.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={2.6} />
              <span>
                <span className="block font-display text-subheading font-bold text-ink">{item.title}</span>
                <span className="mt-1 block text-ink-muted">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="min-w-0 lg:col-span-7">
          <SiteOverviewScreen />
        </div>
      </div>
    </Section>
  );
}
