/**
 * Build-/server-time configuration. Pages are statically generated, so these values
 * are baked in at build time — redeploy after changing them in Vercel.
 */
export const isLaunched = process.env.PUBLIC_LAUNCH === "true";

export const bookingUrl = process.env.BOOKING_URL?.trim() || null;
export const analyticsDomain = process.env.ANALYTICS_DOMAIN?.trim() || null;
