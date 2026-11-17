import { cta, home } from "@/content/home";
import { homeFormHref } from "@/lib/links";
import { lowestMonthlyPrice } from "@/content/pricing";
import { formatEuro } from "@/lib/format";
import { CheckIcon } from "@/components/icons";
import { LinkButton } from "@/components/ui/Button";
import { Container, Eyebrow, sectionHeadingClass } from "@/components/ui/layout";

/** Price teaser on navy: the lowest price, two points and the way to the calculator. */
export function PriceTeaser() {
  const p = home.priceTeaser;
  return (
    <section id="preise" aria-labelledby="preise-heading" className="bg-base pb-16 pt-24 text-white sm:pb-20 lg:pb-24 lg:pt-[7.5rem]">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow tone="dark">{p.eyebrow}</Eyebrow>
          <h2 id="preise-heading" className={sectionHeadingClass}>
            {p.title}
          </h2>
          <ul className="mt-8 space-y-2">
            {p.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-subheading text-white">
                <CheckIcon className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.6} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <p className="font-display font-bold leading-none tracking-[-0.02em]">
            <span className="block text-subheading font-semibold tracking-normal text-ink-inverse-muted">{p.prefix}</span>
            <span className="mt-2 block text-[4.5rem] text-accent sm:text-[5.5rem]">{formatEuro(lowestMonthlyPrice())}</span>
          </p>
          <p className="mt-3 text-subheading text-ink-inverse-muted">{p.suffix}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href={homeFormHref("check")} track="cta_check_click" trackLocation="price-teaser" arrow>
              {cta.primary}
            </LinkButton>
            <LinkButton href="/preise#rechner" variant="inverse" trackLocation="price-teaser">
              {p.cta}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
