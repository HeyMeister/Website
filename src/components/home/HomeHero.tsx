import Image from "next/image";
import { home } from "@/content/home";
import { photos } from "@/content/photos";
import { contactHref } from "@/lib/links";
import { LinkButton } from "@/components/ui/Button";

/**
 * Hero: a full-bleed photograph (a distribution board) in an inset frame with large
 * corners and fine film grain, the words in a navy box on the right, vertically centred.
 * Reduced to four things: claim, one sentence, one button, the price.
 * On phones the photograph sits on top and the words follow on the paper ground.
 *
 * Entrance (once): the h1 line by line, then the rest; the photograph settles from 1.05.
 */
export function HomeHero() {
  const { hero } = home;
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-enter relative -mt-16 px-3 pb-6 pt-[4.75rem] lg:h-[100svh]"
    >
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
          <div
            aria-hidden="true"
            className="hm-grain pointer-events-none absolute inset-0"
          />
        </div>

        {/* From lg the box sits on the right, vertically centred, its right edge on the page grid. */}
        <div className="relative px-1 sm:px-3 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-5">
          <div className="lg:mx-auto lg:flex lg:w-full lg:max-w-content lg:justify-end">
            <div className="pt-8 lg:w-[38rem] lg:max-w-full lg:rounded-[24px] lg:bg-base lg:p-12">
              <h1
                id="hero-heading"
                className="text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.5rem] lg:text-white xl:text-[4rem]"
              >
                {hero.titleLines.map((line, i) => (
                  <span
                    key={line}
                    data-enter-step
                    style={{ "--step": i } as React.CSSProperties}
                    className="block"
                  >
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
                <LinkButton
                  href={contactHref("angebot")}
                  track="cta_offer_click"
                  trackLocation="hero"
                  arrow
                  className="shrink-0 whitespace-nowrap"
                >
                  {hero.primaryCta}
                </LinkButton>
                <p className="text-small font-semibold text-ink lg:text-white">
                  {hero.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
