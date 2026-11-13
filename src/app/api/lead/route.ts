import { NextResponse, type NextRequest } from "next/server";
import { handleLead } from "@/lib/lead-handler";
import { sendLeadEmail } from "@/lib/server/email";
import { rateLimit } from "@/lib/server/rate-limit";
import { postSignedWebhook } from "@/lib/webhook";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const webhookSecret = process.env.CRM_WEBHOOK_SECRET;

  const result = await handleLead(raw, clientIp(req), {
    sendEmail: sendLeadEmail,
    postWebhook:
      webhookUrl && webhookSecret
        ? (lead, meta) => postSignedWebhook(webhookUrl, webhookSecret, { type: "lead", ...meta, lead })
        : null,
    rateLimit,
    now: Date.now,
    log: (msg, extra) => console.warn(`[lead] ${msg}`, extra ?? ""),
  });

  return NextResponse.json(result.body, { status: result.status });
}
