import { pricing } from "@/content/pricing";
import type { Segment } from "@/content/segments";
import { formatEuro } from "@/lib/format";
import { quote } from "@/lib/pricing";

/** Example calculation for a segment, computed from content/pricing.ts (tier "Basis"), always labelled. */
export function ExampleQuote({ example }: { example: Segment["example"] }) {
  const size = pricing.sizes.find((s) => s.id === example.size);
  if (!size) return null;
  const q = quote({ lines: [{ size: example.size, count: example.sites }], tier: "basis", term: example.term });
  const rows: [string, string][] = [
    ["Annahme", example.label],
    ["Preis pro Standort", `${formatEuro(size.monthly.basis)} im Monat (Basis)`],
  ];
  const step = [...pricing.volumeDiscounts].reverse().find((d) => example.sites >= d.minSites);
  if (step) rows.push(["Mengenrabatt", `${step.percent} % (ab ${step.minSites} Standorten)`]);
  rows.push(["Laufzeit", `${example.term} Monate`]);
  rows.push(["Einrichtung", q.setupWaived ? `entfällt bei ${pricing.setupFeeWaivedForTermMonths} Monaten Laufzeit` : formatEuro(q.setup)]);
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
      <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-6 py-3">
        <p className="label text-ink">Beispielrechnung</p>
        <span className="label rounded-full border border-dashed border-line-strong px-2.5 py-1 text-ink-muted">Beispiel</span>
      </div>
      <dl className="divide-y divide-line px-6">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-small text-ink-muted">{k}</dt>
            <dd className="text-small font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-line bg-base px-6 py-5 text-white">
        <p className="text-small text-ink-inverse-muted">Monatlich, netto</p>
        <p className="mt-1 font-display text-[2.25rem] font-bold leading-none">{formatEuro(q.monthly, { cents: true })}</p>
        {example.sites > 1 && (
          <p className="mt-2 text-small text-ink-inverse-muted">
            {formatEuro(q.monthly / example.sites, { cents: true })} pro {example.unit}
          </p>
        )}
      </div>
      <p className="px-6 py-4 text-small text-ink-muted">
        {pricing.vatNote} {pricing.classificationNote}
      </p>
    </div>
  );
}
