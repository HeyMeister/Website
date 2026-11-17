import Image from "next/image";
import { cta, home } from "@/content/home";
import { photos } from "@/content/photos";
import { bookingUrl } from "@/lib/env";
import { callHref, homeFormHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";

/**
 * Hero: a full-bleed photograph (a distribution board) in an inset frame with large corners and
 * fine film grain, the words in a navy box on the right, vertically centred on the page grid.
 * Eyebrow, claim, what we do, both actions and the micro line.
 * On phones the photograph sits on top and the words follow on the paper ground.
 *
 * Entrance (once): the h1, then the rest; the photograph settles from 1.05.
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
            className="object-cover object-[15%_50%]"
          />
          <div aria-hidden="true" className="hm-grain pointer-events-none absolute inset-0" />
        </div>

        {/* From lg the box sits on the right, vertically centred, its right edge on the page grid. */}
        <div className="relative px-1 sm:px-3 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-5">
          <div className="lg:mx-auto lg:flex lg:w-full lg:max-w-content lg:justify-end">
            <div className="pt-8 lg:w-[42rem] lg:max-w-full lg:rounded-[24px] lg:bg-base lg:p-11">
              <p data-enter-step className="label mb-4 text-accent-dark lg:text-accent-light">
                {hero.eyebrow}
              </p>
              <h1
                id="hero-heading"
                data-enter-step
                className="text-[2.125rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-white xl:text-[3rem]"
              >
                {hero.title}
              </h1>
              <p
                data-enter-step
                style={{ "--step": 1 } as React.CSSProperties}
                className="mt-5 max-w-[46ch] text-subheading font-normal text-ink-muted lg:text-ink-inverse-muted"
              >
                {hero.lead}
              </p>
              <div data-enter-step style={{ "--step": 2 } as React.CSSProperties} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <LinkButton href={homeFormHref("check")} track="cta_check_click" trackLocation="hero" arrow>
                    {cta.primary}
                  </LinkButton>
                  <LinkButton
                    href={callHref(bookingUrl)}
                    variant="secondary"
                    track="cta_call_click"
                    trackLocation="hero"
                    className="lg:bg-white/[0.12] lg:text-white lg:hover:bg-white/20"
                  >
                    {cta.secondary}
                  </LinkButton>
                </div>
                <p className="mt-4 text-small text-ink-muted lg:text-ink-inverse-muted">{cta.micro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
