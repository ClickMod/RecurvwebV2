/** Production site origin used for canonical URLs, JSON-LD, and share links. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://recurv.tech";

export const SITE_NAME = "Recurv";

/** Logo served from /public — used in Organization JSON-LD. */
export const SITE_LOGO = "/primarylogo.png";

/** Default Open Graph / Twitter share image (served from /public). */
export const DEFAULT_OG_IMAGE = "/ogimage.png";
