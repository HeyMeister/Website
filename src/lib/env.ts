/**
 * Build-/server-time configuration. Pages are statically generated, so these values
 * are baked in at build time — redeploy after changing them in Vercel.
 */
export const isLaunched = process.env.PUBLIC_LAUNCH === "true";

export const bookingUrl = process.env.BOOKING_URL?.trim() || null;
export const analyticsDomain = process.env.ANALYTICS_DOMAIN?.trim() || null;

/** Which optional data processing is switched on (the privacy policy only lists what applies). */
export const dataFeatures = {
  booking: !!bookingUrl,
  analytics: !!analyticsDomain,
  crm: !!process.env.CRM_WEBHOOK_URL?.trim(),
  redis: !!(process.env.RATE_LIMIT_UPSTASH_URL && process.env.RATE_LIMIT_UPSTASH_TOKEN),
};
