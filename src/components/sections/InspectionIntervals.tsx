import { home } from "@/content/home";
import { Section } from "@/components/ui/layout";

/**
 * Inspection overview in the brandbook table style. Intervals are indicative values and are
 * always shown with the risk-assessment disclaimer. Desktop: table; mobile: stacked cards.
 */
export function InspectionIntervals({ tone = "muted" }: { tone?: "light" | "muted" }) {
  const t = home.intervals;
  return (
    <Section id="fristen" tone={tone} layout="row" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-card border border-line md:block">
        <table className="w-full text-left">
          <caption className="sr-only">{t.title}</caption>
          <thead className="border-b border-line bg-surface-2">
            <tr className="label text-ink">
              <th scope="col" className="w-[30%] px-6 py-3 font-semibold">{t.columns.item}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t.columns.norm}</th>
              <th scope="col" className="w-[24%] px-4 py-3 font-semibold">{t.columns.interval}</th>
              <th scope="col" className="w-[26%] px-6 py-3 font-semibold">{t.columns.who}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r.item} className="border-b border-line align-top last:border-b-0">
                <th scope="row" className="px-6 py-4 font-normal">
                  <span className="block font-semibold text-ink">{r.item}</span>
                  <span className="mt-1 block text-small text-ink-muted">{r.examples}</span>
                </th>
                <td className="whitespace-nowrap px-4 py-4 font-mono text-data text-ink">{r.norm}</td>
                <td className="px-4 py-4">
                  <span className="block font-semibold text-ink">{r.interval}</span>
                  {r.intervalNote && <span className="mt-1 block text-small text-ink-muted">{r.intervalNote}</span>}
                </td>
                <td className="px-6 py-4 text-small text-ink">{r.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="space-y-4 md:hidden">
        {t.rows.map((r) => (
          <li key={r.item} className="rounded-card border border-line bg-surface-raised p-6">
            <p className="font-display text-subheading font-bold text-ink">{r.item}</p>
            <p className="mt-1 text-small text-ink-muted">{r.examples}</p>
            <dl className="mt-4 space-y-3 border-t border-line pt-4 text-small">
              <div>
                <dt className="label text-ink-muted">{t.columns.norm}</dt>
                <dd className="mt-1 font-mono text-data text-ink">{r.norm}</dd>
              </div>
              <div>
                <dt className="label text-ink-muted">{t.columns.interval}</dt>
                <dd className="mt-1 text-ink">
                  <span className="font-semibold">{r.interval}</span>
                  {r.intervalNote && <span className="block text-ink-muted">{r.intervalNote}</span>}
                </dd>
              </div>
              <div>
                <dt className="label text-ink-muted">{t.columns.who}</dt>
                <dd className="mt-1 text-ink">{r.who}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-prose border-l-2 border-accent pl-4 text-small text-ink-muted">{t.disclaimer}</p>

    </Section>
  );
}
