export const DEMO_ACCESS_COOKIE = "recurv_demo_access";

const COOKIE_PAYLOAD = "recurv-demo-access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function demoAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/demo",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}

/** Compare two strings without returning early on the first differing byte. */
export function safeEqual(a: string, b: string): boolean {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  const length = Math.max(left.length, right.length);
  let mismatch = left.length === right.length ? 0 : 1;
  for (let i = 0; i < length; i++) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return mismatch === 0;
}

export function isDemoAccessToken(token: string | null): boolean {
  const secret = process.env.DEMO_ACCESS_TOKEN;
  if (!secret || !token) return false;
  return safeEqual(token, secret);
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function demoAccessCookieValue(secret: string): Promise<string> {
  return hmacHex(secret, COOKIE_PAYLOAD);
}

export async function hasDemoAccessCookie(value: string | undefined): Promise<boolean> {
  const secret = process.env.DEMO_ACCESS_TOKEN;
  if (!secret || !value) return false;
  return safeEqual(value, await demoAccessCookieValue(secret));
}
