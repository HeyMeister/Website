/**
 * HeyMeister design tokens — single source of truth.
 *
 * Consumed by tailwind.config.ts, which also emits every color as a CSS variable
 * (`--hm-<name>` as hex and `--hm-<name>-rgb` as channels) on :root, so the same
 * values can later be reused in the Ops engine and CRM.
 *
 * Contrast rules are enforced in tests/tokens.test.ts.
 */
export const colors = {
  /** Dark navy: text, header, dark surfaces. */
  base: "#14213D",
  /** Slightly lighter dark surface for cards on dark backgrounds. */
  "base-soft": "#1F2D4D",
  /**
   * Brand accent: "Hey", the dot, decorative highlights, icons, large display text.
   * Reaches only ~4.3:1 on base and ~3.6:1 with white, so it is NOT used for small text
   * or as a button background with small text. Use the derived tokens below for that.
   */
  accent: "#E4572E",
  /** Accent for primary buttons (white text) and accent text on light surfaces. */
  "accent-strong": "#CC4620",
  "accent-strong-hover": "#B03A18",
  /** Accent for small text on dark surfaces. */
  "accent-on-dark": "#F08A6C",
  /** Surfaces */
  surface: "#FBFBF8",
  "surface-raised": "#FFFFFF",
  "surface-muted": "#F1F1EC",
  /** Secondary text on light surfaces. */
  "ink-muted": "#4A5568",
  /** Secondary text on dark surfaces. */
  "ink-inverse-muted": "#B9C1D0",
  /** Borders and dividers. */
  line: "#E0E0D9",
  "line-strong": "#7B8494",
  /** Deadline traffic light (logbook mockup). Text-safe on light surfaces. */
  success: "#17733A",
  "success-soft": "#E6F4EA",
  warning: "#8F5600",
  "warning-soft": "#FFF4D6",
  danger: "#B42318",
  "danger-soft": "#FDECEA",
  /** Visible placeholder for missing content. Intentionally off-brand. */
  placeholder: "#6D28D9",
  "placeholder-soft": "#F4EEFF",
} as const;

export type ColorToken = keyof typeof colors;

export const fontFamily = {
  sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
};

export const layout = {
  maxWidth: "1200px",
};

/** Text/background pairs used in the UI. Each must reach WCAG AA (4.5:1). */
export const contrastPairs: Array<[fg: ColorToken, bg: ColorToken]> = [
  ["base", "surface"],
  ["base", "surface-raised"],
  ["base", "surface-muted"],
  ["ink-muted", "surface"],
  ["ink-muted", "surface-raised"],
  ["ink-muted", "surface-muted"],
  ["surface-raised", "accent-strong"], // primary button text
  ["surface-raised", "accent-strong-hover"],
  ["accent-strong", "surface"], // accent text links on light
  ["accent-strong", "surface-raised"],
  ["accent-on-dark", "base"], // accent text on dark
  ["accent-on-dark", "base-soft"],
  ["surface", "base"],
  ["surface", "base-soft"],
  ["ink-inverse-muted", "base"],
  ["ink-inverse-muted", "base-soft"],
  ["success", "surface-raised"],
  ["success", "success-soft"],
  ["warning", "surface-raised"],
  ["warning", "warning-soft"],
  ["danger", "surface-raised"],
  ["danger", "danger-soft"],
  ["placeholder", "placeholder-soft"],
];

/** Non-text pairs (icons, dots, borders of inputs) need 3:1 (WCAG 1.4.11). */
export const uiContrastPairs: Array<[fg: ColorToken, bg: ColorToken]> = [
  ["accent", "surface"],
  ["accent", "base"],
  ["line-strong", "surface"],
  ["line-strong", "surface-raised"],
];
