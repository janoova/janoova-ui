import BlockGallery from "@/components/gallery/BlockGallery";
import PageBuilder from "@/components/wrappers/PageBuilder";
import FeedVariant01Client from "@/components/blocks/feed/client/FeedVariant01Client";
import examples from "@/lib/blockGalleryData.json";

const image = examples.find((example) => example.data.image?.asset)?.data.image;
const form = {
  title: "Preview enquiry",
  button_title: "Send enquiry",
  enable_recaptcha: false,
  form_fields: { code: JSON.stringify([
    { name: "name", label: "Your name", placeholder: "Alex Morgan", type: "text", width: "100", required: true },
    { name: "email", label: "Email address", placeholder: "you@example.com", type: "email", width: "100", required: true },
    { name: "message", label: "How can we help?", placeholder: "Tell us about your project", type: "textarea", width: "100", required: true },
  ]) },
};

function renderPreview(example) {
  const { id, data } = example;
  if (id === "FeedVariant01") {
    const posts = ["Ideas for your next project", "A closer look at our process", "Built around your business"].map((title, i) => ({ _id: `article-${i}`, title, heading: title, slug: { current: "preview" }, excerpt: "Practical ideas, useful insights, and stories from our team.", publish_date: "2026-10-01", featured_image: image }));
    return <FeedVariant01Client data={data} feedData={posts} index={0} />;
  }
  return <PageBuilder data={{ ...data, ...(id === "HeroVariant05" ? { form, form_heading: "Let’s talk", form_description: "Tell us about your next project." } : {}) }} index={0} />;
}

export default function BlocksPage() {
  const order = ["hero", "feature", "content", "cta", "faq", "partner", "stats", "testimonial", "team", "feed"];
  const sorted = [...examples].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
  const blocks = sorted.map(({ id, category }) => ({ id, category }));
  const previews = sorted.map((example) => <div key={example.id}>{renderPreview(example)}</div>);
  return <BlockGallery blocks={blocks} previews={previews} />;
}
