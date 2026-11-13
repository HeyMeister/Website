import type { NextConfig } from "next";

const isLaunched = process.env.PUBLIC_LAUNCH === "true";
const isDev = process.env.NODE_ENV !== "production";
const analyticsHost = (process.env.ANALYTICS_HOST || "https://plausible.io").replace(/\/$/, "");

function originOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

// Third-party frames are only rendered after an explicit click (two-click solution),
// but they still need to be allowed by the CSP.
const frameSources = ["https://www.openstreetmap.org", originOf(process.env.BOOKING_URL)].filter(Boolean);

// Static generation rules out per-request nonces, so inline scripts emitted by Next.js
// need 'unsafe-inline'. All other sources are first-party only.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  `frame-src ${frameSources.length ? frameSources.join(" ") : "'none'"}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  ...(isLaunched ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    // First-party proxy for Plausible: no third-party request from the browser.
    if (!process.env.ANALYTICS_DOMAIN) return [];
    return [
      { source: "/stats/script.js", destination: `${analyticsHost}/js/script.js` },
      { source: "/stats/event", destination: `${analyticsHost}/api/event` },
    ];
  },
};

export default nextConfig;
