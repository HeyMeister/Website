import Link from "next/link";
import { home } from "@/content/home";
import { homeFormHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Fill } from "@/components/ui/Placeholder";
import { Container } from "@/components/ui/layout";

/** Pilot banner (validation phase only): February to June 2027, conditions still open. */
export function PilotBanner() {
  const p = home.pilot;
  return (
    <section id="pilot" aria-labelledby="pilot-heading" className="pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="grid gap-8 rounded-card border-2 border-accent bg-accent-light/40 p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
          <div className="lg:col-span-3">
            <p className="label text-accent-deep">{p.eyebrow}</p>
            <p className="mt-2 font-display text-[3rem] font-bold leading-none tracking-[-0.02em] text-ink">02–06</p>
            <p className="font-display text-heading font-bold text-ink-muted">2027</p>
          </div>
          <div className="lg:col-span-6">
            <h2 id="pilot-heading" className="text-heading text-ink">
              {p.title}
            </h2>
            <p className="mt-3 text-ink">{p.text}</p>
            <p className="mt-2 text-small text-ink-muted">
              <Fill text={p.conditions} />
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-3 lg:items-end">
            <LinkButton href={homeFormHref("pilot")} track="cta_pilot_click" trackLocation="pilot-banner" arrow>
              {p.cta}
            </LinkButton>
            <Link href="/pilot" className="m-link text-small font-semibold text-ink">
              {p.more}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
