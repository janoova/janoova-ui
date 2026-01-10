import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateBackgroundPatternField,
  generateButtonField,
  generateRichtextField,
} from "../defaultFields";

const blockCategory = "testimonial";

const TestimonialVariant03 = defineType({
  name: "TestimonialVariant03",
  title: "Testimonial Variant 03",
  type: "object",
  _menuCategory: blockCategory,
  groups: [
    {
      name: "content",
      title: "Content",
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
      name: "logo",
      title: "Logo",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Section Label",
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 4,
      initialValue: `"Working with [Company] transformed our marketing strategy and significantly increased our ROI! Their insights are invaluable."`,
      group: "content",
    }),
    ...generateButtonField({
      name: "button",
      titleLabel: "Button Title",
      destinationLabel: "Button Destination",
      themeLabel: `Button Theme`,
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "person_name",
      title: "Person Name",
      type: "string",
      initialValue: `Emily Johnson`,
      group: "content",
    }),
    defineField({
      name: "person_title",
      title: "Person Title",
      type: "string",
      initialValue: `Marketing Director, TechCorp`,
      group: "content",
    }),
    defineField({
      name: "person_linkedin_url",
      title: "Person LinkedIn URL",
      type: "string",
      initialValue: "",
      description: "LinkedIn URL of the person",
      group: "content",
    }),
    defineField({
      name: "enable_modal",
      title: "Enable 'Read More' Modal",
      type: "boolean",
      initialValue: false,
      description:
        "Enable to show full testimonial content in a modal. The button will automatically trigger the modal when enabled.",
      group: "content",
    }),
    generateRichtextField({
      name: "testimonial_content",
      title: "Testimonial Content (Modal)",
    }),

    defineField({
      name: "enable_animations",
      title: "Enable Animations",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    ...generateBackgroundPatternField(),
    defineField({
      name: "enable_card_border_beam",
      title: "Enable Card Border Beam",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    defineField({
      name: "card_beam_color_list",
      title: "Card Beam Color List",
      type: "string",
      hidden: ({ parent }) => !parent?.[`enable_card_border_beam`],
      initialValue: "",
      group: "style",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare(selection) {
      const { heading } = selection;
      return {
        title: heading || "Heading needs to be set",
        subtitle: "Testimonial Variant 03",
      };
    },
  },
});

export default TestimonialVariant03;
