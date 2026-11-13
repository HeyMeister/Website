import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout";

/**
 * Hero (tasteskill "photo" hero, Floy-like): a full-bleed photograph in an inset frame with large
 * corners and a navy box on its calm side. Deliberately reduced to four things: the claim, one
 * sentence, one button and the price. On phones the photograph sits on top, the words follow.
 *
 * Entrance (once): the h1 line by line, then the rest; the photograph settles from 1.05.
 */
export function HomeHero() {
  const { hero } = home;
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-enter relative -mt-16 px-3 pb-6 pt-[4.75rem] lg:h-[100svh]">
      <div className="relative lg:h-full">
        <div className="relative h-[34svh] overflow-hidden rounded-[24px] bg-surface-2 sm:h-[44svh] lg:absolute lg:inset-0 lg:h-auto lg:rounded-[28px]">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
            data-enter-media
            className="object-cover object-[15%_50%]"
          />
        </div>

        <Container className="relative lg:flex lg:h-full lg:items-end lg:justify-end lg:pb-12">
          <div className="pt-8 lg:w-[38rem] lg:max-w-full lg:rounded-[20px] lg:bg-base lg:p-12">
            <h1
              id="hero-heading"
              className="text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.5rem] lg:text-white xl:text-[4rem]"
            >
              {hero.titleLines.map((line, i) => (
                <span key={line} data-enter-step style={{ "--step": i } as React.CSSProperties} className="block">
                  {line}
                  {i < hero.titleLines.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p
              data-enter-step
              style={{ "--step": 2 } as React.CSSProperties}
              className="mt-5 max-w-[34ch] text-subheading font-normal text-ink-muted lg:text-ink-inverse-muted"
            >
              {hero.lead}
            </p>
            <div
              data-enter-step
              style={{ "--step": 3 } as React.CSSProperties}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <LinkButton href={contactHref("angebot")} track="cta_offer_click" trackLocation="hero" arrow className="shrink-0 whitespace-nowrap">
                {hero.primaryCta}
              </LinkButton>
              <p className="text-small font-semibold text-ink lg:text-white">{hero.price}</p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
