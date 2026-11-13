/**
 * Pure data-room rules (no I/O), unit-tested in tests/dataroom.test.ts.
 */
import { randomInt } from "node:crypto";

export * from "./rules-client";

export type Role = "admin" | "investor";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  company: string | null;
  role: Role;
  active: boolean;
  expires_at: string | null;
  note: string | null;
  created_at: string;
  last_login_at: string | null;
};

export type DocumentRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  storage_path: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  visibility: "all" | "selected";
  sort_order: number;
  created_at: string;
};

/** A profile may use the data room if it is active and not expired. */
export function isProfileUsable(profile: Pick<Profile, "active" | "expires_at">, now: Date = new Date()): boolean {
  if (!profile.active) return false;
  if (profile.expires_at && new Date(profile.expires_at).getTime() <= now.getTime()) return false;
  return true;
}

/** Admins see everything; investors see "all" documents plus "selected" ones granted to them. */
export function canAccessDocument(
  profile: Pick<Profile, "id" | "role">,
  doc: Pick<DocumentRow, "id" | "visibility">,
  grantedDocumentIds: ReadonlySet<string>,
): boolean {
  if (profile.role === "admin") return true;
  if (doc.visibility === "all") return true;
  return grantedDocumentIds.has(doc.id);
}

// No 0/O, 1/l/I to avoid mistakes when passwords are passed on by phone or chat.
const ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Readable random password, 4 groups of 5 characters (~117 bits of entropy). */
export function generatePassword(groups = 4, groupLength = 5): string {
  const out: string[] = [];
  for (let g = 0; g < groups; g++) {
    let s = "";
    for (let i = 0; i < groupLength; i++) s += ALPHABET[randomInt(ALPHABET.length)];
    out.push(s);
  }
  return out.join("-");
}

