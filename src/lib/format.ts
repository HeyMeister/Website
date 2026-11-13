/**
 * German number/date formatting.
 * Euro: decimal comma and a (non-breaking) space before the sign, e.g. "29 €", "1.234,50 €".
 */
const NBSP = " ";

export function formatEuro(value: number, opts: { cents?: boolean } = {}): string {
  const showCents = opts.cents ?? !Number.isInteger(value);
  const num = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(value);
  return `${num}${NBSP}€`;
}

export function formatPercent(value: number): string {
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 }).format(value)}${NBSP}%`;
}

/** TT.MM.JJJJ */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(d);
}
