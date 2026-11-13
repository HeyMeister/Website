import { home } from "@/content/home";
import { Section } from "@/components/ui/layout";
import { LogbookScreen } from "@/components/sections/LogbookMockup";

/**
 * Before / after (Floy's "regular report vs. report with Floy"): the spreadsheet most
 * businesses keep today next to the logbook. Labels sit above each panel, never under.
 */
export function BeforeAfter() {
  const b = home.beforeAfter;
  return (
    <Section id="betriebsbuch" layout="row" eyebrow={b.eyebrow} title={b.title} intro={b.lead}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="label mb-3 text-ink-muted">{b.before.label}</p>
          <Spreadsheet />
        </div>
        <div>
          <p className="label mb-3 text-accent-dark">{b.after.label}</p>
          <LogbookScreen />
        </div>
      </div>
    </Section>
  );
}

/** A plain spreadsheet with gaps: neutral greys, no alarm colours (no fear). */
function Spreadsheet() {
  const s = home.beforeAfter.before;
  const cols = ["Standort", "Letzte Prüfung", "Nächste", "Notiz"];
  return (
    <div data-ui className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span aria-hidden="true" className="h-4 w-4 rounded-[3px] bg-line-strong" />
        <span className="font-mono text-[0.75rem] leading-4 text-ink-muted">{s.title}</span>
      </div>
      <table className="w-full table-fixed text-left font-mono text-data">
        <caption className="sr-only">Beispiel einer Tabelle mit Prüffristen und Lücken</caption>
        <thead>
          <tr className="border-b border-line bg-surface-2 text-ink-muted">
            <th scope="col" className="w-8 border-r border-line py-1.5 text-center font-normal">
              <span className="sr-only">Zeile</span>
            </th>
            {cols.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`border-r border-line px-2 py-1.5 font-normal last:border-r-0 ${i === 3 ? "hidden sm:table-cell" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-ink">
          {s.rows.map((r, i) => (
            <tr key={r.site} className="border-b border-line">
              <td className="border-r border-line bg-surface-2 py-3 text-center text-ink-muted">{i + 2}</td>
              <td className="truncate border-r border-line px-2 py-3">{r.site}</td>
              <td className={`border-r border-line px-2 py-3 ${r.last === "?" ? "text-ink-muted" : ""}`}>{r.last}</td>
              <td className={`border-r border-line px-2 py-3 ${r.next === "?" ? "text-ink-muted" : ""}`}>{r.next}</td>
              <td className="hidden truncate px-2 py-3 text-ink-muted sm:table-cell">{r.note}</td>
            </tr>
          ))}
          {[6, 7].map((n) => (
            <tr key={n} className="border-b border-line last:border-b-0">
              <td className="border-r border-line bg-surface-2 py-3 text-center text-ink-muted">{n}</td>
              <td className="border-r border-line py-3" />
              <td className="border-r border-line py-3" />
              <td className="border-r border-line py-3" />
              <td className="hidden py-3 sm:table-cell" />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-4 py-3 font-mono text-[0.75rem] leading-4 text-ink-muted">{s.footnote}</p>
    </div>
  );
}
