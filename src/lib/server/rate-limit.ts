import "server-only";

/**
 * Fixed-window rate limit per key.
 * Uses Upstash Redis (REST) when RATE_LIMIT_UPSTASH_URL/TOKEN are set, otherwise an
 * in-memory map (per serverless instance — fine as a fallback, not as the only defence).
 * Fails open: a broken limiter must not block real customers.
 */
const memory = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(key: string): Promise<{ allowed: boolean }> {
  const max = Number(process.env.RATE_LIMIT_MAX) || 5;
  const windowSec = Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 600;
  const url = process.env.RATE_LIMIT_UPSTASH_URL;
  const token = process.env.RATE_LIMIT_UPSTASH_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", `hm:rl:${key}`],
          ["EXPIRE", `hm:rl:${key}`, String(windowSec), "NX"],
        ]),
        signal: AbortSignal.timeout(2000),
      });
      const data = (await res.json()) as Array<{ result?: number }>;
      const count = Number(data[0]?.result ?? 0);
      return { allowed: count <= max };
    } catch (err) {
      console.error("[rate-limit] upstash failed, allowing request", err);
      return { allowed: true };
    }
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return { allowed: true };
  }
  entry.count += 1;
  return { allowed: entry.count <= max };
}
