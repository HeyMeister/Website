import { createHmac } from "node:crypto";

export const SIGNATURE_HEADER = "X-HeyMeister-Signature";
export const TIMESTAMP_HEADER = "X-HeyMeister-Timestamp";

/**
 * HMAC-SHA256 over "<timestamp>.<body>". The receiver should recompute it with the shared
 * secret, compare in constant time and reject timestamps older than a few minutes.
 */
export function signPayload(body: string, secret: string, timestamp: number): string {
  return `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
}

export async function postSignedWebhook(
  url: string,
  secret: string,
  payload: unknown,
  opts: { now?: number; fetchImpl?: typeof fetch; timeoutMs?: number } = {},
): Promise<void> {
  const body = JSON.stringify(payload);
  const ts = Math.floor((opts.now ?? Date.now()) / 1000);
  const res = await (opts.fetchImpl ?? fetch)(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [SIGNATURE_HEADER]: signPayload(body, secret, ts),
      [TIMESTAMP_HEADER]: String(ts),
    },
    body,
    signal: AbortSignal.timeout(opts.timeoutMs ?? 5000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}
