import "server-only";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient, isDataroomConfigured } from "./supabase";
import { isProfileUsable, type Profile } from "./rules";

/** Current user's profile, or null if not signed in, unknown, blocked or expired. */
export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isDataroomConfigured()) return null;
  const supabase = await createSessionClient();
  // getUser() validates the session with Supabase (not just the cookie contents).
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: profile } = await createAdminClient()
    .from("dataroom_profiles")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle<Profile>();
  if (!profile || !isProfileUsable(profile)) return null;
  return profile;
}

export async function requireProfile(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/dataroom/login");
  return profile;
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await requireProfile();
  if (profile.role !== "admin") redirect("/dataroom");
  return profile;
}

export async function logEvent(
  action: "login" | "view" | "download" | "upload" | "delete" | "invite" | "reset" | "block" | "unblock",
  profileId: string | null,
  documentId: string | null = null,
): Promise<void> {
  const { error } = await createAdminClient()
    .from("dataroom_events")
    .insert({ action, profile_id: profileId, document_id: documentId });
  if (error) console.error("[dataroom] event log failed", error.message);
}
