/**
 * Placeholders are written as text in square brackets, e.g. "[TELEFON]".
 * They render as clearly visible markers (see <Fill />) and block a public launch
 * when they appear in content/legal.ts (see scripts/check-launch.ts).
 */
export const PLACEHOLDER_PATTERN = /\[[^\]\n]+\]/g;

export function hasPlaceholder(value: string | null | undefined): boolean {
  if (!value) return false;
  return new RegExp(PLACEHOLDER_PATTERN.source).test(value);
}

/** Splits text into plain and placeholder segments for rendering. */
export function splitPlaceholders(text: string): Array<{ text: string; placeholder: boolean }> {
  const out: Array<{ text: string; placeholder: boolean }> = [];
  let last = 0;
  for (const m of text.matchAll(PLACEHOLDER_PATTERN)) {
    const start = m.index ?? 0;
    if (start > last) out.push({ text: text.slice(last, start), placeholder: false });
    out.push({ text: m[0], placeholder: true });
    last = start + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), placeholder: false });
  return out;
}

/** Recursively collects every placeholder in an object tree, with its path. */
export function findPlaceholders(value: unknown, path = ""): Array<{ path: string; match: string }> {
  if (typeof value === "string") {
    return [...value.matchAll(PLACEHOLDER_PATTERN)].map((m) => ({ path, match: m[0] }));
  }
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => findPlaceholders(v, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => findPlaceholders(v, path ? `${path}.${k}` : k));
  }
  return [];
}
