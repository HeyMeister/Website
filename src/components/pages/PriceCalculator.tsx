"use client";

import { useId, useRef, useState } from "react";
import { pricing, type SiteSize, type Tier } from "@/content/pricing";
import { track } from "@/lib/analytics";
import { formatEuro } from "@/lib/format";
import { quote, quoteHref } from "@/lib/pricing";
import { LinkButton } from "@/components/ui/Button";

const MAX = 500;

/**
 * Price calculator: sites per size, tier and term → monthly net price with volume discount and the
 * setup fee. "Dieses Angebot anfordern" carries the configuration into the contact form.
 */
export function PriceCalculator({ ctaLabel }: { ctaLabel: string }) {
  const id = useId();
  const used = useRef(false);
  const [counts, setCounts] = useState<Record<SiteSize, number>>({ "s-buero": 0, s: 1, m: 0, l: 0 });
  const [tier, setTier] = useState<Tier>("basis");
  const [term, setTerm] = useState<12 | 24>(24);

  const markUsed = () => {
    if (!used.current) {
      used.current = true;
      track("calculator_used");
    }
  };
  const setCount = (size: SiteSize, value: number) => {
    markUsed();
    setCounts((c) => ({ ...c, [size]: Math.min(MAX, Math.max(0, Math.floor(Number.isFinite(value) ? value : 0))) }));
  };

  const lines = pricing.sizes.map((s) => ({ size: s.id, count: counts[s.id] }));
  const q = quote({ lines, tier, term });
  const tierLabel = pricing.tiers.find((t) => t.id === tier)?.label ?? tier;
  const href = quoteHref({ lines, tier, term });

  return (
    <div className="grid gap-8 rounded-card border border-line bg-surface-raised p-4 sm:p-6 lg:grid-cols-12 lg:p-8">
      <div className="min-w-0 space-y-8 lg:col-span-7">
        <fieldset>
          <legend className="font-semibold text-ink">Wie viele Standorte je Größe?</legend>
          <div className="mt-4 grid gap-3">
            {pricing.sizes.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-line px-4 py-3">
                <label htmlFor={`${id}-${s.id}`} className="min-w-0">
                  <span className="block font-semibold text-ink">Größe {s.label}</span>
                  <span className="block text-small text-ink-muted">{formatEuro(s.monthly[tier])} pro Standort und Monat</span>
                </label>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => setCount(s.id, counts[s.id] - 1)} aria-label={`Größe ${s.label}: einen weniger`} className="h-11 w-11 rounded-control border border-line-strong text-subheading font-bold text-ink hover:bg-surface-2">
                    −
                  </button>
                  <input
                    id={`${id}-${s.id}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={MAX}
                    value={counts[s.id]}
                    onChange={(e) => setCount(s.id, e.target.valueAsNumber)}
                    className="h-11 w-14 rounded-control border border-line-strong bg-surface-raised text-center font-mono text-ink"
                  />
                  <button type="button" onClick={() => setCount(s.id, counts[s.id] + 1)} aria-label={`Größe ${s.label}: einen mehr`} className="h-11 w-11 rounded-control border border-line-strong text-subheading font-bold text-ink hover:bg-surface-2">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6">
          <fieldset>
            <legend className="font-semibold text-ink">Tarif</legend>
            <div className="mt-3 flex gap-2">
              {pricing.tiers.map((t) => (
                <label key={t.id} className={`flex min-h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-control border px-3 font-semibold ${tier === t.id ? "border-base bg-base text-white" : "border-line-strong text-ink hover:bg-surface-2"}`}>
                  <input type="radio" name={`${id}-tier`} value={t.id} checked={tier === t.id} onChange={() => { markUsed(); setTier(t.id); }} className="sr-only" />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-semibold text-ink">Laufzeit</legend>
            <div className="mt-3 flex gap-2">
              {pricing.terms.map((t) => (
                <label key={t} className={`flex min-h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-control border px-3 font-semibold ${term === t ? "border-base bg-base text-white" : "border-line-strong text-ink hover:bg-surface-2"}`}>
                  <input type="radio" name={`${id}-term`} value={t} checked={term === t} onChange={() => { markUsed(); setTerm(t as 12 | 24); }} className="sr-only" />
                  {t} Monate
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 rounded-card bg-base p-6 text-white lg:col-span-5" aria-live="polite">
        <div>
          <p className="text-small text-ink-inverse-muted">
            {q.sites} {q.sites === 1 ? "Standort" : "Standorte"}, Tarif {tierLabel}, {term} Monate Laufzeit
          </p>
          <p className="mt-4 text-small text-ink-inverse-muted">Monatlich, netto</p>
          <p className="mt-1 font-display text-[2.75rem] font-bold leading-none">{formatEuro(q.monthly, { cents: true })}</p>
          <dl className="mt-6 space-y-2 text-small">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-inverse-muted">Mengenrabatt</dt>
              <dd>{q.discountPercent ? `${q.discountPercent} %` : "ab 5 Standorten"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-inverse-muted">Einrichtung, einmalig</dt>
              <dd>{q.setupWaived ? "entfällt" : formatEuro(q.setup)}</dd>
            </div>
          </dl>
        </div>
        <div>
          {q.sites > 0 ? (
            <LinkButton href={href} track="cta_check_click" trackLocation="calculator" className="w-full">
              {ctaLabel}
            </LinkButton>
          ) : (
            <p className="text-small text-ink-inverse-muted">Wählen Sie mindestens einen Standort.</p>
          )}
          <p className="mt-3 text-[0.8125rem] leading-5 text-ink-inverse-muted">
            {pricing.vatNote} {pricing.classificationNote}
          </p>
        </div>
      </div>
    </div>
  );
}
