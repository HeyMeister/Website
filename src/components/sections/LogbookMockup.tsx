import { home, type LogbookStatus } from "@/content/home";
import { formatDate } from "@/lib/format";
import { CheckIcon, FileIcon } from "@/components/icons";
import { LogoIcon } from "@/components/brand/Logo";

/**
 * Product screens of the digital logbook, built in HTML (not screenshots), with the
 * fictitious "Beispiel GmbH". Brandbook table style: head in surface-2 with labels, numbers in
 * mono, status as a pill with a word (never colour alone).
 */

const statusStyle: Record<LogbookStatus, string> = {
  ok: "bg-success-soft text-success",
  due: "bg-warning-soft text-warning",
  overdue: "bg-danger-soft text-danger",
};

const pillClass = "inline-block whitespace-nowrap rounded-full px-2 py-1 text-[0.8125rem] font-semibold leading-4";

/** App bar so the screens read as one product. */
export function ScreenBar({ label }: { label: string }) {
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

/** The logbook: every site with its next inspection and status. */
export function LogbookScreen({ className = "" }: { className?: string }) {
  const data = home.logbookExample;
  return (
    <div data-ui className={`overflow-hidden rounded-card border border-line bg-surface-raised ${className}`}>
      <ScreenBar label="Betriebsbuch" />
      <div className="px-4 py-4 sm:px-5">
        <p className="font-display text-body font-bold text-ink sm:text-subheading">{data.title}</p>
        <p className="text-small text-ink-muted">
          {data.company} · {data.summary}
        </p>
      </div>

      <table className="w-full text-left text-small">
        <caption className="sr-only">Beispiel: Standorte mit Anzahl Geräte, nächster Prüfung und Fristenstatus</caption>
        <thead className="border-y border-line bg-surface-2">
          <tr className="label whitespace-nowrap text-ink">
            <th scope="col" className="py-3 pl-4 pr-2 font-semibold sm:pl-5">Standort</th>
            <th scope="col" className="hidden px-2 py-3 text-right font-semibold xl:table-cell">Geräte</th>
            <th scope="col" className="hidden px-2 py-3 font-semibold sm:table-cell">Nächste Prüfung</th>
            <th scope="col" className="py-3 pl-2 pr-4 text-right font-semibold sm:pr-5 sm:text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.sites.map((s) => (
            <tr key={s.name} className="border-b border-line last:border-b-0">
              <td className="py-3 pl-4 pr-2 sm:pl-5">
                <span className="block text-body text-ink">{s.name}</span>
                <span className="block font-mono text-data text-ink-muted sm:hidden">{formatDate(s.nextCheck)}</span>
              </td>
              <td className="hidden px-2 py-3 text-right font-mono text-data text-ink xl:table-cell">{s.devices}</td>
              <td className="hidden px-2 py-3 font-mono text-data text-ink sm:table-cell">{formatDate(s.nextCheck)}</td>
              <td className="py-3 pl-2 pr-4 text-right sm:pr-5 sm:text-left">
                <span className={`${pillClass} ${statusStyle[s.status]}`}>{s.statusLabel}</span>
              </td>
            </tr>
          ))}
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

/** First page of an inspection report, as the PDF reads. */
export function ReportScreen({ className = "" }: { className?: string }) {
  const r = home.logbookExample.reportPreview;
  return (
    <div data-ui className={`overflow-hidden rounded-card border border-line bg-surface-raised ${className}`}>
      <ScreenBar label="Prüfbericht.pdf" />
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-subheading font-bold text-ink">{r.title}</p>
            <p className="font-mono text-data text-ink-muted">{r.meta}</p>
          </div>
          <LogoIcon variant="koralle" className="h-8 w-8 shrink-0" title={null} />
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-1.5 sm:gap-2">
          {r.summary.map((s) => (
            <div key={s.label} className="min-w-0 rounded-control bg-surface-2 px-2 py-2.5 sm:px-3">
              <dt className="truncate text-[0.6875rem] font-semibold uppercase leading-4 tracking-[0.06em] text-ink-muted sm:label">{s.label}</dt>
              <dd className="mt-1 font-mono text-subheading text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <table className="mt-5 w-full text-left text-small">
          <caption className="sr-only">Beispiel: geprüfte Geräte mit Ergebnis</caption>
          <thead className="border-y border-line">
            <tr className="label text-ink-muted">
              <th scope="col" className="py-2 pr-2 font-semibold">Gerät</th>
              <th scope="col" className="hidden py-2 pr-2 font-semibold sm:table-cell">Nr.</th>
              <th scope="col" className="py-2 text-right font-semibold">Ergebnis</th>
            </tr>
          </thead>
          <tbody>
            {r.rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-b-0">
                <td className="py-2.5 pr-2 text-ink">{row.item}</td>
                <td className="hidden py-2.5 pr-2 font-mono text-data text-ink-muted sm:table-cell">{row.id}</td>
                <td className="py-2.5 text-right">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-success">
                    <CheckIcon className="h-4 w-4" strokeWidth={2.8} />
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 font-mono text-data text-ink-muted">{r.next}</p>
      </div>
    </div>
  );
}
