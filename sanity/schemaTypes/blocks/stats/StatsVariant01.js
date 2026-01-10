import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateHeadingTagField,
  generateBackgroundPatternField,
} from "../defaultFields";
const blockCategory = "stats";
const StatsVariant01 = defineType({
  name: "StatsVariant01",
  title: "Stats Variant 01",
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
      initialValue: "Long heading is what you see here in this feature section",
      group: "content",
    }),
    generateHeadingTagField({
      name: `heading_tag`,
      title: `Heading Tag`,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      initialValue:
        "In today's competitive landscape, effective digital marketing is essential for growth. Our data-driven approach ensures that your business stands out and reaches its target audience. Let us help you unlock your full potential with tailored strategies that deliver results.",
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
            heading: `150`,
            description: `Websites`,
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
              initialValue: "150",
            }),
            defineField({
              name: "ticker_animation",
              title: "Ticker Animation",
              type: "boolean",
              initialValue: () => false,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              initialValue: "Websites",
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "enable_animations",
      title: "Enable Animations",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    defineField({
      name: "invert_text_color",
      title: "Invert Text Color",
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
        subtitle: "Stats Variant 01",
      };
    },
  },
});

export default StatsVariant01;
