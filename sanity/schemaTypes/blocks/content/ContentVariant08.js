import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateButtonField,
  generateResourceCardStyleField,
  generateCardColumnsField,
  generateHeadingTagField,
  generateBackgroundPatternField,
} from "../defaultFields";

const blockLabel = `Content Variant 08`;
const blockCategory = "content";
const ContentVariant08 = defineType({
  name: "ContentVariant08",
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
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Empower",
      group: "content",
    }),
    generateHeadingTagField({
      name: `label_heading_tag`,
      title: `Label Heading Tag`,
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "End to End Digital Marketing",
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
            heading: `Powerful Card Heading`,
            description: `Massa nec scelerisque lacus dis vitae aenean montes platea ullamcorper condimentum quis magna purus tortor class a conubia dui nascetur id.`,
            button_title: "Learn More",
          })),
      of: [
        {
          type: "object",
          name: "repeater_item",
          title: "Repeater Item",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
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
              initialValue: "Powerful Card Heading",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              initialValue:
                "Massa nec scelerisque lacus dis vitae aenean montes platea ullamcorper condimentum quis magna purus tortor class a conubia dui nascetur id.",
              rows: 2,
            }),
            ...generateButtonField({
              name: "button",
              titleLabel: "Button Title",
              destinationLabel: "Button Destination",
              themeLabel: `Button Theme`,
              group: null,
              includeTheme: false,
            }),
          ],
        },
      ],
    }),
    generateHeadingTagField({
      name: `card_heading_tag`,
      title: `Card Heading Tag`,
    }),
    generateResourceCardStyleField({
      name: `card_style`,
      title: `Card Style`,
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
        subtitle: blockLabel,
      };
    },
  },
});

export default ContentVariant08;
