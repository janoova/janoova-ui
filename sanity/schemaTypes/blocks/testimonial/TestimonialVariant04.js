import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateBackgroundPatternField,
  generateHeadingTagField,
} from "../defaultFields";

const blockCategory = "testimonial";

const defaultTestimonials = [
  {
    _type: "testimonialItem",
    _key: "t1",
    quote: `"Payments are the main interaction point between our financial services clients and their customers, and are core to our relationships beyond that sector too."`,
    person_name: "Charolette Hanlin",
    person_title: "Co-Founder, Heroes Digital",
  },
  {
    _type: "testimonialItem",
    _key: "t2",
    quote: `"Payments are pivotal in our financial operations, serving as the primary interface between our finance department and clients."`,
    person_name: "Novák Balázs",
    person_title: "Co-Founder, WooCommerce",
  },
  {
    _type: "testimonialItem",
    _key: "t3",
    quote: `"Using this financial app has made me feel more organized and efficient in managing my finances."`,
    person_name: "Orosz Boldizsár",
    person_title: "Founder, Okta",
  },
  {
    _type: "testimonialItem",
    _key: "t4",
    quote: `"The provided features are incredibly helpful in tracking expenses, managing investments, and planning for future financial goals."`,
    person_name: "Floyd Miles",
    person_title: "Co-Founder, Slack",
  },
  {
    _type: "testimonialItem",
    _key: "t5",
    quote: `"This app has given me full control over my finances and provided greater confidence in making wise financial decisions."`,
    person_name: "Darrell Steward",
    person_title: "Founder",
  },
  {
    _type: "testimonialItem",
    _key: "t6",
    quote: `"Since incorporating this finance app into my daily routine, I've experienced a significant improvement in my financial management."`,
    person_name: "Devon Lane",
    person_title: "Marketing, Google",
  },
  {
    _type: "testimonialItem",
    _key: "t7",
    quote: `"We consolidated multiple payment tools into one platform—reporting and cash flow are finally clear."`,
    person_name: "Jenny Wilson",
    person_title: "CFO, Mailchimp",
  },
  {
    _type: "testimonialItem",
    _key: "t8",
    quote: `"The billing automation alone paid for the migration in under a month."`,
    person_name: "Jacob Jones",
    person_title: "VP Ops, Notion",
  },
  {
    _type: "testimonialItem",
    _key: "t9",
    quote: `"Metafi's checkout improved conversion and cut our support tickets in half."`,
    person_name: "Eleanor Pena",
    person_title: "Head of Product, Square",
  },
];

const TestimonialVariant04 = defineType({
  name: "TestimonialVariant04",
  title: "Testimonial Variant 04",
  type: "object",
  _menuCategory: blockCategory,
  groups: [
    { name: "content", title: "Content" },
    { name: "style", title: "Style" },
  ],
  fields: [
    defineField(copyPaste),
    defineField(scopedCss),
    defineField({
      name: "block_category",
      title: "Block Category",
      type: "string",
      initialValue: blockCategory,
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Our Customers",
      group: "content",
    }),
    generateHeadingTagField({ name: "label_heading_tag", title: "Label Heading Tag" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 3,
      initialValue: "See What Our Customers Are Saying",
      group: "content",
    }),
    generateHeadingTagField({
      name: "heading_tag",
      title: "Heading Tag",
    }),
    defineField({
      name: "heading_alignment",
      title: "Heading Alignment",
      type: "string",
      initialValue: "left",
      group: "style",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      initialValue: "Here's what some of our customers say about our platform.",
      group: "content",
    }),
    defineField({
      name: "use_global_testimonials",
      title: "Use Global Testimonials",
      type: "boolean",
      initialValue: false,
      description: "When enabled, the Testimonials array below is ignored.",
      group: "content",
    }),
    defineField({
      name: "global_testimonials_ref",
      title: "Global Testimonials Source",
      type: "reference",
      to: [{ type: "global_testimonials" }],
      group: "content",
      hidden: ({ parent }) => !parent?.use_global_testimonials,
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "content",
      hidden: ({ parent }) => !!parent?.use_global_testimonials,
      initialValue: defaultTestimonials,
      of: [
        {
          type: "object",
          name: "testimonialItem",
          title: "Testimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
            defineField({
              name: "person_name",
              title: "Person Name",
              type: "string",
            }),
            defineField({
              name: "person_title",
              title: "Person Title",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "person_name",
              subtitle: "person_title",
              media: "avatar",
            },
          },
        },
      ],
    }),
    defineField({
      name: "initial_visible_count",
      title: "Initial Visible Count",
      type: "number",
      initialValue: 6,
      description:
        "Number of testimonials visible before expanding. Should be a multiple of 3 to align with the grid.",
      group: "content",
    }),
    defineField({
      name: "show_all_button_title",
      title: "Show All Button Title",
      type: "string",
      initialValue: "See All Customer Stories",
      group: "content",
    }),
    defineField({
      name: "show_all_button_destination",
      title: "Show All Button Link (optional)",
      type: "string",
      description:
        "If set, the button links to this URL instead of toggling the expanded list.",
      group: "content",
    }),
    defineField({
      name: "show_all_button_open_in_new_tab",
      title: "Open Link in New Tab",
      type: "boolean",
      initialValue: false,
      group: "content",
      hidden: ({ parent }) => !parent?.show_all_button_destination,
    }),
    defineField({
      name: "show_less_button_title",
      title: "Show Less Button Title",
      type: "string",
      initialValue: "Show Less",
      group: "content",
      hidden: ({ parent }) => !!parent?.show_all_button_destination,
    }),
    defineField({
      name: "card_background",
      title: "Card Background",
      type: "string",
      initialValue: "white",
      group: "style",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "button_theme",
      title: "Button Theme",
      type: "string",
      initialValue: "primary",
      group: "style",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Inverted", value: "inverted" },
          { title: "Link", value: "link" },
          { title: "Ghost Primary", value: "ghost-primary" },
          { title: "Ghost Secondary", value: "ghost-secondary" },
        ],
      },
    }),
    defineField({
      name: "enable_animations",
      title: "Enable Animations",
      type: "boolean",
      initialValue: false,
      group: "style",
    }),
    ...generateBackgroundPatternField(),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: heading || "Heading needs to be set",
        subtitle: "Testimonial Variant 04",
      };
    },
  },
});

export default TestimonialVariant04;
