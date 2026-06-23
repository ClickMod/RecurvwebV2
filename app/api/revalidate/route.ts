import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Called by the Strapi webhook on entry.publish / entry.update / entry.unpublish.
 * Strapi sends a JSON body with the shape:
 *   { model: "blog-post" | "industry", entry: { slug: string, ... } }
 *
 * The handler invalidates the affected route so the next request re-renders
 * from Strapi and the fresh result is cached.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "REVALIDATE_SECRET not configured" }, { status: 500 });
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { model?: string; entry?: { slug?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { model, entry } = body;
  const slug = entry?.slug;

  if (!model || !slug) {
    return NextResponse.json({ error: "Missing model or entry.slug" }, { status: 400 });
  }

  if (model === "blog-post") {
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
    revalidateTag("/blog-posts");
  } else if (model === "industry") {
    revalidatePath(`/industries/${slug}`);
    revalidatePath("/industries");
    revalidateTag("/industries");
  } else {
    return NextResponse.json({ error: `Unknown model: ${model}` }, { status: 400 });
  }

  return NextResponse.json({ revalidated: true, model, slug });
}
