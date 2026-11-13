import { NextResponse, type NextRequest } from "next/server";
import { getCurrentProfile, logEvent } from "@/lib/dataroom/auth";
import { getAccessibleDocument } from "@/lib/dataroom/documents";
import { BUCKET, createAdminClient } from "@/lib/dataroom/supabase";

export const dynamic = "force-dynamic";

/**
 * Access-checked file delivery: verifies session and permission, logs the event, then redirects
 * to a signed URL that expires after 60 seconds. Files never pass through this function, so
 * there is no response size limit.
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.redirect(new URL("/dataroom/login", req.url));

  const doc = await getAccessibleDocument(profile, id);
  if (!doc) return new NextResponse("Nicht gefunden.", { status: 404 });

  const mode = req.nextUrl.searchParams.get("mode") === "download" ? "download" : "view";
  const { data, error } = await createAdminClient()
    .storage.from(BUCKET)
    .createSignedUrl(doc.storage_path, 60, mode === "download" ? { download: doc.file_name } : undefined);
  if (error || !data) return new NextResponse("Datei ist nicht verfügbar.", { status: 500 });

  // Admin previews are not logged, so the activity log shows investor behaviour only.
  if (profile.role !== "admin") await logEvent(mode, profile.id, doc.id);

  return NextResponse.redirect(data.signedUrl, { headers: { "Cache-Control": "no-store" } });
}
