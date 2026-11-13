import { home, type LogbookStatus } from "@/content/home";
import { formatDate } from "@/lib/format";
import { CheckIcon, FileIcon } from "@/components/icons";
import { LogoIcon } from "@/components/brand/Logo";

/** Status as a pill with a word, never colour alone (brandbook). */
const statusStyle: Record<LogbookStatus, string> = {
  ok: "bg-success-soft text-success",
  due: "bg-warning-soft text-warning",
  overdue: "bg-danger-soft text-danger",
};

const pillClass = "inline-block whitespace-nowrap rounded-full px-2 py-1 text-[0.8125rem] font-semibold leading-4";

/** Small app bar so the mockups read as screens of one product. */
function ScreenBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
      <LogoIcon variant="navy" className="h-4 w-4" title={null} />
      <span className="text-[0.75rem] font-semibold leading-4 text-ink">{label}</span>
      <span aria-hidden="true" className="ml-auto flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
      </span>
    </div>
  );
}

/**
 * Main screen: simplified digital logbook, built in HTML (not a screenshot).
 * Brandbook table style: head in surface-2 with labels, numbers in mono, status as pill with a word.
 *
 * With `animated`, one row (content: logbookExample.animated) switches from "due" to "checked".
 * The animated pill is aria-hidden; screen readers and reduced-motion users get the static data.
 */
export function LogbookScreen({ animated = false }: { animated?: boolean }) {
  const data = home.logbookExample;
  const anim = data.animated;
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <ScreenBar label="Betriebsbuch" />
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
        <div>
          <p className="font-display text-body font-bold text-ink sm:text-subheading">{data.title}</p>
          <p className="text-small text-ink-muted">
            {data.company} · {data.summary}
          </p>
        </div>
        <span className="label rounded-full border border-dashed border-line-strong px-2.5 py-1 text-ink-muted">Beispieldaten</span>
      </div>

      <table className="w-full text-left text-small">
        <caption className="sr-only">Beispiel: Standorte mit Anzahl Geräte, nächster Prüfung und Fristenstatus</caption>
        <thead className="border-y border-line bg-surface-2">
          <tr className="label whitespace-nowrap text-ink">
            <th scope="col" className="py-3 pl-4 pr-2 font-semibold">Standort</th>
            <th scope="col" className="hidden px-2 py-3 text-right font-semibold sm:table-cell lg:hidden xl:table-cell">Geräte</th>
            <th scope="col" className="hidden px-2 py-3 font-semibold sm:table-cell">Nächste Prüfung</th>
            <th scope="col" className="py-3 pl-2 pr-4 text-right font-semibold sm:text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.sites.map((s) => {
            const isAnimated = animated && s.name === anim.site;
            return (
              <tr key={s.name} className={`border-b border-line last:border-b-0 ${isAnimated ? "motion-safe:animate-hm-row-scan" : ""}`}>
                <td className="py-3 pl-4 pr-2">
                  <span className="block text-body text-ink">{s.name}</span>
                  {/* Compact meta line: mobile shows devices and date, lg (narrow column) only devices. */}
                  <span className="block font-mono text-data text-ink-muted sm:hidden lg:block xl:hidden">
                    {s.devices} Geräte<span className="sm:hidden"> · {formatDate(s.nextCheck)}</span>
                  </span>
                </td>
                <td className="hidden px-2 py-3 text-right font-mono text-data text-ink sm:table-cell lg:hidden xl:table-cell">{s.devices}</td>
                <td className="hidden px-2 py-3 font-mono text-data text-ink sm:table-cell">{formatDate(s.nextCheck)}</td>
                <td className="py-3 pl-2 pr-4 text-right sm:text-left">
                  {isAnimated ? (
                    // Both pills share one grid cell, so the cell keeps the width of the wider one.
                    <span className="inline-grid">
                      <span className={`${pillClass} ${statusStyle[s.status]} [grid-area:1/1] motion-safe:animate-hm-status-old`}>
                        {s.statusLabel}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${pillClass} ${statusStyle[anim.to.status]} inline-flex items-center gap-1 justify-self-end opacity-0 [grid-area:1/1] motion-safe:animate-hm-status-new sm:justify-self-start`}
                      >
                        <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                        {anim.to.statusLabel}
                      </span>
                    </span>
                  ) : (
                    <span className={`${pillClass} ${statusStyle[s.status]}`}>{s.statusLabel}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center gap-3 border-t border-line px-4 py-3.5 sm:px-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-base text-white">
          <FileIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-small font-semibold text-ink">{data.report.name}</p>
          <p className="font-mono text-[0.75rem] leading-4 text-ink-muted">{data.report.meta}</p>
        </div>
      </div>
    </div>
  );
}

/** Back screen: first page of a report as a PDF preview. Decorative. */
export function ReportScreen() {
  const r = home.logbookExample.reportPreview;
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <ScreenBar label="Prüfbericht.pdf" />
      <div className="px-4 py-4">
        <p className="font-display text-small font-bold text-ink">{r.title}</p>
        <p className="font-mono text-[0.75rem] leading-4 text-ink-muted">{r.meta}</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {r.rows.map((row) => (
            <li key={row.item} className="flex items-center justify-between gap-3 py-2 text-[0.75rem] leading-4">
              <span className="truncate text-ink">{row.item}</span>
              <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-success">
                <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                {row.result}
              </span>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-3 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-surface-2" />
          <span className="block h-1.5 w-4/5 rounded-full bg-surface-2" />
        </div>
      </div>
    </div>
  );
}

/** Back screen: yearly inspection plan with marked months. Decorative. */
export function PlanScreen() {
  const p = home.logbookExample.plan;
  const marked = new Set<string>(p.marked);
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <ScreenBar label="Prüfplan" />
      <div className="px-4 py-4">
        <p className="font-display text-small font-bold text-ink">{p.title}</p>
        <p className="font-mono text-[0.75rem] leading-4 text-ink-muted">{p.meta}</p>
        <ul className="mt-3 grid grid-cols-4 gap-1.5">
          {p.months.map((m) => (
            <li
              key={m}
              className={`rounded-md px-1.5 py-2 text-center text-[0.6875rem] font-semibold leading-3 ${
                marked.has(m) ? "bg-base text-white" : "bg-surface-2 text-ink-muted"
              }`}
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
