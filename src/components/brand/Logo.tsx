import { icon, wordmark } from "./logo-paths";

/**
 * Wordmark rules (Brandbook v1):
 * - "Hey" is always the accent, colours are never swapped, no dot, no "Elektro" in the mark.
 * - Minimum width 120 px on screen; below that use <LogoIcon />.
 * - Protective space: the height of the "H" on every side (handled by the surrounding layout).
 */
type Variant = "on-light" | "on-dark" | "on-accent" | "mono";

const fills: Record<Variant, { hey: string; meister: string }> = {
  "on-light": { hey: "var(--hm-accent)", meister: "var(--hm-base)" },
  // On navy "Meister" turns white.
  "on-dark": { hey: "var(--hm-accent)", meister: "#FFFFFF" },
  // On coral "Hey" turns white.
  "on-accent": { hey: "#FFFFFF", meister: "var(--hm-base)" },
  // Single colour (stamp, engraving, embroidery): inherits `color`.
  mono: { hey: "currentColor", meister: "currentColor" },
};

type LogoProps = {
  variant?: Variant;
  className?: string;
  /** Accessible name; pass null when the logo sits inside a labelled link. */
  title?: string | null;
};

export function Logo({ variant = "on-light", className, title = "HeyMeister" }: LogoProps) {
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
        <path key={i} d={p.d} fill={p.role === "accent" ? f.hey : f.meister} />
      ))}
    </svg>
  );
}

type IconVariant = "navy" | "koralle" | "hell";

const iconFills: Record<IconVariant, { bg: string | null; h: string; dot: string }> = {
  // Standard: favicon, app, social
  navy: { bg: "var(--hm-base)", h: "#FFFFFF", dot: "var(--hm-accent)" },
  // Campaigns, stickers
  koralle: { bg: "var(--hm-accent)", h: "#FFFFFF", dot: "var(--hm-base)" },
  // Light surfaces where the dark square would be too heavy
  hell: { bg: null, h: "var(--hm-base)", dot: "var(--hm-accent)" },
};

/** "H" with a dot on a rounded square (radius 22 %). Never placed next to the wordmark. */
export function LogoIcon({
  variant = "navy",
  className,
  title = "HeyMeister",
}: {
  variant?: IconVariant;
  className?: string;
  title?: string | null;
}) {
  const f = iconFills[variant];
  const [tx, ty] = icon.translate;
  return (
    <svg
      viewBox={`0 0 ${icon.side} ${icon.side}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {f.bg && <rect width={icon.side} height={icon.side} rx={icon.radius} fill={f.bg} />}
      <g transform={`translate(${tx} ${ty})`}>
        {icon.parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.role === "accent" ? f.dot : f.h} />
        ))}
      </g>
    </svg>
  );
}
