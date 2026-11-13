import { home } from "@/content/home";
import { CheckIcon } from "@/components/icons";

export function IncludedList() {
  return (
    <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      {home.included.items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base text-accent">
            <CheckIcon className="h-4 w-4" strokeWidth={2.6} />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-ink-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
