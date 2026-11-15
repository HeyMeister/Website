import { home } from "@/content/home";
import { BoltIcon, FileIcon, PersonIcon, PlugIcon, ThermometerIcon, WrenchIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";
import { LogbookScreen } from "@/components/sections/LogbookMockup";

const icons = { plug: PlugIcon, bolt: BoltIcon, wrench: WrenchIcon, thermo: ThermometerIcon, file: FileIcon, person: PersonIcon } as const;

/** Six services with icons, the digital Anlagenakte beside them as the section's picture. */
export function Services() {
  const s = home.services;
  return (
    <Section id="leistungen" tone="muted" layout="row" eyebrow={s.eyebrow} title={s.title} intro={s.lead}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7">
          {s.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-base text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-body font-bold text-ink">{item.title}</span>
                  <span className="mt-1 block text-small text-ink-muted">{item.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="lg:col-span-5">
          <LogbookScreen />
        </div>
      </div>
    </Section>
  );
}
