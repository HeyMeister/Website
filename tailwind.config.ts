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
      // Hero mockup. Used only with motion-safe:, so reduced-motion users see the static state.
      keyframes: {
        "hm-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "hm-status-old": {
          "0%, 38%": { opacity: "1" },
          "42%, 92%": { opacity: "0" },
          "96%, 100%": { opacity: "1" },
        },
        "hm-status-new": {
          "0%, 38%": { opacity: "0", transform: "scale(0.9)" },
          "42%": { opacity: "1", transform: "scale(1.06)" },
          "46%, 92%": { opacity: "1", transform: "scale(1)" },
          "96%, 100%": { opacity: "0", transform: "scale(0.9)" },
        },
        "hm-row-scan": {
          "0%, 14%, 50%, 100%": { backgroundColor: "transparent" },
          "22%, 40%": { backgroundColor: "rgb(var(--hm-accent-light-rgb) / 0.7)" },
        },
        "hm-toast": {
          "0%, 42%": { opacity: "0", transform: "translateY(12px)" },
          "48%, 88%": { opacity: "1", transform: "translateY(0)" },
          "94%, 100%": { opacity: "0", transform: "translateY(12px)" },
        },
      },
      animation: {
        "hm-float": "hm-float 7s ease-in-out infinite",
        "hm-float-slow": "hm-float 9s ease-in-out -3s infinite",
        "hm-status-old": "hm-status-old 9s ease-in-out -1.5s infinite",
        "hm-status-new": "hm-status-new 9s ease-out -1.5s infinite",
        "hm-row-scan": "hm-row-scan 9s ease-in-out -1.5s infinite",
        "hm-toast": "hm-toast 9s ease-out -1.5s infinite",
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
