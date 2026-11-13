import { NextResponse, type NextRequest } from "next/server";
import { handleTip } from "@/lib/partner-handler";
import { TIP_MAX_FILE_BYTES } from "@/lib/partner-schema";
import { sendPartnerEmail, sendTipEmail } from "@/lib/server/partner-email";
import { rateLimit } from "@/lib/server/rate-limit";
import { clientIp } from "@/lib/server/request";

export const dynamic = "force-dynamic";

/** Room for the form fields next to the largest allowed PDF. */
const MAX_BODY_BYTES = TIP_MAX_FILE_BYTES + 256 * 1024;

/**
 * "Tipp einreichen": multipart/form-data with an optional PDF ("report"), validated with zod,
 * sent by email (PDF attached) to PARTNER_INBOX. Nothing is stored on the server.
 */
export async function POST(req: NextRequest) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Die Datei ist zu groß (höchstens 4 MB)." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const fields: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) if (typeof value === "string") fields[key] = value;
  const upload = form.get("report");
  const file =
    upload instanceof File && upload.size > 0
      ? { name: upload.name, type: upload.type, size: upload.size, bytes: async () => new Uint8Array(await upload.arrayBuffer()) }
      : null;

  const result = await handleTip(fields, file, clientIp(req), {
    sendPartner: sendPartnerEmail,
    sendTip: sendTipEmail,
    rateLimit,
    now: Date.now,
    log: (msg, extra) => console.warn(`[tipp] ${msg}`, extra ?? ""),
  });
  return NextResponse.json(result.body, { status: result.status });
}
