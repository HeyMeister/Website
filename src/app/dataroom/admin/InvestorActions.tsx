"use client";

import { useActionState, useState } from "react";
import { deleteInvestor, resetInvestorPassword, setInvestorBlocked, type CredentialState } from "./actions";
import { CredentialResult } from "./CredentialResult";

const smallButton = "rounded-control border border-base px-3 py-1.5 text-small font-semibold text-ink hover:bg-surface-2 disabled:opacity-60";

export function InvestorActions({ id, name, active }: { id: string; name: string; active: boolean }) {
  const [state, resetAction, resetting] = useActionState<CredentialState, FormData>(resetInvestorPassword, { status: "idle" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        <form action={resetAction}>
          <input type="hidden" name="id" value={id} />
          <button type="submit" disabled={resetting} className={smallButton}>
            {resetting ? "…" : "Neues Passwort"}
          </button>
        </form>
        <form action={setInvestorBlocked}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="block" value={String(active)} />
          <button type="submit" className={smallButton}>
            {active ? "Sperren" : "Entsperren"}
          </button>
        </form>
        {confirmDelete ? (
          <form action={deleteInvestor} className="flex items-center gap-2">
            <input type="hidden" name="id" value={id} />
            <span className="text-small text-danger">{name} endgültig löschen?</span>
            <button type="submit" className="rounded-control bg-danger px-3 py-1.5 text-small font-semibold text-white">
              Löschen
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} className={smallButton}>
              Abbrechen
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)} className={`${smallButton} border-danger text-danger`}>
            Löschen
          </button>
        )}
      </div>
      {state.status === "error" && <p className="mt-2 text-small text-danger">{state.error}</p>}
      {state.status === "ok" && <CredentialResult email={state.email} password={state.password} message={state.message} />}
    </div>
  );
}
