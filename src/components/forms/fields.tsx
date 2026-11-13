import type { ReactNode } from "react";

/** Shared form styles and the labelled field wrapper (lead, partner and tip forms). */

export const inputClass =
  "mt-1.5 block w-full rounded-control border border-line-strong bg-surface-raised px-3.5 py-2.5 text-body text-ink focus-visible:outline-offset-0 placeholder:text-ink-muted/70 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger";

export const checkboxClass =
  "mt-0.5 h-5 w-5 shrink-0 rounded border-line-strong accent-[#14213D] aria-[invalid=true]:outline aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-danger";

export function Field({
  label,
  required,
  error,
  errorId,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  errorId: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-small font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent-dark">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (Pflichtfeld)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-small font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
