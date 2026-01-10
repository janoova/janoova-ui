export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nqj5p7gd";

export const organization =
  process.env.NEXT_PUBLIC_ORGANIZATION_NAME || "Rumi UI";

export const paginatedItemsPerPage = 12;

export const generateBlogMetaData = (
  meta_title,
  meta_description,
  featured_image
) => {
  return {
    _id: null,
    _type: `Blog`,
    meta_title: meta_title || `Latest Posts | ${organization}`,
    slug: `blog`,
    meta_description:
      meta_description ||
      `Your single source for expert insights within the digital space`,
    featured_image,
    seo_no_index: false,
  };
};

export const fallbackImageBlurDataUrl = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==`;
