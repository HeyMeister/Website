"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { pricing, type SiteSize } from "@/content/pricing";
import { track } from "@/lib/analytics";
import { formatEuro } from "@/lib/format";
import { quote, quoteHref } from "@/lib/pricing";
import { buttonClass } from "@/components/ui/Button";

const MAX = 500;
const TIER = "basis" as const;
const TERM = 24 as const;

/**
 * The hero's one interactive moment: pick the size of a typical site and the number of sites,
 * see the monthly price at once. The main action carries the choice into the form (#kontakt).
 */
export function HeroQuote({ ctaLabel, tel, phone }: { ctaLabel: string; tel: string | null; phone: string }) {
  const id = useId();
  const used = useRef(false);
  const [size, setSize] = useState<SiteSize>("s-buero");
  const [sites, setSites] = useState(1);

  const touch = () => {
    if (!used.current) {
      used.current = true;
      track("hero_quote_used");
    }
  };
  const changeSites = (v: number) => {
    touch();
    setSites(Math.min(MAX, Math.max(1, Math.floor(Number.isFinite(v) ? v : 1))));
  };

  const input = { lines: [{ size, count: sites }], tier: TIER, term: TERM };
  const q = quote(input);
  const perSite = q.monthly / q.sites;
  const nextStep = [...pricing.volumeDiscounts].find((d) => d.minSites > sites);

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-surface-raised">
      <div className="p-5 sm:p-6">
        <h2 className="font-display text-subheading font-bold text-ink">Ihr Preis, sofort</h2>

        <fieldset className="mt-5">
          <legend className="text-small font-semibold text-ink">Wie groß ist ein typischer Standort?</legend>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {pricing.sizes.map((s) => {
              const active = s.id === size;
              return (
                <label
                  key={s.id}
                  className={`relative flex min-h-[64px] min-w-0 cursor-pointer flex-col justify-center rounded-control border px-3 py-2.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus ${
                    active ? "border-base bg-base text-white" : "border-line-strong bg-surface-raised text-ink hover:border-base"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-size`}
                    value={s.id}
                    checked={active}
                    onChange={() => {
                      touch();
                      setSize(s.id);
                    }}
                    className="sr-only"
                  />
                  <span className="hyphens-auto break-words text-small font-semibold leading-5">{s.pick.label}</span>
                  <span className={`text-[0.8125rem] leading-5 ${active ? "text-ink-inverse-muted" : "text-ink-muted"}`}>{s.pick.hint}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <label htmlFor={`${id}-sites`} className="text-small font-semibold text-ink">
            Wie viele Standorte?
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changeSites(sites - 1)}
              disabled={sites <= 1}
              aria-label="Einen Standort weniger"
              className="h-11 w-11 rounded-control border border-line-strong text-subheading font-bold text-ink hover:bg-surface-2 disabled:opacity-40"
            >
              −
            </button>
            <input
              id={`${id}-sites`}
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX}
              value={sites}
              onChange={(e) => changeSites(e.target.valueAsNumber)}
              className="h-11 w-16 rounded-control border border-line-strong bg-surface-raised text-center text-subheading font-semibold text-ink"
            />
            <button
              type="button"
              onClick={() => changeSites(sites + 1)}
              aria-label="Einen Standort mehr"
              className="h-11 w-11 rounded-control border border-line-strong text-subheading font-bold text-ink hover:bg-surface-2"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="bg-base p-5 text-white sm:p-6">
        <div aria-live="polite" aria-atomic="true">
          <p className="text-small text-ink-inverse-muted">Im Monat, netto</p>
          <p className="mt-1 font-display text-[3rem] font-bold leading-none tracking-[-0.02em] text-accent-light sm:text-[3.5rem]">
            {formatEuro(q.monthly, { cents: !Number.isInteger(q.monthly) })}
          </p>
          <p className="mt-3 text-small text-ink-inverse-muted">
            {q.sites > 1
              ? `${formatEuro(perSite, { cents: !Number.isInteger(perSite) })} pro Standort${q.discountPercent ? `, mit ${q.discountPercent} % Mengenrabatt` : ""}. `
              : ""}
            Prüfung, Kleinreparaturen und Betriebsbuch inklusive. Tarif Basis, 24 Monate Laufzeit, keine Einrichtungsgebühr.
          </p>
          {nextStep && sites > 1 && (
            <p className="mt-2 text-small text-white">
              Ab {nextStep.minSites} Standorten {nextStep.percent} % Mengenrabatt.
            </p>
          )}
        </div>
        <Link
          href={quoteHref(input, "/")}
          data-track="cta_check_click"
          data-track-location="hero-quote"
          className={buttonClass("primary", "lg", "mt-5 w-full text-center")}
        >
          {ctaLabel}
        </Link>
        <p className="mt-3 text-[0.8125rem] leading-5 text-ink-inverse-muted">
          Endgültige Einstufung beim Erstbesuch.{" "}
          <Link href="/preise" className="m-link text-white">
            Alle Preise und Tarif Plus
          </Link>
          {tel && (
            <>
              {" "}oder anrufen:{" "}
              <a href={tel} data-track="phone_click" data-track-location="hero-quote" className="m-link whitespace-nowrap text-white">
                {phone}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
