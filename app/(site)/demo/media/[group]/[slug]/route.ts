import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { DEMO_ACCESS_COOKIE, hasDemoAccessCookie } from "@/lib/demo-access";
import { getDemoMediaSource } from "@/lib/strapi";

const NOINDEX = { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" };

interface RouteContext {
  params: Promise<{ group: string; slug: string }>;
}

async function serveDemoMedia(request: NextRequest, context: RouteContext) {
  const cookieStore = await cookies();
  const unlocked = await hasDemoAccessCookie(cookieStore.get(DEMO_ACCESS_COOKIE)?.value);
  if (!unlocked) {
    return new NextResponse(null, { status: 401, headers: NOINDEX });
  }

  const { group, slug } = await context.params;
  const source = await getDemoMediaSource(group, slug).catch(() => null);
  if (!source) {
    return new NextResponse(null, { status: 404, headers: NOINDEX });
  }

  const upstreamHeaders = new Headers();
  const range = request.headers.get("range");
  if (range) upstreamHeaders.set("range", range);

  const upstream = await fetch(source.url, {
    method: request.method === "HEAD" ? "HEAD" : "GET",
    headers: upstreamHeaders,
    cache: "no-store",
  });

  const headers = new Headers({ "X-Robots-Tag": "noindex" });
  headers.set("Content-Type", upstream.headers.get("content-type") ?? source.mime);
  headers.set("Accept-Ranges", upstream.headers.get("accept-ranges") ?? "bytes");
  const playable = upstream.status === 200 || upstream.status === 206;
  headers.set("Cache-Control", playable ? "public, max-age=3600" : "no-store");

  const length = upstream.headers.get("content-length");
  if (length) headers.set("Content-Length", length);
  const contentRange = upstream.headers.get("content-range");
  if (contentRange) headers.set("Content-Range", contentRange);

  return new NextResponse(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers,
  });
}

export function GET(request: NextRequest, context: RouteContext) {
  return serveDemoMedia(request, context);
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return serveDemoMedia(request, context);
}
