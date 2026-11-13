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
  muted: "bg-surface-muted text-ink",
  dark: "bg-base text-surface",
};

/** Page section with optional eyebrow, heading and intro. */
export function Section({
  id,
  tone = "light",
  eyebrow,
  title,
  intro,
  children,
  className = "",
  headingLevel = 2,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  headingLevel?: 1 | 2;
}) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${toneClasses[tone]} ${className}`}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-prose sm:mb-12">
            {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
            {title && (
              <H id={headingId} className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </H>
            )}
            {intro && (
              <p className={`mt-4 text-lg ${tone === "dark" ? "text-ink-inverse-muted" : "text-ink-muted"}`}>{intro}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${
        tone === "dark" ? "text-accent-on-dark" : "text-ink-muted"
      }`}
    >
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
      {children}
    </p>
  );
}
