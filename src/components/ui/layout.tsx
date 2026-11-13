import type React from "react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className={`mx-auto w-full max-w-content ${className}`}>{children}</div>
    </div>
  );
}

type Tone = "light" | "muted" | "dark";

const toneClasses: Record<Tone, string> = {
  light: "bg-surface text-ink",
  muted: "bg-surface-2 text-ink",
  dark: "bg-base text-white",
};

/** Section heading sizes: heading (28/34) on mobile, display-l (44/50) from lg. */
export const sectionHeadingClass = "text-heading lg:text-display-l";

/** Card per brandbook: white on paper, 1 px border, radius 16 px, padding 24 px, no shadow. */
export const cardClass = "rounded-card border border-line bg-surface-raised p-6";

export function Section({
  id,
  tone = "light",
  eyebrow,
  title,
  intro,
  children,
  className = "",
  headingLevel = 2,
  layout = "stacked",
  screens = 1,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  headingLevel?: 1 | 2;
  /** "split": heading column left, content right. "row": h2 left, intro right, content below. */
  layout?: "stacked" | "split" | "row";
  /**
   * tasteskill "one section per screen": from lg the section is at least 1 or 2 screens tall and
   * its h2 sits 120px under the top, so each screen tile shows one section.
   */
  screens?: 1 | 2;
}) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      style={{ "--h": screens } as React.CSSProperties}
      className={`pb-16 pt-24 sm:pb-20 lg:min-h-[calc(var(--h)*100svh)] lg:pb-24 lg:pt-[7.5rem] ${toneClasses[tone]} ${className}`}
    >
      <Container className={layout === "split" ? "grid gap-10 lg:grid-cols-12 lg:gap-12" : ""}>
        {(eyebrow || title || intro) && (
          <header
            className={
              layout === "split"
                ? "lg:col-span-4 lg:self-start"
                : layout === "row"
                  ? "mb-10 grid gap-4 sm:mb-12 lg:grid-cols-12 lg:items-end lg:gap-12"
                  : "mb-10 max-w-3xl sm:mb-12"
            }
          >
            <div className={layout === "row" ? "lg:col-span-7" : ""}>
              {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
              {title && (
                <H id={headingId} className={sectionHeadingClass}>
                  {title}
                </H>
              )}
            </div>
            {intro && (
              <p
                className={`max-w-prose text-subheading ${layout === "row" ? "lg:col-span-5 lg:pb-1" : "mt-4"} ${
                  tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted"
                }`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {layout === "split" ? <div className="lg:col-span-8">{children}</div> : children}
      </Container>
    </section>
  );
}

/** Brandbook label above headings: 12/16, uppercase, 0.08 em, accent colour. */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  const color = tone === "dark" ? "text-accent-light" : tone === "muted" ? "text-accent-deep" : "text-accent-dark";
  return <p className={`label mb-4 ${color}`}>{children}</p>;
}
