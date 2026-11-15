import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { contactHref } from "@/lib/links";
import { BoltIcon, CalendarIcon, CheckIcon, FileIcon, MapPinIcon, PhoneIcon, PlugIcon, WrenchIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/layout";

const icons = { plug: PlugIcon, file: FileIcon, calendar: CalendarIcon, wrench: WrenchIcon, pin: MapPinIcon, phone: PhoneIcon, bolt: BoltIcon } as const;

/** What is included (service and scope, as in the offer text) beside the price card. */
export function Offer() {
  const t = home.offer;
  return (
    <Section id="leistungen" tone="muted" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="hidden grid-cols-[17rem_1fr] gap-6 border-b border-line-strong pb-3 sm:grid">
            <span className="label text-ink-muted">{t.columns.service}</span>
            <span className="label text-ink-muted">{t.columns.scope}</span>
          </div>
          <ul>
            {pricing.included.map((row) => {
              const Icon = icons[row.icon];
              return (
                <li key={row.title} className="grid gap-2 border-b border-line-strong py-4 sm:grid-cols-[17rem_1fr] sm:gap-6">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-base text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-display font-bold text-ink">{row.title}</span>
                  </span>
                  <span className="text-ink sm:pt-1.5">
                    <Rich text={row.scope} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="lg:col-span-4">
          <div className="rounded-card bg-base p-7 text-white lg:sticky lg:top-24">
            <p className="font-display text-subheading font-bold">{pricing.name}</p>
            <p className="mt-5 font-display text-[3.5rem] font-bold leading-none tracking-[-0.02em]">{formatEuro(pricing.monthly)}</p>
            <p className="mt-2 text-small text-ink-inverse-muted">
              {t.perMonth}, {pricing.vatNote}
            </p>
            <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-6">
              {t.facts.map((f) => (
                <li key={f} className="flex gap-2.5 text-small">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" strokeWidth={2.6} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <LinkButton href={contactHref("angebot")} track="cta_offer_click" trackLocation="offer" arrow className="mt-7 w-full">
              {t.cta}
            </LinkButton>
          </div>
        </aside>
      </div>
    </Section>
  );
}
