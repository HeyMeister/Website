import { home } from "@/content/home";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { Section } from "@/components/ui/layout";

/** The core promise (like an insurance) and before/after as a table (desktop) or stacked pairs (mobile). */
export function Compare() {
  const c = home.compare;
  return (
    <Section id="vergleich" layout="row" title={c.title} intro={c.lead}>
      <div className="hidden overflow-hidden rounded-card border border-line md:block">
        <table className="w-full text-left">
          <caption className="sr-only">{c.title}</caption>
          <thead className="border-b border-line bg-surface-2">
            <tr className="label text-ink">
              <th scope="col" className="w-[22%] px-6 py-3 font-semibold">{c.columns.topic}</th>
              <th scope="col" className="w-[39%] px-6 py-3 font-semibold">{c.columns.without}</th>
              <th scope="col" className="bg-base px-6 py-3 font-semibold text-white">{c.columns.with}</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => (
              <tr key={r.topic} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-6 py-4 font-semibold text-ink">{r.topic}</th>
                <td className="px-6 py-4 text-ink-muted">
                  <span className="flex items-start gap-2.5">
                    <CloseIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
                    {r.without}
                  </span>
                </td>
                <td className="bg-surface-raised px-6 py-4 font-semibold text-ink">
                  <span className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" strokeWidth={3} />
                    {r.with}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="border-t border-line md:hidden">
        {c.rows.map((r) => (
          <li key={r.topic} className="border-b border-line py-5">
            <p className="font-semibold text-ink">{r.topic}</p>
            <p className="mt-3 flex items-start gap-2.5 text-ink-muted">
              <CloseIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <span className="sr-only">{c.columns.without}: </span>
                {r.without}
              </span>
            </p>
            <p className="mt-2 flex items-start gap-2.5 font-semibold text-ink">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" strokeWidth={3} />
              <span>
                <span className="sr-only">{c.columns.with}: </span>
                {r.with}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
