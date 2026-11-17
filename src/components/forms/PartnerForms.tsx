"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { normalizeFormValues } from "@/lib/lead-schema";
import {
  fieldErrors,
  partnerSchema,
  partnerServices,
  partnerTeamSizes,
  type PartnerFieldErrors,
} from "@/lib/partner-schema";
import { CheckIcon } from "@/components/icons";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";
import { Field, checkboxClass, inputClass } from "./fields";

/**
 * Client form for /partner ("Als Fachpartner bewerben"). It validates in the browser with the same zod schema the server
 * uses, carry the honeypot and the fill-time stamp, and show success inline (no page change).
 */

type Errors = Record<string, string | undefined>;

function useFormBasics() {
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  return startedAt;
}

function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label htmlFor={`${id}-website`}>Website (bitte leer lassen)</label>
      <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

function Success({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex gap-4 rounded-card border border-success bg-success-soft p-6 outline-none">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-white">
        <CheckIcon className="h-5 w-5" strokeWidth={2.8} />
      </span>
      <p className="pt-1.5 font-semibold text-ink">{children}</p>
    </div>
  );
}

function FormError({ id, message }: { id: string; message: string | null }) {
  return (
    <div aria-live="polite" role="status">
      {message && (
        <p id={id} className="rounded-control border border-danger bg-danger-soft px-4 py-3 text-small font-medium text-danger">
          {message}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  name,
  id,
  error,
  children,
}: {
  name: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer gap-3 text-small text-ink">
        <input
          id={id}
          name={name}
          type="checkbox"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={checkboxClass}
        />
        <span>
          {children}
          <span aria-hidden="true" className="text-accent-dark">
            {" "}
            *
          </span>
          <span className="sr-only"> (Pflichtfeld)</span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-small font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function focusFirst(form: HTMLFormElement | null, errs: Errors) {
  const first = Object.keys(errs).find((k) => errs[k]);
  if (first) form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

const props = (formId: string, errors: Errors) => (name: string) => ({
  id: `${formId}-${name}`,
  name,
  "aria-invalid": errors[name] ? true : undefined,
  "aria-describedby": errors[name] ? `${formId}-${name}-error` : undefined,
});

/* ------------------------------------------------------------------------------------------ */

export function PartnerSignupForm({ submitLabel, successText }: { submitLabel: string; successText: string }) {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useFormBasics();
  const [errors, setErrors] = useState<PartnerFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const p = props(formId, errors);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const values = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = partnerSchema.safeParse(normalizeFormValues(values));
    if (!parsed.success) {
      const errs = fieldErrors<keyof PartnerFieldErrors>(parsed.error);
      setErrors(errs);
      setFormError("Bitte prüfen Sie die markierten Felder.");
      focusFirst(formRef.current, errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current ?? Date.now() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: PartnerFieldErrors };
      if (res.ok && data.ok) {
        setDone(true);
        return;
      }
      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirst(formRef.current, data.fieldErrors);
      }
      setFormError(data.error ?? "Ihre Angaben konnten nicht gesendet werden. Bitte versuchen Sie es später erneut.");
    } catch {
      setFormError("Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return <Success>{successText}</Success>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby={formError ? `${formId}-form-error` : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Betrieb" required error={errors.company} errorId={`${formId}-company-error`} htmlFor={`${formId}-company`}>
          <input {...p("company")} type="text" autoComplete="organization" required className={inputClass} />
        </Field>
        <Field label="Ansprechpartner" required error={errors.name} errorId={`${formId}-name-error`} htmlFor={`${formId}-name`}>
          <input {...p("name")} type="text" autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="E-Mail" required error={errors.email} errorId={`${formId}-email-error`} htmlFor={`${formId}-email`}>
          <input {...p("email")} type="email" autoComplete="email" inputMode="email" required className={inputClass} />
        </Field>
        <Field label="Telefon" error={errors.phone} errorId={`${formId}-phone-error`} htmlFor={`${formId}-phone`}>
          <input {...p("phone")} type="tel" autoComplete="tel" className={inputClass} />
        </Field>
        <Field label="Einsatzgebiet" required error={errors.region} errorId={`${formId}-region-error`} htmlFor={`${formId}-region`}>
          <input {...p("region")} type="text" required placeholder="z. B. PLZ 40 bis 42" className={inputClass} />
        </Field>
        <Field label="Leistungen" required error={errors.services} errorId={`${formId}-services-error`} htmlFor={`${formId}-services`}>
          <select {...p("services")} required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Bitte wählen
            </option>
            {partnerServices.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Mitarbeitende" error={errors.teamSize} errorId={`${formId}-teamSize-error`} htmlFor={`${formId}-teamSize`}>
          <select {...p("teamSize")} defaultValue="" className={inputClass}>
            <option value="">Keine Angabe</option>
            {partnerTeamSizes.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Anmerkungen" error={errors.message} errorId={`${formId}-message-error`} htmlFor={`${formId}-message`}>
        <textarea {...p("message")} rows={3} placeholder="z. B. Qualifikationen, freie Kapazität" className={inputClass} />
      </Field>
      <Honeypot id={formId} />
      <Checkbox name="privacy" id={`${formId}-privacy`} error={errors.privacy}>
        Ich habe die{" "}
        <Link href="/datenschutz" className="font-semibold text-accent-dark underline underline-offset-2 hover:text-ink">
          Datenschutzerklärung
        </Link>{" "}
        gelesen.
      </Checkbox>
      <FormError id={`${formId}-form-error`} message={formError} />
      <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full whitespace-nowrap sm:w-auto")}>
        {submitting ? (
          "Wird gesendet …"
        ) : (
          <>
            {submitLabel}
            <ButtonArrow />
          </>
        )}
      </button>
    </form>
  );
}
