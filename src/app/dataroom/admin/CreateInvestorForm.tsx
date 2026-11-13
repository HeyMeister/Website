"use client";

import { useActionState, useEffect, useRef } from "react";
import { buttonClass } from "@/components/ui/Button";
import { createInvestor, type CredentialState } from "./actions";
import { CredentialResult } from "./CredentialResult";

export const adminInputClass =
  "mt-1.5 block w-full rounded-control border border-line-strong bg-surface-raised px-3 py-2 text-body text-ink focus-visible:outline-offset-0";
export const adminLabelClass = "block text-small font-semibold text-ink";

export function CreateInvestorForm() {
  const [state, action, pending] = useActionState<CredentialState, FormData>(createInvestor, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") formRef.current?.reset();
  }, [state]);

  return (
    <>
      <form ref={formRef} action={action} className="space-y-4">
        <div>
          <label htmlFor="fullName" className={adminLabelClass}>
            Name *
          </label>
          <input id="fullName" name="fullName" required className={adminInputClass} />
        </div>
        <div>
          <label htmlFor="inv-email" className={adminLabelClass}>
            E-Mail *
          </label>
          <input id="inv-email" name="email" type="email" required autoComplete="off" className={adminInputClass} />
        </div>
        <div>
          <label htmlFor="company" className={adminLabelClass}>
            Firma / Fonds
          </label>
          <input id="company" name="company" className={adminInputClass} />
        </div>
        <div>
          <label htmlFor="expiresAt" className={adminLabelClass}>
            Zugang gültig bis
          </label>
          <input id="expiresAt" name="expiresAt" type="date" className={adminInputClass} />
          <p className="mt-1 text-small text-ink-muted">Leer lassen für unbegrenzt.</p>
        </div>
        <div>
          <label htmlFor="role" className={adminLabelClass}>
            Rolle
          </label>
          <select id="role" name="role" defaultValue="investor" className={adminInputClass}>
            <option value="investor">Investor (nur lesen)</option>
            <option value="admin">Admin (verwalten)</option>
          </select>
        </div>
        <div>
          <label htmlFor="note" className={adminLabelClass}>
            Interne Notiz
          </label>
          <input id="note" name="note" className={adminInputClass} />
        </div>
        {state.status === "error" && (
          <p className="rounded-control border border-danger bg-danger-soft px-3 py-2 text-small font-medium text-danger" role="alert">
            {state.error}
          </p>
        )}
        <button type="submit" disabled={pending} className={buttonClass("primary", "md", "w-full")}>
          {pending ? "Wird angelegt …" : "Zugang anlegen"}
        </button>
      </form>
      {state.status === "ok" && <CredentialResult email={state.email} password={state.password} message={state.message} />}
    </>
  );
}
