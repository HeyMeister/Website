import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, fontFamily, fontSize, layout, radius } from "./src/styles/tokens";
import { hexToRgb } from "./src/lib/contrast";

// Every token is exposed as a CSS variable on :root and Tailwind colours point at those
// variables, so portal, app, Ops engine and CRM can reuse the exact same values.
const cssVars: Record<string, string> = {};
const themeColors: Record<string, string> = {};
for (const [name, hex] of Object.entries(colors)) {
  cssVars[`--hm-${name}`] = hex;
  cssVars[`--hm-${name}-rgb`] = hexToRgb(hex).join(" ");
  themeColors[name] = `rgb(var(--hm-${name}-rgb) / <alpha-value>)`;
}
// "text-base" would clash with Tailwind's font-size utility, so the navy base colour is
// exposed as "ink" in the general palette (text-ink, …) and as "base" only for
// backgrounds, borders, rings and outlines (bg-base, border-base, …).
const baseColor = themeColors.base!;
const baseLightColor = themeColors["base-light"]!;
delete themeColors.base;
delete themeColors["base-light"];
themeColors.ink = baseColor;
const baseOnly = { base: baseColor, "base-light": baseLightColor };

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
      fontSize: fontSize as unknown as Record<string, [string, Record<string, string>]>,
      maxWidth: {
        content: layout.maxWidth,
        prose: layout.measure,
      },
      borderRadius: {
        control: radius.control,
        card: radius.card,
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
