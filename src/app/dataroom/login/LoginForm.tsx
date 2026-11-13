"use client";

import { useActionState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { signIn, type LoginState } from "../actions";

const inputClass =
  "mt-1.5 block w-full rounded-control border border-line-strong bg-surface-raised px-3.5 py-2.5 text-body text-ink focus-visible:outline-offset-0";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: null });
  return (
    <form action={action} className="space-y-5" aria-describedby={state.error ? "login-error" : undefined}>
      <div>
        <label htmlFor="email" className="block text-small font-semibold text-ink">
          E-Mail
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="block text-small font-semibold text-ink">
          Passwort
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <div aria-live="polite" role="status">
        {state.error && (
          <p id="login-error" className="rounded-control border border-danger bg-danger-soft px-4 py-3 text-small font-medium text-danger">
            {state.error}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending} className={buttonClass("primary", "lg", "w-full")}>
        {pending ? "Anmeldung läuft …" : "Anmelden"}
      </button>
    </form>
  );
}
