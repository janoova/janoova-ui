import { getMetaData } from "@/lib/seo";
import { getPostBySlug, getAllPostSlugs } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import TemplatePostVariant01 from "@/components/templates/post/TemplatePostVariant01";
import JsonLd from "@/components/wrappers/JsonLd";
import { baseUrl, organization } from "@/lib/constants";
import urlFor from "@/lib/imageUrlBuilder";

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data) {
    return notFound();
  }

  const feedData = {
    heading: `Recent Blog Posts`,
    description: `Your single source for expert insights within the digital space.`,
    enable_background_pattern: true,
    background_pattern_type: `grid`,
  };

  const ctaData = {
    background_theme: `primary`,
    heading: `Get Your Custom Website Analysis`,
    heading_tag: `span`,
    description: `Not sure how to go about growing your website? Book a quick call with Jeremy D, a leading digital <br class="u__show-after-992" />marketing specialist who can help you move your business forward.`,
    button_title: `Quick Website Analysis`,
    button_destination: `/contact-us`,
    button_theme: `inverted`,
    invert_text_color: true,
    enable_background_pattern: true,
    background_pattern_type: `grid`,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.meta_title || data.title,
    description: data.meta_description || "",
    url: `${baseUrl}/blog/${data.slug.current}`,
    datePublished: data.publish_date || data._createdAt,
    dateModified: data._updatedAt,
    ...(data.featured_image
      ? { image: urlFor(data.featured_image).url() }
      : {}),
    author: { "@type": "Organization", name: organization },
    publisher: { "@type": "Organization", name: organization },
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <TemplatePostVariant01
        data={data}
        feedData={feedData}
        ctaData={ctaData}
      />
    </>
  );
}

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data) return {};
  return await getMetaData(data, `blog`);
};
