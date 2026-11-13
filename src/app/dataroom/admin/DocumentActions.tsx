"use client";

import { useState } from "react";
import { DOCUMENT_CATEGORIES } from "@/lib/dataroom/rules-client";
import { deleteDocument, updateDocumentAccess } from "./actions";
import { adminInputClass, adminLabelClass } from "./CreateInvestorForm";

type Investor = { id: string; label: string };
const smallButton = "rounded-control border border-base px-3 py-1.5 text-small font-semibold text-ink hover:bg-surface-2";

export function DocumentActions({
  doc,
  granted,
  investors,
}: {
  doc: { id: string; title: string; category: string; visibility: "all" | "selected" };
  granted: string[];
  investors: Investor[];
}) {
  const [editing, setEditing] = useState(false);
  const [visibility, setVisibility] = useState(doc.visibility);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="mt-4">
      {!editing && (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setEditing(true)} className={smallButton}>
            Bearbeiten
          </button>
          {confirmDelete ? (
            <form action={deleteDocument} className="flex items-center gap-2">
              <input type="hidden" name="id" value={doc.id} />
              <span className="text-small text-danger">Datei endgültig löschen?</span>
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
      )}

      {editing && (
        <form action={updateDocumentAccess} onSubmit={() => setEditing(false)} className="space-y-3 rounded-control border border-line p-4">
          <input type="hidden" name="id" value={doc.id} />
          <div>
            <label htmlFor={`t-${doc.id}`} className={adminLabelClass}>
              Titel
            </label>
            <input id={`t-${doc.id}`} name="title" defaultValue={doc.title} required className={adminInputClass} />
          </div>
          <div>
            <label htmlFor={`c-${doc.id}`} className={adminLabelClass}>
              Kategorie
            </label>
            <input id={`c-${doc.id}`} name="category" list={`cats-${doc.id}`} defaultValue={doc.category} className={adminInputClass} />
            <datalist id={`cats-${doc.id}`}>
              {DOCUMENT_CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <fieldset className="text-small">
            <legend className={adminLabelClass}>Sichtbar für</legend>
            <label className="mt-2 flex items-center gap-2">
              <input type="radio" name="visibility" value="all" checked={visibility === "all"} onChange={() => setVisibility("all")} />
              Alle Investoren
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input type="radio" name="visibility" value="selected" checked={visibility === "selected"} onChange={() => setVisibility("selected")} />
              Nur ausgewählte
            </label>
            {visibility === "selected" && (
              <div className="mt-2 max-h-40 space-y-1.5 overflow-y-auto rounded-control border border-line p-3">
                {investors.map((i) => (
                  <label key={i.id} className="flex items-center gap-2">
                    <input type="checkbox" name="profileIds" value={i.id} defaultChecked={granted.includes(i.id)} />
                    {i.label}
                  </label>
                ))}
              </div>
            )}
          </fieldset>
          <div className="flex gap-2">
            <button type="submit" className="rounded-control bg-base px-3 py-1.5 text-small font-semibold text-white">
              Speichern
            </button>
            <button type="button" onClick={() => setEditing(false)} className={smallButton}>
              Abbrechen
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
