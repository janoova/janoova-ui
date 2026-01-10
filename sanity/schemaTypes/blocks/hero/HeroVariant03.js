import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  generateHeadingTagField,
  generateHeadingSizeField,
  scopedCss,
  generateBackgroundPatternField,
  generateBackgroundImageField,
  generateButtonField,
} from "../defaultFields";
const blockCategory = "hero";
const HeroVariant03 = defineType({
  name: "HeroVariant03",
  title: "Hero Variant 03",
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
      name: "background_theme",
      title: "Background Theme",
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
    ...generateBackgroundImageField(),
    defineField({
      name: "align_left",
      title: "Align Left",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Page Heading",
      group: "content",
    }),

    generateHeadingTagField({
      name: `heading_tag`,
      title: `Heading Tag`,
    }),

    generateHeadingSizeField({
      name: `heading_size`,
      title: `Heading Size`,
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
    generateHeadingTagField({
      name: `description_tag`,
      title: `Description Tag`,
    }),

    generateHeadingSizeField({
      name: `description_size`,
      title: `Description Size`,
    }),
    ...generateButtonField({
      name: "button",
      titleLabel: "Button Title",
      destinationLabel: "Button Destination",
      themeLabel: `Button Theme`,
    }),
    ...generateButtonField({
      name: "button_two",
      titleLabel: "Button Two Title",
      destinationLabel: "Button Two Destination",
      themeLabel: `Button Two Theme`,
      initialTitle: null,
    }),
    defineField({
      name: "invert_text_color",
      title: "Invert Text Color",
      type: "boolean",
      initialValue: () => true,
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
        subtitle: "Hero Variant 03",
      };
    },
  },
});

export default HeroVariant03;
