import Image from "next/image";
import { cta, home } from "@/content/home";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { bookingUrl } from "@/lib/env";
import { callHref, telHref } from "@/lib/links";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";
import { HeroQuote } from "./HeroQuote";

/**
 * Hero: the claim on the left, the instant price on the right. The price check is the one bold
 * element of the page; everything around it stays quiet. On phones the price follows the lead.
 *
 * Entrance (once): the h1, then the rest.
 */
export function HomeHero() {
  const { hero, trust } = home;
  const tel = telHref(site.contact.phone);
  const points: string[] = [];
  if (site.trust.meisterbetrieb) points.push(trust.meisterbetrieb);
  if (site.trust.norms) points.push(trust.norms);
  points.push(trust.logbook);
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-enter border-b border-line bg-surface pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <h1
            id="hero-heading"
            data-enter-step
            className="break-words text-[2.375rem] leading-[1.06] tracking-[-0.025em] text-ink sm:text-[3.25rem] xl:text-[4rem]"
          >
            {hero.title.split("Full-Service").map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="whitespace-nowrap">Full-Service</span>}
                {part}
              </span>
            ))}
          </h1>
          <p data-enter-step style={{ "--step": 1 } as React.CSSProperties} className="mt-6 max-w-[52ch] text-subheading font-normal text-ink-muted">
            {hero.lead}
          </p>
          <ul data-enter-step style={{ "--step": 2 } as React.CSSProperties} className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-small font-semibold text-ink">
                <CheckIcon className="h-4 w-4 shrink-0 text-accent-dark" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
          <div data-enter-step style={{ "--step": 3 } as React.CSSProperties} className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 lg:flex">
            <LinkButton href={callHref(bookingUrl)} variant="secondary" track="cta_call_click" trackLocation="hero">
              {cta.secondary}
            </LinkButton>
            <p className="text-small text-ink-muted">{cta.micro}</p>
          </div>
        </div>

        <div data-enter-step style={{ "--step": 2 } as React.CSSProperties} className="min-w-0 lg:col-span-5">
          {/* The price card sits in a frame of the photograph: a distribution board, the subject itself. */}
          <div className="relative overflow-hidden rounded-[28px] bg-surface-2 px-2.5 pb-2.5 pt-32 sm:px-4 sm:pb-4 sm:pt-40 lg:px-5 lg:pb-5 lg:pt-36">
            <div className="absolute inset-x-0 top-0 h-44 sm:h-52 lg:h-48">
              <Image
                src={photos.breakers.src}
                alt={photos.breakers.alt}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[50%_32%]"
              />
            </div>
            <div className="relative">
              <HeroQuote ctaLabel={cta.primary} tel={tel} phone={site.contact.phone} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 lg:hidden">
            <LinkButton href={callHref(bookingUrl)} variant="secondary" track="cta_call_click" trackLocation="hero" className="w-full">
              {cta.secondary}
            </LinkButton>
            <p className="text-small text-ink-muted">{cta.micro}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
