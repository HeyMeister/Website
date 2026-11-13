import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";

/**
 * Inline call to action at a decision point inside a section (after the steps, after the
 * intervals). One primary button, optionally one quieter secondary link.
 */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
  location,
}: {
  title: string;
  text: ReactNode;
  primary: { label: string; href: string; track: string };
  secondary?: { label: string; href: string; track: string };
  location: string;
}) {
  return (
    <div className="mt-12 flex flex-col gap-6 rounded-card border border-line bg-surface-raised p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="max-w-prose">
        <p className="font-display text-subheading font-bold text-ink">{title}</p>
        <p className="mt-2 text-ink-muted">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
        <LinkButton href={primary.href} track={primary.track} trackLocation={location} arrow>
          {primary.label}
        </LinkButton>
        {secondary && (
          <LinkButton href={secondary.href} track={secondary.track} trackLocation={location} variant="secondary">
            {secondary.label}
          </LinkButton>
        )}
      </div>
    </div>
  );
}
