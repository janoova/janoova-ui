import { revalidateTag } from "next/cache";

const SITEMAP_TYPES = ["page", "post", "post_category"];
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.NEXT_PUBLIC_SANITY_HOOK
    );

    if (!isValidSignature) {
      console.warn("❌ Invalid Signature");
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body || !body._type) {
      console.warn("❌ Bad Body");
      return new Response("Bad Request", { status: 400 });
    }

    const revalidationId = Math.random().toString(36).substring(7);

    console.log(`🔄 [${revalidationId}] Webhook received:`, {
      _type: body._type,
      _id: body._id,
      slug: body.slug?.current,
      timestamp: new Date().toISOString(),
    });

    console.log(`🔄 [${revalidationId}] About to revalidate tag:`, body._type);

    revalidateTag(body._type);

    if (SITEMAP_TYPES.includes(body._type)) {
      revalidateTag("sitemap");
    }

    console.log(
      `✅ [${revalidationId}] Revalidation completed for tag:`,
      body._type
    );

    return NextResponse.json({
      status: 200,
      revalidated: true,
      revalidationId,
      tag: body._type,
      now: Date.now(),
      body,
    });
  } catch (error) {
    console.error("❌ Revalidation error:", error);
    return new Response(error.message, { status: 500 });
  }
}
