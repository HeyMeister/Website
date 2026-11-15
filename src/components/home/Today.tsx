import { home } from "@/content/home";
import { CalendarIcon, FileIcon, ListIcon, PeopleIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";

const icons = { file: FileIcon, people: PeopleIcon, list: ListIcon, calendar: CalendarIcon } as const;

/** Today's effort, matter-of-fact: four situations head offices know. */
export function Today() {
  const t = home.today;
  return (
    <Section id="heute" layout="row" eyebrow={t.eyebrow} title={t.title} intro={t.lead}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {t.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="flex gap-5 rounded-card border border-line bg-surface-raised p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-surface-2 text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-subheading font-bold text-ink">{item.title}</span>
                <span className="mt-1.5 block text-ink-muted">{item.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
