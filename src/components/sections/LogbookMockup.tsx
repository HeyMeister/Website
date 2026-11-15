import { home, type Tone } from "@/content/home";
import { LogoIcon } from "@/components/brand/Logo";

/**
 * Product screens built in HTML (not screenshots), with the fictitious "Beispiel GmbH".
 * Brandbook table style: head in surface-2 with labels, numbers in mono, status as a pill with a
 * word (never colour alone).
 */

const toneStyle: Record<Tone, string> = {
  ok: "bg-success-soft text-success",
  due: "bg-warning-soft text-warning",
  info: "bg-accent-light text-ink",
  open: "bg-surface-2 text-ink-muted",
};

const pillClass = "inline-block rounded-full px-2 py-1 text-[0.8125rem] font-semibold leading-4 sm:whitespace-nowrap";

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

/** Example site overview: inspection status, open defects and work status per site. */
export function SiteOverviewScreen({ className = "" }: { className?: string }) {
  const d = home.overviewExample;
  return (
    <div data-ui className={`overflow-hidden rounded-card border border-line bg-surface-raised ${className}`}>
      <ScreenBar label={d.title} />
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
        <div>
          <p className="font-display text-body font-bold text-ink sm:text-subheading">{d.title}</p>
          <p className="text-small text-ink-muted">
            {d.company} · {d.summary}
          </p>
        </div>
        <span className="label shrink-0 rounded-full border border-dashed border-line-strong px-2.5 py-1 text-ink-muted">Beispiel</span>
      </div>

      <table className="w-full text-left text-small">
        <caption className="sr-only">Beispiel: Filialen mit Prüfstatus, offenen Mängeln und Bearbeitungsstand</caption>
        <thead className="border-y border-line bg-surface-2">
          <tr className="label whitespace-nowrap text-ink">
            <th scope="col" className="py-3 pl-4 pr-2 font-semibold sm:pl-5">{d.columns.site}</th>
            <th scope="col" className="hidden px-2 py-3 font-semibold md:table-cell">{d.columns.check}</th>
            <th scope="col" className="px-2 py-3 text-right font-semibold sm:text-center">
              <span className="sm:hidden">Mängel</span>
              <span className="hidden sm:inline">{d.columns.defects}</span>
            </th>
            <th scope="col" className="py-3 pl-2 pr-4 font-semibold sm:pr-5">{d.columns.work}</th>
          </tr>
        </thead>
        <tbody>
          {d.sites.map((s) => (
            <tr key={s.name} className="border-b border-line last:border-b-0">
              <td className="py-3 pl-4 pr-2 sm:pl-5">
                <span className="block text-body text-ink">{s.name}</span>
                <span className="block text-[0.75rem] leading-4 text-ink-muted md:hidden">{s.check}</span>
              </td>
              <td className="hidden px-2 py-3 md:table-cell">
                <span className={`${pillClass} ${toneStyle[s.checkTone]}`}>{s.check}</span>
              </td>
              <td className="px-2 py-3 text-right font-mono text-data text-ink sm:text-center">{s.defects}</td>
              <td className="py-3 pl-2 pr-4 sm:pr-5">
                <span className={`${pillClass} ${toneStyle[s.workTone]}`}>{s.work}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
