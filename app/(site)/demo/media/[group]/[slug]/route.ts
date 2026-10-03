import { NextRequest, NextResponse } from "next/server";
import { getDemoMediaSource } from "@/lib/strapi";

const NOINDEX = { "X-Robots-Tag": "noindex" };

interface RouteContext {
  params: Promise<{ group: string; slug: string }>;
}

async function serveDemoMedia(request: NextRequest, context: RouteContext) {
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

  const headers = new Headers(NOINDEX);
  headers.set("Content-Type", upstream.headers.get("content-type") ?? source.mime);
  headers.set("Accept-Ranges", upstream.headers.get("accept-ranges") ?? "bytes");
  headers.set("Cache-Control", "public, max-age=3600");

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
