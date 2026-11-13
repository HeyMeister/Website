import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, fontFamily, layout } from "./src/styles/tokens";
import { hexToRgb } from "./src/lib/contrast";

// Every token is exposed as a CSS variable on :root and Tailwind colors point at those
// variables, so Ops engine and CRM can reuse the exact same values.
const cssVars: Record<string, string> = {};
const themeColors: Record<string, string> = {};
for (const [name, hex] of Object.entries(colors)) {
  cssVars[`--hm-${name}`] = hex;
  cssVars[`--hm-${name}-rgb`] = hexToRgb(hex).join(" ");
  themeColors[name] = `rgb(var(--hm-${name}-rgb) / <alpha-value>)`;
}
// "text-base" is Tailwind's font-size utility. To avoid a clash the base colour is exposed
// as "ink" in the general palette (text-ink, bg-ink, …) and as "base" only for
// backgrounds, borders, rings and outlines (bg-base, border-base, …).
const baseColor = themeColors.base!;
delete themeColors.base;
themeColors.ink = baseColor;
const baseOnly = { base: baseColor };

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: themeColors,
      backgroundColor: baseOnly,
      borderColor: baseOnly,
      ringColor: baseOnly,
      outlineColor: baseOnly,
      fontFamily,
      maxWidth: {
        content: layout.maxWidth,
        prose: "70ch",
      },
      fontSize: {
        // Body text 16–18px
        base: ["1rem", { lineHeight: "1.65" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
      },
      borderRadius: {
        card: "0.75rem",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({ ":root": cssVars });
    }),
  ],
};

export default config;
