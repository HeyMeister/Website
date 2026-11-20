import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/layout";
import { Actions } from "./Actions";

/**
 * Hero for subpages: eyebrow, h1, lead and both actions on the left, an optional visual on the
 * right. Carries id="hero" so the mobile action bar appears once it has scrolled away.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  actions,
  location,
  breadcrumbs,
}: {
  /** Trail after "Startseite", ending with the current page. */
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  /** Replaces the default actions (e.g. a pilot or partner button). */
  actions?: ReactNode;
  location: string;
}) {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-enter bg-surface pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <Container className={aside ? "grid gap-12 lg:grid-cols-12 lg:items-center" : ""}>
        <div className={aside ? "min-w-0 lg:col-span-7" : "max-w-4xl"}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <div data-enter-step>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          </div>
          <h1
            id="hero-heading"
            data-enter-step
            className="hyphens-auto break-words text-[2.125rem] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.75rem] sm:leading-[1.1] lg:hyphens-manual xl:text-[3.25rem]"
          >
            {title}
          </h1>
          {lead && (
            <p data-enter-step style={{ "--step": 1 } as React.CSSProperties} className="mt-6 max-w-prose text-subheading font-normal text-ink-muted">
              {lead}
            </p>
          )}
          <div data-enter-step style={{ "--step": 2 } as React.CSSProperties} className="mt-8">
            {actions ?? <Actions location={location} />}
          </div>
        </div>
        {aside && <div className="min-w-0 lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}
