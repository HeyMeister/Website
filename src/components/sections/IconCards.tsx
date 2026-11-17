import { CalendarIcon, EuroIcon, FileIcon, ListIcon, PeopleIcon, PersonIcon, ShieldIcon, WrenchIcon } from "@/components/icons";

export const cardIcons = {
  file: FileIcon,
  people: PeopleIcon,
  list: ListIcon,
  calendar: CalendarIcon,
  euro: EuroIcon,
  shield: ShieldIcon,
  person: PersonIcon,
  tool: WrenchIcon,
} as const;

export type CardIcon = keyof typeof cardIcons;

/** Cards with an icon, a title and a text, in two or three columns. */
export function IconCards({
  items,
  columns = 2,
  tone = "light",
}: {
  items: ReadonlyArray<{ icon?: string; title: string; text: string }>;
  columns?: 2 | 3;
  tone?: "light" | "muted";
}) {
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`grid gap-6 ${grid}`}>
      {items.map((item) => {
        const Icon = item.icon && item.icon in cardIcons ? cardIcons[item.icon as CardIcon] : null;
        return (
          <li key={item.title} className="flex min-w-0 flex-col gap-4 rounded-card border border-line bg-surface-raised p-6">
            {Icon && (
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-ink ${tone === "muted" ? "bg-accent-light" : "bg-surface-2"}`}>
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span>
              <span className="block font-display text-subheading font-bold text-ink">{item.title}</span>
              <span className="mt-1.5 block text-ink-muted">{item.text}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
