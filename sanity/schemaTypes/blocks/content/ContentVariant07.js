import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateHeadingSizeField,
  generateHeadingTagField,
  generateBackgroundPatternField,
  generateRichtextField,
} from "../defaultFields";

const blockLabel = `Content Variant 07`;
const blockCategory = "content";
const ContentVariant07 = defineType({
  name: "ContentVariant07",
  title: blockLabel,
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
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Data to Enrich Your Online Business",
      group: "content",
    }),
    generateHeadingTagField({
      name: `heading_tag`,
      title: `Heading Tag`,
    }),
    generateRichtextField({
      name: "content_left",
      title: "Content Left",
    }),
    generateRichtextField({
      name: "content_right",
      title: "Content Right",
    }),
    generateHeadingSizeField({
      name: `content_size`,
      title: `Content Size`,
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      initialValue: "primary",
      group: "style",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
      },
    }),
    defineField({
      name: "disable_inverted_text",
      title: "Disable Inverted Text",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    defineField({
      name: "disable_second_column",
      title: "Disable Second Column",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    defineField({
      name: "enable_animations",
      title: "Enable Animations",
      type: "boolean",
      initialValue: () => false,
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
        subtitle: blockLabel,
      };
    },
  },
});

export default ContentVariant07;
