import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Brandbook: primary coral with coral-dark hover, radius 10 px. Secondary is "tonal"
 * (tasteskill deal): a soft coral fill with navy text; on navy the tonal fill is white at 12 %.
 * Never two primary buttons next to each other. Motion: .m-btn steps up 1px on hover and
 * presses 1px down (globals.css).
 *
 * Accessibility: white on coral is 3.6:1. Labels are therefore set in 19 px bold, which
 * counts as large text under WCAG (≥ 18.66 px bold → 3:1 required).
 */
type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

const base =
  "m-btn inline-flex items-center justify-center gap-2 rounded-control text-[1.1875rem] font-bold leading-6 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "bg-accent-light text-ink hover:bg-[#F3CFC3]",
  inverse: "bg-white/[0.12] text-white hover:bg-white/20",
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
  /** Where on the page the button sits, sent as event property "location". */
  trackLocation?: string;
  /** Trailing arrow that nudges right on hover. */
  arrow?: boolean;
  children: ReactNode;
};

export function LinkButton({
  variant = "primary",
  size = "lg",
  className = "",
  track,
  trackLocation,
  arrow = false,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link {...props} data-track={track} data-track-location={trackLocation} className={buttonClass(variant, size, className)}>
      {children}
      {arrow && <ButtonArrow />}
    </Link>
  );
}

export function ButtonArrow() {
  return (
    <ArrowRightIcon className="m-arrow h-5 w-5 shrink-0" strokeWidth={2.4} />
  );
}
