"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  lastCheckOptions,
  leadSchema,
  normalizeFormValues,
  siteCountOptions,
  toFieldErrors,
  wishOptions,
  type FieldErrors,
  type LeadInput,
} from "@/lib/lead-schema";
import { track } from "@/lib/analytics";
import { cta, home } from "@/content/home";
import { buttonClass } from "@/components/ui/Button";
import { Field, inputClass } from "./fields";

type Wish = LeadInput["wish"];

const submitLabels: Record<string, string> = {
  check: cta.primary,
  erstgespraech: "15-Minuten-Gespräch anfragen",
  pilot: "Pilotplatz anfragen",
  angebot: "Dieses Angebot anfordern",
};

function isWish(v: string | null): v is Wish {
  return !!v && wishOptions.some((o) => o.value === v);
}

type LeadFormProps = { initialWish?: Wish; successPath?: string };
type Prefill = { config?: string; sites?: string };

/** Reads ?wunsch=…, ?config=… and ?standorte=… so CTAs and the price calculator can prefill the form. */
function LeadFormWithParams(props: LeadFormProps) {
  const params = useSearchParams();
  const wish = params.get("wunsch");
  const config = params.get("config") ?? undefined;
  const sites = params.get("standorte") ?? undefined;
  return (
    <LeadFormInner
      {...props}
      initialWish={isWish(wish) ? wish : props.initialWish}
      prefill={{ config: wish === "angebot" ? config?.slice(0, 2000) : undefined, sites }}
      key={`${wish ?? "none"}-${config ?? ""}`}
    />
  );
}

export function LeadForm(props: LeadFormProps) {
  // The fallback renders the full form statically, so it is part of the prerendered HTML.
  return (
    <Suspense fallback={<LeadFormInner {...props} />}>
      <LeadFormWithParams {...props} />
    </Suspense>
  );
}

function LeadFormInner({
  initialWish = "check",
  successPath = "/danke",
  prefill = {},
}: LeadFormProps & { initialWish?: Wish; prefill?: Prefill }) {
  const router = useRouter();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const sitesDefault = siteCountOptions.some((o) => o.value === prefill.sites) ? prefill.sites : "";

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
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby={formError ? `${formId}-form-error` : undefined}>
      {/* The request type comes from the button that led here (?wunsch=…), not from a field. */}
      <input type="hidden" name="wish" value={initialWish} />
      {prefill.config && <input type="hidden" name="config" value={prefill.config} />}

      {prefill.config && (
        <div className="rounded-control border border-line bg-surface-2 px-4 py-3 text-small">
          <p className="font-semibold text-ink">Ihre Auswahl aus dem Preisrechner</p>
          <p className="mt-1 whitespace-pre-line text-ink-muted">{prefill.config}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} errorId={`${formId}-name-error`} htmlFor={`${formId}-name`}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="Firma" required error={errors.company} errorId={`${formId}-company-error`} htmlFor={`${formId}-company`}>
          <input {...fieldProps("company")} type="text" autoComplete="organization" required className={inputClass} />
        </Field>
        <Field label="E-Mail" required error={errors.email} errorId={`${formId}-email-error`} htmlFor={`${formId}-email`}>
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required className={inputClass} />
        </Field>
        <Field label="Telefon" required error={errors.phone} errorId={`${formId}-phone-error`} htmlFor={`${formId}-phone`}>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" required className={inputClass} />
        </Field>
        <Field label="Anzahl Standorte" required error={errors.sites} errorId={`${formId}-sites-error`} htmlFor={`${formId}-sites`}>
          <select {...fieldProps("sites")} required defaultValue={sitesDefault} className={inputClass}>
            <option value="" disabled>
              Bitte wählen
            </option>
            {siteCountOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Wann wurde zuletzt geprüft? (optional)" error={errors.lastCheck} errorId={`${formId}-lastCheck-error`} htmlFor={`${formId}-lastCheck`}>
          <select {...fieldProps("lastCheck")} defaultValue="" className={inputClass}>
            <option value="">Keine Angabe</option>
            {lastCheckOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive technology, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website (bitte leer lassen)</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div aria-live="polite" role="status">
        {formError && (
          <p id={`${formId}-form-error`} className="rounded-control border border-danger bg-danger-soft px-4 py-3 text-small font-medium text-danger">
            {formError}
          </p>
        )}
      </div>

      <div className="space-y-3 pt-1">
        <button type="submit" disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {submitting ? (
            "Wird gesendet …"
          ) : (
            <>
              {submitLabels[initialWish] ?? cta.primary}
            </>
          )}
        </button>
        <p className="text-small text-ink-muted">
          {home.contact.submitNote}{" "}
          <Link href="/datenschutz" className="font-semibold text-accent-dark underline underline-offset-2 hover:text-ink">
            Datenschutzerklärung
          </Link>
        </p>
      </div>
    </form>
  );
}
