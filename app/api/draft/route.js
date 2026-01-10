import clientConfig from "@/sanity/config/clientConfig";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "next-sanity";

const clientWithToken = createClient(clientConfig).withConfig({
  token: process.env.SANITY_TOKEN,
});

export async function GET(request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(redirectTo);
}
