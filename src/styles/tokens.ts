/**
 * HeyMeister design tokens, following the HeyMeister Brandbook v1 (November 2026).
 *
 * Consumed by tailwind.config.ts, which also emits every color as a CSS variable
 * (`--hm-<name>` as hex and `--hm-<name>-rgb` as channels) on :root, so the same
 * values can be reused in the customer portal, technician app, Ops engine and CRM.
 *
 * Ratio: 80 % paper and white, 15 % navy, 5 % coral. Coral is scarce, that is why it works.
 * Contrast rules are enforced in tests/basics.test.ts.
 */
export const colors = {
  /** Koralle: accent. "Hey", buttons, links, icons, display text. 3.5:1 on paper: never body text. */
  accent: "#E4572E",
  /** Koralle-Dunkel: button hover and small text in the accent colour (4.6:1 on paper). */
  "accent-dark": "#C4461F",
  /** Koralle-Hell: tinted backgrounds; accent text on navy. */
  "accent-light": "#FDE4DC",
  /** Navy: "Meister", headings, text, dark surfaces. */
  base: "#14213D",
  /** Navy-Hell: secondary dark surface. */
  "base-light": "#2B3A5C",
  /** Papier: page background, never pure white. */
  surface: "#FBFBF8",
  /** Weiß: cards on paper ("depth comes from white on paper"). */
  "surface-raised": "#FFFFFF",
  /** Fläche-2: table heads, muted sections. */
  "surface-2": "#F1F1EC",
  /** Secondary text on light surfaces. */
  "ink-muted": "#4A5568",
  /** Secondary text on navy. */
  "ink-inverse-muted": "#B9C1D0",
  /** 1 px borders of cards, tables and dividers. */
  line: "#E1E0DA",
  /** Input borders (needs 3:1 against the background). */
  "line-strong": "#7B8494",
  /**
   * Status colours, separate from the brand. Critical is a different red than coral,
   * so "overdue" never looks like the brand. Always next to a word or check mark.
   */
  success: "#1D7342",
  "success-soft": "#E2F3E8",
  warning: "#8A5A00",
  "warning-soft": "#FDF0D5",
  danger: "#B42318",
  "danger-soft": "#FBE4E2",
  /** Keyboard focus ring: blue, distinct from coral and critical. */
  focus: "#1F4FD8",
  /** Visible placeholder for missing content. Intentionally off-brand. */
  placeholder: "#6D28D9",
  "placeholder-soft": "#F4EEFF",
} as const;

export type ColorToken = keyof typeof colors;

const fallback = ["Segoe UI", "Arial", "sans-serif"];

export const fontFamily = {
  /** Poppins 700: display and headings (the typeface of the wordmark). */
  display: ["var(--font-poppins)", ...fallback],
  /** Inter 400/600: body text, tables, forms. */
  sans: ["var(--font-inter)", ...fallback],
  /** JetBrains Mono 500: measurements, device IDs, inspection numbers, dates in tables. */
  mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
};

/** Type scale from the brandbook (size / line height in px). */
export const fontSize = {
  "display-xl": ["4rem", { lineHeight: "4.25rem", letterSpacing: "-0.02em" }], // 64/68
  "display-l": ["2.75rem", { lineHeight: "3.125rem", letterSpacing: "-0.02em" }], // 44/50
  heading: ["1.75rem", { lineHeight: "2.125rem", letterSpacing: "-0.01em" }], // 28/34
  subheading: ["1.25rem", { lineHeight: "1.75rem" }], // 20/28
  body: ["1rem", { lineHeight: "1.5rem" }], // 16/24
  small: ["0.875rem", { lineHeight: "1.25rem" }], // 14/20
  label: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em" }], // 12/16, uppercase
  data: ["0.875rem", { lineHeight: "1.25rem" }], // mono 14/20
} as const;

export const radius = {
  /** Buttons and inputs */
  control: "10px",
  /** Cards, photos, panels */
  card: "16px",
  /** App icon: 22 % of the side */
  iconRatio: 0.22,
};

export const layout = {
  maxWidth: "1200px",
  /** Body text at most 65 characters wide. */
  measure: "65ch",
};

/** Text/background pairs used in the UI. Each must reach WCAG AA (4.5:1). */
export const contrastPairs: Array<[fg: ColorToken, bg: ColorToken]> = [
  ["base", "surface"],
  ["base", "surface-raised"],
  ["base", "surface-2"],
  ["ink-muted", "surface"],
  ["ink-muted", "surface-raised"],
  ["ink-muted", "surface-2"],
  ["accent-dark", "surface"], // small accent text, links
  ["accent-dark", "surface-raised"],
  ["accent-light", "base"], // small accent text on navy
  ["surface", "base"],
  ["surface", "base-light"],
  ["ink-inverse-muted", "base"],
  ["success", "success-soft"],
  ["warning", "warning-soft"],
  ["danger", "danger-soft"],
  ["danger", "surface-raised"], // form errors
  ["placeholder", "placeholder-soft"],
];

/**
 * Large text (≥ 18.66 px bold or ≥ 24 px) and UI graphics need 3:1.
 * Button labels on coral are set in 19 px bold for this reason (see Button.tsx).
 */
export const largeTextAndUiPairs: Array<[fg: ColorToken, bg: ColorToken]> = [
  ["surface-raised", "accent"], // primary button label
  ["surface-raised", "accent-dark"], // primary button hover
  ["accent", "surface"], // wordmark, icons, display text
  ["accent", "base"], // wordmark on navy, prices on navy
  ["line-strong", "surface-raised"], // input borders
  ["focus", "surface"],
  ["focus", "surface-raised"],
];
