import { home } from "@/content/home";
import { pricing, type Package } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { contactHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/layout";

/**
 * Five packages: three standard cards (Service highlighted as "Beliebt"), then the two packages
 * for larger sites as wider cards, then the small print. Prices come from content/pricing.ts.
 */
export function Packages() {
  const t = home.packages;
  const standard = pricing.packages.filter((p) => !("large" in p && p.large));
  const large = pricing.packages.filter((p) => "large" in p && p.large);
  return (
    <Section id="pakete" layout="row" eyebrow={t.eyebrow} title={t.title} intro={t.lead}>
      <ul className="grid gap-6 lg:grid-cols-3">
        {standard.map((p) => (
          <li key={p.id}>
            <PackageCard pkg={p} />
          </li>
        ))}
      </ul>

      <h3 className="label mt-14 text-ink-muted">{t.largeTitle}</h3>
      <ul className="mt-4 grid gap-6 lg:grid-cols-2">
        {large.map((p) => (
          <li key={p.id}>
            <PackageCard pkg={p} wide />
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-3xl">
        <h3 className="text-small font-semibold text-ink-muted">{t.smallPrintTitle}</h3>
        <ul className="mt-2 space-y-1 text-small text-ink-muted">
          {pricing.smallPrint.map((line) => (
            <li key={line}>{line}</li>
          ))}
          <li>
            Alle Preise pro Standort und Monat {pricing.vatNote}, Mindestlaufzeit {pricing.minTermMonths} Monate.
          </li>
        </ul>
      </div>
    </Section>
  );
}

function PackageCard({ pkg, wide = false }: { pkg: Package; wide?: boolean }) {
  const t = home.packages;
  const popular = Boolean(pkg.popular);
  return (
    <article
      className={`relative flex h-full flex-col rounded-card border p-6 sm:p-7 ${
        popular ? "border-base bg-base text-white" : "border-line bg-surface-raised text-ink"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[0.8125rem] font-bold leading-4 text-white">
          {t.popularLabel}
        </span>
      )}
      <div className={wide ? "grid gap-6 sm:grid-cols-2" : ""}>
        <div>
          <h3 className={`text-heading ${popular ? "text-white" : "text-ink"}`}>{pkg.name}</h3>
          <p className={`mt-1 text-small ${popular ? "text-ink-inverse-muted" : "text-ink-muted"}`}>{pkg.tagline}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
            <span className={`text-small font-semibold ${popular ? "text-ink-inverse-muted" : "text-ink-muted"}`}>ab</span>
            <span className={`font-display text-display-l font-bold leading-none ${popular ? "text-white" : "text-ink"}`}>
              {formatEuro(pkg.from)}
            </span>
          </p>
          <p className={`mt-1 text-small ${popular ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
            {t.perMonth}, {pricing.vatNote}
          </p>
          <p className={`mt-5 font-mono text-data ${popular ? "text-white" : "text-ink"}`}>
            <span className="whitespace-nowrap">
              {t.upTo} {pkg.limits.devices} {t.limitsDevices}
            </span>{" "}
            ·{" "}
            <span className="whitespace-nowrap">
              {t.upTo} {pkg.limits.circuits} {t.limitsCircuits}
            </span>
          </p>
        </div>
        <ul className={`space-y-2.5 ${wide ? "sm:pt-1" : "mt-5"}`}>
          {pkg.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-small">
              <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${popular ? "text-accent-light" : "text-accent"}`} strokeWidth={2.6} />
              <span className={popular ? "text-white" : "text-ink"}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-7">
        <LinkButton
          href={contactHref("angebot")}
          variant={popular ? "primary" : "secondary"}
          track="cta_offer_click"
          trackLocation={`package-${pkg.id}`}
          size="md"
          className="w-full"
        >
          {t.cta}
        </LinkButton>
      </div>
    </article>
  );
}
