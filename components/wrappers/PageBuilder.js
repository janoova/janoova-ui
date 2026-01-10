import React from "react";
import * as AllHeroes from "../blocks/hero";
import * as AllFeatures from "../blocks/feature";
import * as AllContents from "../blocks/content";
import * as AllFaqs from "../blocks/faq";
import * as AllCtas from "../blocks/cta";
import * as AllPartners from "../blocks/partner";
import * as AllStats from "../blocks/stats";
import * as AllTestimonials from "../blocks/testimonial";
import * as AllFeeds from "../blocks/feed";
import * as AllModals from "../blocks/modal";
import { getCleanValue } from "@/lib/helpers";

const categories = {
  hero: AllHeroes,
  feature: AllFeatures,
  content: AllContents,
  faq: AllFaqs,
  cta: AllCtas,
  partner: AllPartners,
  stats: AllStats,
  testimonial: AllTestimonials,
  feed: AllFeeds,
  modal: AllModals,
};

const BlockNotFound = ({ _type, block_category }) => {
  return (
    <div className="grid place-items-center">
      <div>Block Not Found</div>
      <div>Type: {_type}</div>
      <div>Category: {block_category}</div>
    </div>
  );
};

const PageBuilder = ({ data, index }) => {
  // Add safety checks
  if (!data || !data._type || !data.block_category) {
    console.warn("PageBuilder: Missing required data", data);
    return (
      <BlockNotFound
        _type={data?._type}
        block_category={data?.block_category}
      />
    );
  }

  const { _type, block_category } = data;
  const cleanCategory = getCleanValue(block_category);

  // Debug logging - remove in production
  console.log("PageBuilder debug:", {
    _type,
    block_category,
    cleanCategory,
    availableCategories: Object.keys(categories),
    categoryExists: !!categories[cleanCategory],
    componentExists: !!categories[cleanCategory]?.[_type],
  });

  // Check if category exists
  const categoryComponents = categories[cleanCategory];
  if (!categoryComponents) {
    console.warn(
      `PageBuilder: Category "${cleanCategory}" not found. Available categories:`,
      Object.keys(categories)
    );
    return <BlockNotFound _type={_type} block_category={block_category} />;
  }

  // Check if component exists in category
  const Component = categoryComponents[_type];
  if (!Component) {
    console.warn(
      `PageBuilder: Component "${_type}" not found in category "${cleanCategory}". Available components:`,
      Object.keys(categoryComponents)
    );
    return <BlockNotFound _type={_type} block_category={block_category} />;
  }

  return <Component data={data} index={index} />;
};

export default PageBuilder;
