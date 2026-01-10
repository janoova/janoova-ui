import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateHeadingTagField,
  generateBackgroundPatternField,
  generateRichtextField,
} from "../defaultFields";
const blockCategory = "feature";
const FeatureVariant03 = defineType({
  name: "FeatureVariant03",
  title: "Feature Variant 03",
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

    generateRichtextField({
      name: "content",
      title: "Content",
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
              name: "icon_type",
              title: "Icon Type",
              type: "string",
              initialValue: "svg",
              options: {
                list: [
                  { title: "SVG", value: "svg" },
                  { title: "Image", value: "image" },
                ],
              },
            }),
            defineField({
              name: "icon_svg",
              title: "Icon SVG",
              type: "text",
              rows: 3,
              hidden: ({ parent }) => parent?.[`icon_type`] !== "svg",
              initialValue: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>`,
            }),
            defineField({
              name: "icon_color",
              title: "Icon Color",
              type: "string",
              hidden: ({ parent }) => parent?.[`icon_type`] !== "svg",
            }),
            defineField({
              name: "image",
              title: "Icon",
              type: "image",
              hidden: ({ parent }) => parent?.[`icon_type`] !== "image",
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
              rows: 2,
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "align_items_center",
      title: "Align Items Center",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    generateHeadingTagField({
      name: `card_heading_tag`,
      title: `Card Heading Tag`,
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
        subtitle: "Feature Variant 03",
      };
    },
  },
});

export default FeatureVariant03;
