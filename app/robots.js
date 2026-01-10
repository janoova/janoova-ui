// app/robots.js

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const isVercelPreview = baseUrl && baseUrl.includes("vercel.app");

  if (isVercelPreview) {
    // Disallow everything for Vercel preview deployments
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  } else {
    // Allow everything for production with sitemap
    const siteUrl = baseUrl ? `https://${baseUrl}` : "https://example.com";
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }
}
