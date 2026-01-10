import TemplateArchiveVariant01 from "@/components/templates/archive/TemplateArchiveVariant01";
import { paginatedItemsPerPage } from "@/lib/constants";
import { getPaginationContext } from "@/lib/helpers";
import { getMetaData } from "@/lib/seo";
import { getPosts, getPostsCount } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import { generateBlogMetaData } from "@/lib/constants";

export default async function BlogArchive() {
  const data = await getPosts(0, paginatedItemsPerPage);
  if (!data || !data.length) {
    return notFound();
  }

  const heroData = {
    heading: `Blog`,
    description: `Your single source for expert insights within the digital space.`,
    background_theme: `secondary`,
    invert_text_color: true,
    heading_size: `d2`,
    enable_background_pattern: true,
    background_pattern_type: `grid`,
  };

  const { lastPaginatedPage } = await getPaginationContext(
    getPostsCount(),
    paginatedItemsPerPage,
    1
  );
  return (
    <TemplateArchiveVariant01
      heroData={heroData}
      bodyData={data}
      nextPageDestination={lastPaginatedPage ? null : `/blog/page/2`}
    />
  );
}

export const generateMetadata = async () => {
  const staticMetaData = generateBlogMetaData();
  const data = await getPosts(0, paginatedItemsPerPage);
  if (!data || !data.length) return {};
  const { lastPaginatedPage } = await getPaginationContext(
    getPostsCount(),
    paginatedItemsPerPage,
    1
  );

  return await getMetaData(
    staticMetaData,
    `blog`,
    null,
    lastPaginatedPage ? null : `blog/page/2`
  );
};
