import TemplateArchiveVariant01 from "@/components/templates/archive/TemplateArchiveVariant01";
import { organization } from "@/lib/constants";
import { getMetaData } from "@/lib/seo";
import { getPostsByCategory, getCategoryBySlug } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import { generateBlogMetaData } from "@/lib/constants";

export default async function BlogCategoryArchive({ params }) {
  const { slug } = params;
  const data = await getPostsByCategory(0, 1000, slug);
  const category = await getCategoryBySlug(slug);
  if (!data || !data.length || !category) {
    return notFound();
  }

  const heroData = {
    heading: `Posts tagged under ${category.title}`,
    description: null,
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
      nextPageDestination={null}
    />
  );
}

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const data = await getPostsByCategory(0, 1000, slug);
  const category = await getCategoryBySlug(slug);
  if (!data || !data.length || !category) return {};
  const staticMetaData = generateBlogMetaData(
    category.meta_title ||
      `Posts tagged in ${category.title} | ${organization}`,
    category.meta_description,
    category.featured_image || null
  );

  return await getMetaData(staticMetaData, `blog/category/${slug}`, null, null);
};
