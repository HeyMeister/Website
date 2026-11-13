import { home } from "@/content/home";

export function DefectClasses() {
  const { defects } = home;
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-ink">{defects.title}</h3>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {defects.items.map((d) => (
          <li key={d.label} className="rounded-card border border-line bg-surface-raised p-6">
            <span className="inline-block rounded-md bg-base px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              {d.label}
            </span>
            <p className="mt-4 font-semibold text-ink">{d.title}</p>
            {"example" in d && d.example ? <p className="text-sm text-ink-muted">{d.example}</p> : null}
            <p className="mt-3 text-ink">{d.resolution}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-prose text-sm text-ink-muted">{defects.note}</p>
    </div>
  );
}
