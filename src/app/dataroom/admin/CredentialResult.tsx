"use client";

import { useState } from "react";

/** Shows freshly generated credentials once, with copy buttons. They are not stored anywhere. */
export function CredentialResult({ email, password, message }: { email: string; password: string; message: string }) {
  const [copied, setCopied] = useState<"password" | "message" | null>(null);
  const copy = async (text: string, what: "password" | "message") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };
  return (
    <div className="mt-4 rounded-control border border-success bg-success-soft p-4 text-small text-ink" role="status">
      <p className="font-semibold text-success">Zugangsdaten erstellt. Das Passwort wird nur jetzt angezeigt.</p>
      <dl className="mt-3 space-y-1">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-ink-muted">E-Mail</dt>
          <dd className="font-mono text-data">{email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-ink-muted">Passwort</dt>
          <dd className="select-all font-mono text-data">{password}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => copy(password, "password")} className="rounded-control border border-base bg-surface-raised px-3 py-2 font-semibold">
          {copied === "password" ? "Kopiert" : "Passwort kopieren"}
        </button>
        <button type="button" onClick={() => copy(message, "message")} className="rounded-control border border-base bg-surface-raised px-3 py-2 font-semibold">
          {copied === "message" ? "Kopiert" : "Nachricht mit Zugangsdaten kopieren"}
        </button>
      </div>
    </div>
  );
}
