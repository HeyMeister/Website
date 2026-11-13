import { home } from "@/content/home";
import { CheckIcon } from "@/components/icons";

export function IncludedList() {
  return (
    <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      {home.included.items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={2.6} />
          <div>
            <h3 className="text-subheading text-ink">{item.title}</h3>
            <p className="mt-2 max-w-prose text-ink-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
