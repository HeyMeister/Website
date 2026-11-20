import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { publishedTeam } from "@/content/team";
import { homeFormHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, sectionHeadingClass } from "@/components/ui/layout";
import Link from "next/link";

/**
 * Who is behind it, and the pilot offer next to it: the person on the left, the concrete next
 * step on the right. The quote only shows once Leon has approved a sentence in his own words.
 */
export function Meister() {
  const m = home.meister;
  const p = home.pilot;
  const leon = publishedTeam[0];
  return (
    <section id="meister" aria-labelledby="meister-heading" className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id="meister-heading" className={sectionHeadingClass + " text-ink"}>
            {m.title}
          </h2>
          <p className="mt-5 max-w-prose text-subheading text-ink-muted">{m.text}</p>
          {leon?.quote && (
            <blockquote className="mt-8 border-l-4 border-accent pl-6 font-display text-heading font-bold leading-snug text-ink">„{leon.quote}“</blockquote>
          )}
          <figure className="relative mt-10 aspect-[16/10] overflow-hidden rounded-card bg-surface-2">
            <Image src={photos.steps.src} alt={photos.steps.alt} fill sizes="(min-width: 1024px) 580px, 100vw" className="object-cover object-[50%_45%]" />
          </figure>
          {leon && (
            <p className="mt-6 text-ink">
              <span className="font-semibold">{leon.name}</span>
              <span className="text-ink-muted">, {leon.role}</span>
              {site.trust.handwerksrolle && <span className="block text-small text-ink-muted">Eingetragen in der Handwerksrolle der {site.trust.chamber}.</span>}
            </p>
          )}
        </div>

        <aside id="pilot" aria-labelledby="pilot-heading" className="rounded-[20px] bg-base p-7 text-white sm:p-9 lg:col-span-6">
          <p className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.02em] text-accent-light">
            Feb. bis Juni 2027
          </p>
          <h3 id="pilot-heading" className="mt-5 text-heading text-white">
            {p.title}
          </h3>
          <p className="mt-3 text-ink-inverse-muted">{p.text}</p>
          <ul className="mt-6 space-y-2.5">
            {site.pilot.conditions.map((c) => (
              <li key={c} className="flex gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent-light" strokeWidth={3} />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <LinkButton href={homeFormHref("pilot")} track="cta_pilot_click" trackLocation="pilot" variant="inverse">
              {p.cta}
            </LinkButton>
            <Link href="/pilot" className="m-link text-small font-semibold text-white">
              {p.more}
            </Link>
          </div>
        </aside>
      </Container>
    </section>
  );
}
