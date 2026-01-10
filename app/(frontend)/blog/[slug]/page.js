import { getMetaData } from "@/lib/seo";
import { getPostBySlug } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import TemplatePostVariant01 from "@/components/templates/post/TemplatePostVariant01";

export default async function Post({ params }) {
  const { slug } = params;
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

  return (
    <>
      <TemplatePostVariant01
        data={data}
        feedData={feedData}
        ctaData={ctaData}
      />
    </>
  );
}

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (!data) return {};
  return await getMetaData(data, `blog`);
};
