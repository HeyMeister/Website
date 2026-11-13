"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  industries,
  lastCheckOptions,
  leadSchema,
  normalizeFormValues,
  toFieldErrors,
  wishOptions,
  type FieldErrors,
  type LeadInput,
} from "@/lib/lead-schema";
import { track } from "@/lib/analytics";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ButtonArrow, buttonClass } from "@/components/ui/Button";

type Wish = LeadInput["wish"];

function isWish(v: string | null): v is Wish {
  return v === "angebot" || v === "erstgespraech" || v === "pilot";
}

/** Reads ?wunsch=… so CTAs can preselect the request type. */
function LeadFormWithParams(props: LeadFormProps) {
  const params = useSearchParams();
  const wish = params.get("wunsch");
  return <LeadFormInner {...props} initialWish={isWish(wish) ? wish : props.initialWish} key={wish ?? "none"} />;
}

type LeadFormProps = { initialWish?: Wish; successPath?: string };

export function LeadForm(props: LeadFormProps) {
  // The fallback renders the full form statically, so it is part of the prerendered HTML.
  return (
    <Suspense fallback={<LeadFormInner {...props} />}>
      <LeadFormWithParams {...props} />
    </Suspense>
  );
}

const inputClass =
  "mt-1.5 block w-full rounded-control border border-line-strong bg-surface-raised px-3.5 py-2.5 text-body text-ink focus-visible:outline-offset-0 placeholder:text-ink-muted/70 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger";

function LeadFormInner({ initialWish = "angebot", successPath = "/danke" }: LeadFormProps & { initialWish?: Wish }) {
  const router = useRouter();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Drives the submit label, so the button says exactly what happens next.
  const [wish, setWish] = useState<Wish>(initialWish);

  // Set on the client only: used for the "submitted < 3 s" spam check.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const values = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = leadSchema.safeParse(normalizeFormValues(values));
    if (!parsed.success) {
      const errs = toFieldErrors(parsed.error);
      setErrors(errs);
      setFormError("Bitte prüfen Sie die markierten Felder.");
      focusFirstError(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current ?? Date.now() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (res.ok && data.ok) {
        track("form_submit_success", { wish: parsed.data.wish });
        router.push(`${successPath}?wunsch=${parsed.data.wish}`);
        return;
      }
      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      }
      setFormError(data.error ?? "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an.");
    } catch {
      setFormError("Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung oder rufen Sie uns an.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldProps = (name: keyof LeadInput) => {
    const err = errors[name];
    return {
      id: `${formId}-${name}`,
      name,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${formId}-${name}-error` : undefined,
    };
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={formError ? `${formId}-form-error` : undefined}>
      <fieldset>
        <legend className="text-small font-semibold text-ink">Ihr Anliegen</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {wishOptions.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input
                type="radio"
                name="wish"
                value={o.value}
                defaultChecked={o.value === initialWish}
                onChange={() => setWish(o.value)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-[44px] items-center rounded-control border border-line-strong bg-surface-raised px-4 text-small font-medium text-ink peer-checked:border-base peer-checked:bg-base peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} errorId={`${formId}-name-error`} htmlFor={`${formId}-name`}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="Firma" required error={errors.company} errorId={`${formId}-company-error`} htmlFor={`${formId}-company`}>
          <input {...fieldProps("company")} type="text" autoComplete="organization" required className={inputClass} />
        </Field>
        <Field label="E-Mail" required error={errors.email} errorId={`${formId}-email-error`} htmlFor={`${formId}-email`}>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required className={inputClass} />
        </Field>
        <Field label="Telefon" error={errors.phone} errorId={`${formId}-phone-error`} htmlFor={`${formId}-phone`}>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" className={inputClass} />
        </Field>
        <Field label="Branche" error={errors.industry} errorId={`${formId}-industry-error`} htmlFor={`${formId}-industry`}>
          <select {...fieldProps("industry")} defaultValue="" className={inputClass}>
            <option value="">Bitte wählen</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Anzahl Standorte" required error={errors.sites} errorId={`${formId}-sites-error`} htmlFor={`${formId}-sites`}>
          <input {...fieldProps("sites")} type="number" min={1} max={1000} step={1} inputMode="numeric" required className={inputClass} />
        </Field>
        <Field label="PLZ des Hauptstandorts" error={errors.zip} errorId={`${formId}-zip-error`} htmlFor={`${formId}-zip`}>
          <input {...fieldProps("zip")} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} className={inputClass} />
        </Field>
        <Field label="Wann wurde zuletzt geprüft?" error={errors.lastCheck} errorId={`${formId}-lastCheck-error`} htmlFor={`${formId}-lastCheck`}>
          <select {...fieldProps("lastCheck")} defaultValue="" className={inputClass}>
            <option value="">Bitte wählen</option>
            {lastCheckOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Nachricht" error={errors.message} errorId={`${formId}-message-error`} htmlFor={`${formId}-message`}>
        <textarea {...fieldProps("message")} rows={4} className={inputClass} />
      </Field>

      {/* Honeypot: hidden from people and assistive technology, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website (bitte leer lassen)</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <p className="text-small text-ink-muted">
        Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Details in der{" "}
        <Link href="/datenschutz" className="font-semibold text-accent-dark underline underline-offset-2 hover:text-ink">
          Datenschutzerklärung
        </Link>
        . Pflichtfelder sind mit * markiert.
      </p>

      <div aria-live="polite" role="status">
        {formError && (
          <p id={`${formId}-form-error`} className="rounded-control border border-danger bg-danger-soft px-4 py-3 text-small font-medium text-danger">
            {formError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {submitting ? (
            "Wird gesendet …"
          ) : (
            <>
              {home.contact.submit[wish]}
              <ButtonArrow />
            </>
          )}
        </button>
        <p className="text-small text-ink-muted">
          {home.contact.submitNote} Antwort {site.contact.responseTime}.
        </p>
      </div>
    </form>
  );
}

function Field({
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
