import "server-only";
import { createAdminClient } from "./supabase";
import { canAccessDocument, type DocumentRow, type Profile } from "./rules";

async function grantedIds(profileId: string): Promise<Set<string>> {
  const { data } = await createAdminClient()
    .from("dataroom_document_access")
    .select("document_id")
    .eq("profile_id", profileId);
  return new Set((data ?? []).map((r: { document_id: string }) => r.document_id));
}

/** Documents the profile may see, ordered by category, sort order and date. */
export async function listAccessibleDocuments(profile: Profile): Promise<DocumentRow[]> {
  const { data, error } = await createAdminClient()
    .from("dataroom_documents")
    .select("*")
    .order("category")
    .order("sort_order")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const granted = profile.role === "admin" ? new Set<string>() : await grantedIds(profile.id);
  return (data as DocumentRow[]).filter((d) => canAccessDocument(profile, d, granted));
}

/** Single document if the profile may access it, otherwise null. */
export async function getAccessibleDocument(profile: Profile, documentId: string): Promise<DocumentRow | null> {
  const { data } = await createAdminClient()
    .from("dataroom_documents")
    .select("*")
    .eq("id", documentId)
    .maybeSingle<DocumentRow>();
  if (!data) return null;
  const granted = profile.role === "admin" || data.visibility === "all" ? new Set<string>() : await grantedIds(profile.id);
  return canAccessDocument(profile, data, granted) ? data : null;
}

export function groupByCategory(docs: DocumentRow[]): Array<[string, DocumentRow[]]> {
  const map = new Map<string, DocumentRow[]>();
  for (const d of docs) map.set(d.category, [...(map.get(d.category) ?? []), d]);
  return [...map.entries()];
}
