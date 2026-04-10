import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/clientConfig";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const client = createClient({
  ...clientConfig,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const id = searchParams.get("id");
  const key = searchParams.get("key");

  // Must have a configured secret
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) {
    return new Response("Preview is not configured on this server.", { status: 500 });
  }

  // Validate the key
  if (!key || key !== secret) {
    return new Response("Invalid preview key.", { status: 401 });
  }

  if (!id) {
    return new Response("Missing required parameter: id", { status: 400 });
  }

  // Look up the document — check both published and drafts.* IDs
  const doc = await client.fetch(
    `*[(_id == $id || _id == ("drafts." + $id)) && _type in ["page", "post"]][0]{
      _type,
      "slug": slug.current
    }`,
    { id }
  );

  if (!doc) {
    return new Response(
      "Document not found. Make sure the ID belongs to a page or post.",
      { status: 404 }
    );
  }

  // Determine the frontend path for this document
  let previewPath = "/";
  if (doc._type === "page") {
    previewPath = !doc.slug || doc.slug === "index" ? "/" : `/${doc.slug}`;
  } else if (doc._type === "post") {
    previewPath = doc.slug ? `/blog/${doc.slug}` : "/blog";
  }

  // Enable draft mode cookie (same mechanism as the existing /api/draft route)
  const draft = await draftMode();
  draft.enable();

  // Redirect to the live page — the draft mode cookie makes it render preview data.
  // The preview bar in DraftModeContent detects we're NOT in an iframe and shows
  // a "Previewing draft — Exit" banner automatically.
  redirect(previewPath);
}
