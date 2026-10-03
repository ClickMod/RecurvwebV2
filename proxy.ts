import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEMO_ACCESS_COOKIE,
  demoAccessCookieOptions,
  demoAccessCookieValue,
  isDemoAccessToken,
} from "@/lib/demo-access";

/**
 * Next.js 16 runs this file instead of middleware.ts.
 * A valid Pipedrive redirect (?access=) sets a signed cookie and drops the query.
 */
export async function proxy(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("access");
  const secret = process.env.DEMO_ACCESS_TOKEN;
  if (!secret || !isDemoAccessToken(token)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("access");
  const response = NextResponse.redirect(url);
  response.cookies.set(
    DEMO_ACCESS_COOKIE,
    await demoAccessCookieValue(secret),
    demoAccessCookieOptions(),
  );
  return response;
}

export const config = {
  matcher: "/demo",
};
