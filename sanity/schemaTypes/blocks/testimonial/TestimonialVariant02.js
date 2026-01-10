import { defineField, defineType } from "sanity";
import {
  scopedCss,
  generateBackgroundPatternField,
  generateHeadingTagField,
} from "../defaultFields";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

const blockCategory = "testimonial";

const TestimonialVariant02 = defineType({
  name: "TestimonialVariant02",
  title: "Testimonial Variant 02",
  type: "object",
  _menuCategory: blockCategory,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "slider_settings",
      title: "Slider Settings",
    },
    {
      name: "style",
      title: "Style",
    },
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
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
    }),
    generateHeadingTagField({
      name: `heading_tag`,
      title: `Heading Tag`,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "content",
      initialValue: () =>
        Array(3)
          .fill(0)
          .map((_, i) => ({
            _type: "testimonial_item",
            heading: `"Working with [Company] transformed our marketing strategy and significantly increased our ROI! Their insights are invaluable."`,
            person_name:
              i === 0
                ? "Emily Johnson"
                : i === 1
                  ? "Michael Chen"
                  : "Sarah Williams",
            person_title:
              i === 0
                ? "Marketing Director, TechCorp"
                : i === 1
                  ? "CEO, StartupXYZ"
                  : "VP of Sales, Enterprise Co",
          })),
      of: [
        {
          type: "object",
          name: "testimonial_item",
          title: "Testimonial",
          fields: [
            defineField({
              name: "logo",
              title: "Company Logo",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Alternative text for accessibility",
                },
              ],
            }),
            defineField({
              name: "heading",
              title: "Testimonial Quote",
              type: "text",
              rows: 4,
              initialValue: `"Working with [Company] transformed our marketing strategy and significantly increased our ROI! Their insights are invaluable."`,
              description: "The main testimonial quote",
            }),
            defineField({
              name: "avatar",
              title: "Person Avatar",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Alternative text for accessibility",
                },
              ],
            }),
            defineField({
              name: "person_name",
              title: "Person Name",
              type: "string",
              initialValue: "Emily Johnson",
              description: "Name of the person giving the testimonial",
            }),
            defineField({
              name: "person_title",
              title: "Person Title & Company",
              type: "string",
              initialValue: "Marketing Director, TechCorp",
              description: "Job title and company of the person",
            }),
            defineField({
              name: "person_linkedin_url",
              title: "Person LinkedIn URL",
              type: "string",
              initialValue: "",
              description: "LinkedIn URL of the person",
            }),
          ],
          preview: {
            select: {
              title: "person_name",
              subtitle: "person_title",
              media: "avatar",
              quote: "heading",
            },
            prepare(selection) {
              const { title, subtitle, media, quote } = selection;
              const truncatedQuote =
                quote && quote.length > 60
                  ? `${quote.substring(0, 60)}...`
                  : quote;

              return {
                title: title || "Person name not set",
                subtitle:
                  subtitle || truncatedQuote || "Add testimonial details",
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("At least one testimonial is required"),
    }),

    // Slider Settings Group
    defineField({
      name: "items_per_slide",
      title: "Items Per Slide",
      type: "number",
      initialValue: 1,
      group: "slider_settings",
      description: "Number of testimonials to display per slide",
      validation: (Rule) =>
        Rule.min(1)
          .max(3)
          .integer()
          .warning("Should be between 1 and 3 items per slide"),
    }),

    defineField({
      name: "show_indicators",
      title: "Show Slide Indicators",
      type: "boolean",
      initialValue: true,
      group: "slider_settings",
      description: "Display dot indicators for slides",
    }),

    defineField({
      name: "enable_autoplay",
      title: "Enable Autoplay",
      type: "boolean",
      initialValue: false,
      group: "slider_settings",
      description: "Automatically advance slides",
    }),

    defineField({
      name: "autoplay_duration",
      title: "Autoplay Duration (seconds)",
      type: "number",
      initialValue: 5,
      group: "slider_settings",
      description:
        "How long each slide is displayed before auto-advancing (in seconds)",
      hidden: ({ parent }) => !parent?.enable_autoplay,
      validation: (Rule) =>
        Rule.min(1)
          .max(30)
          .warning("Duration should be between 1 and 30 seconds"),
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
      testimonials: "testimonials",
    },
    prepare(selection) {
      const { testimonials } = selection;
      const firstTestimonial = testimonials && testimonials[0];
      const firstHeading = firstTestimonial?.heading;

      const truncatedHeading =
        firstHeading && firstHeading.length > 80
          ? `${firstHeading.substring(0, 80)}...`
          : firstHeading;

      return {
        title: truncatedHeading || "No testimonials added yet",
        subtitle: "Testimonial Variant 02",
      };
    },
  },
});

export default TestimonialVariant02;
