import { home, type LogbookStatus } from "@/content/home";
import { formatDate } from "@/lib/format";
import { FileIcon } from "@/components/icons";

/** Status as a pill with a word, never colour alone (brandbook). */
const statusStyle: Record<LogbookStatus, string> = {
  ok: "bg-success-soft text-success",
  due: "bg-warning-soft text-warning",
  overdue: "bg-danger-soft text-danger",
};

/**
 * Simplified mockup of the digital logbook, built in HTML (not a screenshot).
 * Brandbook table style: head in surface-2 with labels, numbers right-aligned in mono,
 * status as pill with a word. Example data from content/home.ts, clearly labelled.
 */
export function LogbookMockup({ className = "" }: { className?: string }) {
  const data = home.logbookExample;
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
        <div className="flex items-start justify-between gap-4 px-4 py-5 sm:px-5">
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
            {data.sites.map((s) => (
              <tr key={s.name} className="border-b border-line last:border-b-0">
                <td className="py-3.5 pl-4 pr-2">
                  <span className="block text-body text-ink">{s.name}</span>
                  {/* Compact meta line: mobile shows devices and date, lg (narrow column) only devices. */}
                  <span className="block font-mono text-data text-ink-muted sm:hidden lg:block xl:hidden">
                    {s.devices} Geräte<span className="sm:hidden"> · {formatDate(s.nextCheck)}</span>
                  </span>
                </td>
                <td className="hidden px-2 py-3.5 text-right font-mono text-data text-ink sm:table-cell lg:hidden xl:table-cell">{s.devices}</td>
                <td className="hidden px-2 py-3.5 font-mono text-data text-ink sm:table-cell">{formatDate(s.nextCheck)}</td>
                <td className="py-3.5 pl-2 pr-4 text-right sm:text-left">
                  <span className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-[0.8125rem] font-semibold leading-4 ${statusStyle[s.status]}`}>
                    {s.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center gap-3 border-t border-line px-4 py-4 sm:px-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-base text-white">
            <FileIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-small font-semibold text-ink">{data.report.name}</p>
            <p className="font-mono text-[0.75rem] leading-4 text-ink-muted">{data.report.meta}</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-small text-ink-muted">
        Beispielansicht des digitalen Betriebsbuchs. Namen und Daten sind erfunden.
      </figcaption>
    </figure>
  );
}
