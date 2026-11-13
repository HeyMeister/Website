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
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  headingLevel?: 1 | 2;
  /** "split": heading column left (sticky on desktop), content right. */
  layout?: "stacked" | "split";
}) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-28 ${toneClasses[tone]} ${className}`}
    >
      <Container className={layout === "split" ? "grid gap-10 lg:grid-cols-12 lg:gap-12" : ""}>
        {(eyebrow || title || intro) && (
          <header className={layout === "split" ? "lg:sticky lg:top-28 lg:col-span-4 lg:self-start" : "mb-10 max-w-3xl sm:mb-14"}>
            {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
            {title && (
              <H id={headingId} className={sectionHeadingClass}>
                {title}
              </H>
            )}
            {intro && (
              <p className={`mt-4 max-w-prose text-subheading ${tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted"}`}>
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
  return <p className={`label mb-4 ${tone === "dark" ? "text-accent-light" : "text-accent-dark"}`}>{children}</p>;
}
