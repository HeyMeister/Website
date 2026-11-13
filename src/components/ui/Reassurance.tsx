import { home } from "@/content/home";
import { site } from "@/content/site";
import { CheckIcon } from "@/components/icons";

/** Short risk reducers under a primary button. Only facts, no pressure. */
export function Reassurance({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const items = [...home.cta.reassurance, `Antwort ${site.contact.responseTime}`];
  const text = tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted";
  const icon = tone === "dark" ? "text-accent-light" : "text-accent";
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-small ${text} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5">
          <CheckIcon className={`h-4 w-4 shrink-0 ${icon}`} strokeWidth={2.6} />
          {item}
        </li>
      ))}
    </ul>
  );
}
