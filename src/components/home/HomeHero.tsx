import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";

/**
 * Hero (Floy-like): an atmospheric full-bleed photograph in an inset frame with large corners,
 * fine film grain on top and the words set straight onto the calm sky, centred. A soft shade at
 * the top keeps white text at WCAG contrast over the lighter parts of the sky.
 * On phones the photograph sits on top and the words follow on the paper ground.
 *
 * Entrance (once): the h1 line by line, then the rest; the photograph settles from 1.05.
 */
export function HomeHero() {
  const { hero } = home;
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-enter relative -mt-16 px-3 pb-6 pt-[4.75rem] lg:h-[100svh]">
      <div className="relative lg:h-full">
        <div className="relative h-[34svh] overflow-hidden rounded-[24px] bg-base sm:h-[44svh] lg:absolute lg:inset-0 lg:h-auto lg:rounded-[28px]">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
            data-enter-media
            className="object-cover object-[50%_35%] lg:object-[50%_18%]"
          />
          {/* Shade for legibility (desktop only, where the words sit on the photograph). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(10,18,40,0.55)_0%,rgba(10,18,40,0.25)_45%,rgba(10,18,40,0)_70%)] lg:block"
          />
          <div aria-hidden="true" className="hm-grain pointer-events-none absolute inset-0" />
        </div>

        <div className="relative px-1 sm:px-3 lg:absolute lg:inset-x-0 lg:top-0 lg:flex lg:justify-center lg:px-8 lg:pt-[7vh]">
          <div className="pt-8 lg:max-w-[64rem] lg:pt-0 lg:text-center">
            <h1
              id="hero-heading"
              className="text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.5rem] lg:text-[3rem] lg:text-white lg:[text-shadow:0_2px_24px_rgba(10,18,40,0.35)] xl:text-[4.25rem]"
            >
              {hero.titleLines.map((line, i) => (
                <span key={line} data-enter-step style={{ "--step": i } as React.CSSProperties} className="block lg:inline">
                  {line}
                  {i < hero.titleLines.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p
              data-enter-step
              style={{ "--step": 2 } as React.CSSProperties}
              className="mt-5 max-w-[36ch] text-subheading font-normal text-ink-muted lg:mx-auto lg:mt-4 lg:max-w-[48ch] lg:text-white/90"
            >
              {hero.lead}
            </p>
            <div
              data-enter-step
              style={{ "--step": 3 } as React.CSSProperties}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mt-7 lg:justify-center"
            >
              <LinkButton
                href={contactHref("angebot")}
                track="cta_offer_click"
                trackLocation="hero"
                arrow
                className="shrink-0 whitespace-nowrap"
              >
                {hero.primaryCta}
              </LinkButton>
              <p className="text-small font-semibold text-ink lg:text-white">{hero.price}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
