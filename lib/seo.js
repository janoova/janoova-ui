import { baseUrl, organization } from "./constants";
import { getSiteSettings } from "@/sanity/utils/queries";
import urlFor from "@/lib/imageUrlBuilder";

export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

export const getPageBySlugUrl = (slug, directory) =>
  directory
    ? `${baseUrl}/${directory}${slug ? `/${slug}` : ``}`
    : `${baseUrl}/${slug ?? ""}`;

export const getMetaData = async (data, directory, prev, next) => {
  const {
    _id,
    _type,
    title,
    meta_title,
    slug,
    meta_description,
    featured_image,
    seo_no_index,
    publish_date,
    _updatedAt,
  } = data;

  const siteSettings = await getSiteSettings();
  const fallbackOgImage = siteSettings?.og_image;

  const meta = {
    seoTitle: meta_title ?? `${title || ``} - ${organization}`,
    seoDescription: meta_description ?? "",
  };

  const getOgImageUrl = () => {
    if (featured_image) return urlFor(featured_image).url();
    if (fallbackOgImage) return urlFor(fallbackOgImage).url();
    return null;
  };

  const ogImageUrl = getOgImageUrl();
  const canonicalUrl =
    slug?.current === "index"
      ? `${baseUrl}/`
      : getPageBySlugUrl(slug?.current, directory);

  const isArticle = _type === "post";

  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    ...(prev || next
      ? {
          other: [
            ...(prev ? [{ rel: "prev", url: `${baseUrl}/${prev}` }] : []),
            ...(next ? [{ rel: "next", url: `${baseUrl}/${next}` }] : []),
          ],
        }
      : {}),
    creator: organization,
    ...(seo_no_index ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: isArticle ? "article" : "website",
      siteName: organization,
      locale: "en_US",
      description: meta.seoDescription,
      title: meta.seoTitle,
      url: canonicalUrl,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: ogImageDimensions.width,
              height: ogImageDimensions.height,
              alt: meta.seoTitle,
              secureUrl: ogImageUrl,
            },
          ]
        : [],
      ...(isArticle && publish_date
        ? { publishedTime: publish_date, modifiedTime: _updatedAt }
        : {}),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: meta.seoTitle,
      description: meta.seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
};
