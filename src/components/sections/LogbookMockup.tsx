import { home, type LogbookStatus } from "@/content/home";
import { formatDate } from "@/lib/format";
import { FileIcon } from "@/components/icons";

const statusStyle: Record<LogbookStatus, { dot: string; text: string; bg: string }> = {
  ok: { dot: "bg-success", text: "text-success", bg: "bg-success-soft" },
  due: { dot: "bg-warning", text: "text-warning", bg: "bg-warning-soft" },
  overdue: { dot: "bg-danger", text: "text-danger", bg: "bg-danger-soft" },
};

/**
 * Simplified mockup of the digital logbook, built in HTML (not a screenshot).
 * Uses example data from content/home.ts and is clearly labelled as such.
 */
export function LogbookMockup({ className = "" }: { className?: string }) {
  const data = home.logbookExample;
  return (
    <figure className={`relative ${className}`}>
      <div className="rounded-2xl border border-line bg-surface-raised shadow-[0_1px_2px_rgba(20,33,61,0.06),0_12px_32px_-12px_rgba(20,33,61,0.18)]">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-ink">{data.title}</p>
            <p className="text-xs text-ink-muted">
              {data.company} · {data.summary}
            </p>
          </div>
          <span className="rounded-full border border-dashed border-line-strong px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Beispieldaten
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <caption className="sr-only">Beispiel: Standorte mit nächster Prüfung und Fristenstatus</caption>
          <thead>
            <tr className="text-xs text-ink-muted">
              <th scope="col" className="px-5 py-2 font-medium">Standort</th>
              <th scope="col" className="hidden px-2 py-2 font-medium sm:table-cell">Nächste Prüfung</th>
              <th scope="col" className="px-5 py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.sites.map((s) => {
              const st = statusStyle[s.status];
              return (
                <tr key={s.name} className="border-t border-line">
                  <td className="px-5 py-3">
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="block text-xs text-ink-muted">
                      {s.type}
                      <span className="sm:hidden"> · {formatDate(s.nextCheck)}</span>
                    </span>
                  </td>
                  <td className="hidden px-2 py-3 tabular-nums text-ink sm:table-cell">{formatDate(s.nextCheck)}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${st.bg} ${st.text}`}>
                      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${st.dot}`} />
                      {s.statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center gap-3 border-t border-line bg-surface-muted/60 px-5 py-4 rounded-b-2xl">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-base text-white">
            <FileIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{data.report.name}</p>
            <p className="text-xs text-ink-muted">{data.report.meta}</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-muted">
        Beispielansicht des digitalen Betriebsbuchs. Namen und Daten sind erfunden.
      </figcaption>
    </figure>
  );
}
