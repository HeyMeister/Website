import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { Section } from "@/components/ui/layout";

/**
 * The two pillars (Floy: "Opportunistic Screening" / "Diagnostic Assistance"): the inspection on
 * site with a photograph, the logbook with a small piece of its UI. Three rows each.
 */
export function Pillars() {
  const p = home.pillars;
  const [onSite, logbook] = p.items;
  return (
    <Section id="leistung" tone="muted" layout="row" eyebrow={p.eyebrow} title={p.title} intro={p.lead}>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
        {onSite && (
          <PillarCard title={onSite.title} text={onSite.text} rows={onSite.rows}>
            <div className="relative aspect-[2.4/1] overflow-hidden rounded-control bg-surface-2">
              <Image
                src={photos.devices.src}
                alt={photos.devices.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
          </PillarCard>
        )}
        {logbook && (
          <PillarCard title={logbook.title} text={logbook.text} rows={logbook.rows}>
            <StatusPanel />
          </PillarCard>
        )}
      </div>
    </Section>
  );
}

function PillarCard({
  title,
  text,
  rows,
  children,
}: {
  title: string;
  text: string;
  rows: ReadonlyArray<{ label: string; detail: string }>;
  children: React.ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col rounded-card border border-line bg-surface-raised p-4 sm:p-5">
      {children}
      <div className="px-2 pb-1 pt-5 sm:px-3">
        <h3 className="text-heading text-ink">{title}</h3>
        <p className="mt-2 max-w-prose text-ink-muted">{text}</p>
        <ul className="mt-5 border-t border-line">
          {rows.map((r) => (
            <li key={r.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3">
              <span className="font-semibold text-ink">{r.label}</span>
              <span className={/\d/.test(r.detail) ? "font-mono text-data text-ink-muted" : "text-small text-ink-muted"}>{r.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Small piece of the logbook: the deadline traffic light across all sites. */
function StatusPanel() {
  const sites = home.logbookExample.sites;
  const count = (s: string) => sites.filter((x) => x.status === s).length;
  const tiles = [
    { label: "Geprüft", value: count("ok"), cls: "bg-success-soft text-success" },
    { label: "Fällig", value: count("due"), cls: "bg-warning-soft text-warning" },
    { label: "Überfällig", value: count("overdue"), cls: "bg-danger-soft text-danger" },
  ];
  return (
    <div data-ui className="flex min-w-0 flex-col justify-between gap-4 rounded-control bg-surface-2 p-4 sm:aspect-[2.4/1] sm:gap-0 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <p className="text-small font-semibold text-ink">Fristenampel · {home.logbookExample.company}</p>
        <p className="font-mono text-data text-ink-muted">{home.logbookExample.summary}</p>
      </div>
      <dl className="grid grid-cols-3 gap-2 sm:gap-3">
        {tiles.map((t) => (
          <div key={t.label}>
            <dt>
              <span className={`inline-block rounded-full px-2 py-1 text-[0.8125rem] font-semibold leading-4 ${t.cls}`}>{t.label}</span>
            </dt>
            <dd className="mt-2 font-mono text-display-l text-ink">{t.value}</dd>
          </div>
        ))}
      </dl>
      <p className="truncate font-mono text-data text-ink-muted">Nächster Termin: Oberkassel · 25.11.2026</p>
    </div>
  );
}
