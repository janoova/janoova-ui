import { getSiteSettings } from "@/sanity/utils/queries";

export default async function robots() {
  const productionUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const isVercelPreview = productionUrl && productionUrl.includes("vercel.app");
  const isJanoovaUi = productionUrl && productionUrl.includes("ui.janoova.com");

  if (isVercelPreview || isJanoovaUi) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const siteSettings = await getSiteSettings();
  const disableIndexing = siteSettings?.disable_indexing;

  if (disableIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const siteUrl = productionUrl
    ? `https://${productionUrl}`
    : "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
