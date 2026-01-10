import * as AllHeroes from "./hero";
import * as AllFeatures from "./feature";
import * as AllContents from "./content";
import * as AllFaqs from "./faq";
import * as AllCtas from "./cta";
import * as AllPartners from "./partner";
import * as AllStats from "./stats";
import * as AllTestimonials from "./testimonial";
import * as AllFeeds from "./feed";
import * as AllModals from "./modal";

const heroBlocks = [...Object.values(AllHeroes)];
const featureBlocks = [...Object.values(AllFeatures)];
const contentBlocks = [...Object.values(AllContents)];
const faqBlocks = [...Object.values(AllFaqs)];
const ctaBlocks = [...Object.values(AllCtas)];
const partnerBlocks = [...Object.values(AllPartners)];
const statsBlocks = [...Object.values(AllStats)];
const testimonialBlocks = [...Object.values(AllTestimonials)];
const feedBlocks = [...Object.values(AllFeeds)];
const modalBlocks = [...Object.values(AllModals)];
const pageBuilderBlocks = [
  ...heroBlocks,
  ...featureBlocks,
  ...contentBlocks,
  ...faqBlocks,
  ...ctaBlocks,
  ...partnerBlocks,
  ...statsBlocks,
  ...testimonialBlocks,
  ...feedBlocks,
  ...modalBlocks,
];

export default pageBuilderBlocks;
