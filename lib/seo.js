// import { baseUrl, ogImageDimensions, webConfig } from "~/config";

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

const getOgImage = (options) => {
  const { title, type, id } = options ?? {};

  const params = new URLSearchParams({});
  if (id) params.set("id", id);
  if (title) params.set("title", title);
  if (type) params.set("type", type);

  return "api/og?" + params.toString();
};

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
  } = data;

  // Get site settings for fallback OG image
  const siteSettings = await getSiteSettings();
  const fallbackOgImage = siteSettings?.og_image;

  const meta = {
    seoTitle: meta_title ?? `${title || ``} - ${organization}`,
    seoDescription: meta_description ?? "",
  };

  const ogImage = getOgImage({
    title: meta.seoTitle,
    type: _type,
    id: _id,
  });

  // Determine the OG image URL with fallback logic
  const getOgImageUrl = () => {
    if (featured_image) {
      return urlFor(featured_image).url();
    }
    if (fallbackOgImage) {
      return urlFor(fallbackOgImage).url();
    }
    return null;
  };

  const ogImageUrl = getOgImageUrl();

  const metadata = {
    title: meta.seoTitle,
    description: meta.seoDescription,
    alternates: {
      canonical:
        slug?.current === "index"
          ? `${baseUrl}/`
          : getPageBySlugUrl(slug?.current, directory),
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
    // authors: {
    //   name: organization,
    // },
    ...(seo_no_index ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      countryName: "USA",
      description: meta.seoDescription,
      title: meta.seoTitle,
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
      url: getPageBySlugUrl(slug?.current, directory),
    },
  };

  return metadata;
};
