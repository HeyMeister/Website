import { NextResponse, type NextRequest } from "next/server";
import { handlePartner } from "@/lib/partner-handler";
import { sendPartnerEmail, sendTipEmail } from "@/lib/server/partner-email";
import { rateLimit } from "@/lib/server/rate-limit";
import { clientIp } from "@/lib/server/request";

export const dynamic = "force-dynamic";

/** "Partner werden": JSON body, validated with zod, sent by email to PARTNER_INBOX. */
export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
  const result = await handlePartner(raw, clientIp(req), {
    sendPartner: sendPartnerEmail,
    sendTip: sendTipEmail,
    rateLimit,
    now: Date.now,
    log: (msg, extra) => console.warn(`[partner] ${msg}`, extra ?? ""),
  });
  return NextResponse.json(result.body, { status: result.status });
}
