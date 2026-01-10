import clientConfig from "../config/clientConfig";
import { createClient } from "next-sanity";
import { dev } from "./helpers";
import { draftMode } from "next/headers";

export { default as groq } from "groq";

export async function fetchSanity(query, params, nextOptions = {}) {
  const draft = await draftMode();
  const preview = dev || draft.isEnabled;
  const fetchId = Math.random().toString(36).substring(7);

  const config = preview
    ? {
        stega: { enabled: true, studioUrl: "/studio" },
        perspective: "previewDrafts",
        useCdn: false,
        token: process.env.SANITY_TOKEN,
        next: { revalidate: 0, ...nextOptions },
      }
    : {
        perspective: "published",
        useCdn: false,
        next: { revalidate: 15000, ...nextOptions },
      };

  console.log(`🏷️  [${fetchId}] Cache config:`, {
    tags: config.next?.tags,
    revalidate: config.next?.revalidate,
    preview,
  });

  return createClient(clientConfig).fetch(query, params, config);
}
