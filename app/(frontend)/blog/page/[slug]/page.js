import TemplateArchiveVariant01 from "@/components/templates/archive/TemplateArchiveVariant01";
import { organization, paginatedItemsPerPage } from "@/lib/constants";
import { getPaginationContext } from "@/lib/helpers";
import { getMetaData } from "@/lib/seo";
import { getPosts, getPostsCount } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { generateBlogMetaData } from "@/lib/constants";

export default async function BlogArchivePaginated({ params }) {
  const { slug } = params;
  if (isNaN(parseFloat(slug))) {
    return notFound();
  }
  if (slug === `1`) {
    redirect(`/blog`);
  }
  const start = slug * paginatedItemsPerPage - paginatedItemsPerPage;
  const end = slug * paginatedItemsPerPage;
  const data = await getPosts(start, end);
  if (!data || data.length === 0) {
    return notFound();
  }
  const { lastPaginatedPage } = await getPaginationContext(
    getPostsCount(),
    paginatedItemsPerPage,
    parseFloat(slug)
  );

  const heroData = {
    heading: `Blog - Page ${slug}`,
    description: `Your single source for expert insights within the digital space.`,
    background_theme: `secondary`,
    invert_text_color: true,
    heading_size: `d2`,
    enable_background_pattern: true,
    background_pattern_type: `grid`,
  };

  return (
    <TemplateArchiveVariant01
      heroData={heroData}
      bodyData={data}
      prevPageDestination={
        parseFloat(slug) === 2 ? `/blog` : `/blog/page/${parseFloat(slug) - 1}`
      }
      nextPageDestination={
        lastPaginatedPage ? null : `/blog/page/${parseFloat(slug) + 1}`
      }
    />
  );
}

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  if (isNaN(parseFloat(slug))) {
    return {};
  }
  const start = slug * paginatedItemsPerPage - paginatedItemsPerPage;
  const end = slug * paginatedItemsPerPage;
  const data = await getPosts(start, end);
  if (!data || data.length === 0) {
    return {};
  }
  const { lastPaginatedPage } = await getPaginationContext(
    getPostsCount(),
    paginatedItemsPerPage,
    parseFloat(slug)
  );
  const staticMetaData = generateBlogMetaData(
    `Latest Posts | Page ${slug} | ${organization}`
  );
  return await getMetaData(
    staticMetaData,
    `blog/page/${slug}`,
    `${slug == "2" ? `blog` : `blog/page/${parseFloat(slug) - 1}`}`,
    lastPaginatedPage ? null : `blog/page/${parseFloat(slug) + 1}`
  );
};
