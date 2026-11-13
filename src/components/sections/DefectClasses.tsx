import { home } from "@/content/home";
import { cardClass } from "@/components/ui/layout";

/** Defect classes are always explained where they first appear (brandbook). */
export function DefectClasses() {
  const { defects } = home;
  return (
    <div>
      <h3 className="text-heading text-ink">{defects.title}</h3>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {defects.items.map((d) => (
          <li key={d.label} className={cardClass}>
            <span className="label text-accent-dark">{d.label}</span>
            <p className="mt-3 font-display text-subheading font-bold text-ink">{d.title}</p>
            {"example" in d && d.example ? <p className="mt-1 text-small text-ink-muted">{d.example}</p> : null}
            <p className="mt-4 border-t border-line pt-4 text-ink">{d.resolution}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-prose text-small text-ink-muted">{defects.note}</p>
    </div>
  );
}
