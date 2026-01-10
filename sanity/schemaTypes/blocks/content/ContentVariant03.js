import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateCardColumnsField,
  generateHeadingTagField,
  generateBackgroundPatternField,
} from "../defaultFields";
const blockCategory = "content";
const ContentVariant03 = defineType({
  name: "ContentVariant03",
  title: "Content Variant 03",
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
      initialValue: "Powerful Section Heading to Insure Readability",
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
      initialValue:
        "Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "repeater",
      title: "Repeater",
      type: "array",
      group: "content",
      initialValue: () =>
        Array(3)
          .fill(0)
          .map((_, i) => ({
            _type: "repeater_item",
            heading: `Card Heading`,
            description: `Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet`,
          })),
      of: [
        {
          type: "object",
          name: "repeater_item",
          title: "Repeater Item",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              initialValue: "Card Heading",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              initialValue:
                "Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
              rows: 3,
            }),
          ],
        },
      ],
    }),
    generateHeadingTagField({
      name: `card_heading_tag`,
      title: `Card Heading Tag`,
    }),
    defineField({
      name: "card_theme",
      title: "Card Theme",
      type: "string",
      initialValue: "primary",
      group: "content",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
      },
    }),
    defineField({
      name: "justify_content",
      title: "Justify Content",
      type: "string",
      initialValue: "start",
      group: "content",
      options: {
        list: [
          { title: "Start", value: "start" },
          { title: "Center", value: "center" },
        ],
      },
    }),
    generateCardColumnsField({
      name: `card_columns`,
      title: `Card Columns`,
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
        subtitle: "Content Variant 03",
      };
    },
  },
});

export default ContentVariant03;
