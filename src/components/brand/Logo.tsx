import { iconGlyphs, wordmark } from "./logo-paths";

type Variant = "on-light" | "on-dark" | "mono";

const fills: Record<Variant, { accent: string; base: string }> = {
  // Dark wordmark on light surfaces ("Hey" and dot in accent)
  "on-light": { accent: "var(--hm-accent)", base: "var(--hm-base)" },
  // Light wordmark on dark surfaces
  "on-dark": { accent: "var(--hm-accent)", base: "#FFFFFF" },
  // Single colour, inherits `color`
  mono: { accent: "currentColor", base: "currentColor" },
};

type LogoProps = {
  variant?: Variant;
  className?: string;
  /** Accessible name; pass null when a visible label is next to the logo. */
  title?: string | null;
};

/** Wordmark "HeyMeister." as pure SVG paths (generated from Inter Bold). */
export function Logo({ variant = "on-light", className, title = "HeyMeister Elektro" }: LogoProps) {
  const f = fills[variant];
  return (
    <svg
      viewBox={wordmark.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {wordmark.parts.map((p, i) => (
        <path key={i} d={p.d} fill={p.role === "accent" ? f.accent : f.base} />
      ))}
    </svg>
  );
}

/** Square app icon "H." on a dark tile. */
export function LogoIcon({ className, title = "HeyMeister" }: { className?: string; title?: string | null }) {
  const { bounds } = iconGlyphs;
  const pad = 22;
  const side = Math.max(bounds.width, bounds.height) + pad * 2;
  const tx = (side - bounds.width) / 2 - bounds.x;
  const ty = (side - bounds.height) / 2 - bounds.y;
  return (
    <svg
      viewBox={`0 0 ${side} ${side}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width={side} height={side} rx={side * 0.18} fill="var(--hm-base)" />
      <g transform={`translate(${tx} ${ty})`}>
        {iconGlyphs.parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.role === "accent" ? "var(--hm-accent)" : "#FFFFFF"} />
        ))}
      </g>
    </svg>
  );
}
