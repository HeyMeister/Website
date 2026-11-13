import type { ReactNode } from "react";
import { splitPlaceholders } from "@/lib/placeholders";

/**
 * Clearly visible marker for missing content (dashed frame, off-brand violet).
 * Use the block variant for missing sections/photos, <Fill> for text with [PLACEHOLDERS].
 */
export function Placeholder({
  label,
  children,
  className = "",
  aspect,
}: {
  label: string;
  children?: ReactNode;
  className?: string;
  /** e.g. "aspect-[4/5]" for photo placeholders */
  aspect?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-card border-2 border-dashed border-placeholder bg-placeholder-soft p-6 text-center text-placeholder ${aspect ?? ""} ${className}`}
    >
      <span className="label">{label}</span>
      {children ? <span className="text-small">{children}</span> : null}
    </div>
  );
}

/** Renders text and highlights every [PLACEHOLDER] segment inline. */
export function Fill({ text }: { text: string }) {
  const parts = splitPlaceholders(text);
  if (parts.length === 1 && !parts[0]?.placeholder) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        p.placeholder ? (
          <mark
            key={i}
            className="rounded border border-dashed border-placeholder bg-placeholder-soft px-1 font-medium text-placeholder"
            title="Platzhalter: vor Veröffentlichung ersetzen"
          >
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}
