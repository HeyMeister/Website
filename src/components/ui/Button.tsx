import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Brandbook: primary coral with coral-dark hover, radius 10 px; secondary with navy border.
 * Never two primary buttons next to each other.
 *
 * Accessibility: white on coral is 3.6:1. Labels are therefore set in 19 px bold, which
 * counts as large text under WCAG (≥ 18.66 px bold → 3:1 required).
 */
type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control text-[1.1875rem] font-bold leading-6 transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "border border-base bg-transparent text-ink hover:bg-surface-raised",
  inverse: "border border-white text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-4 py-2",
  lg: "min-h-[52px] px-6 py-3",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Analytics event name, sent on click (see ClickTracker). */
  track?: string;
  children: ReactNode;
};

export function LinkButton({ variant = "primary", size = "lg", className = "", track, children, ...props }: LinkButtonProps) {
  return (
    <Link {...props} data-track={track} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
