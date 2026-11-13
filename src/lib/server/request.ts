import "server-only";
import type { NextRequest } from "next/server";

/** Client IP for rate limiting (first hop of x-forwarded-for on Vercel). */
export function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
