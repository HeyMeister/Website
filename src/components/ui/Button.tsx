import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // The brand accent (#E4572E) is too light for small white text, so buttons use accent-strong.
  primary: "bg-accent-strong text-white hover:bg-accent-strong-hover",
  secondary: "border border-base/25 bg-surface-raised text-ink hover:border-base hover:bg-surface-muted",
  inverse: "border border-white/30 text-surface hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-4 py-2 text-sm",
  lg: "min-h-[48px] px-6 py-3 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Analytics event name, sent on click (see AnalyticsClickTracker). */
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
