import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateHeadingTagField,
  generateBackgroundPatternField,
  generateButtonField,
} from "../defaultFields";
const blockCategory = "hero";
const HeroVariant06 = defineType({
  name: "HeroVariant06",
  title: "Hero Variant 06",
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
    defineField({
      name: "block_category",
      title: "Block Category",
      type: "string",
      initialValue: blockCategory,
      readOnly: true,
      hidden: true,
    }),
    defineField(copyPaste),
    defineField(scopedCss),
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
      type: "string",
      initialValue: "Data to Enrich Your Online Business",
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
      initialValue: `Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.`,
      rows: 4,
      group: "content",
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
      themeLabel: `Button Theme`,
      initialTitle: null,
    }),
    defineField({
      name: "image",
      title: "Image",
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
      name: "align_items_center",
      title: "Align Items Center",
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
        subtitle: "Hero Variant 06",
      };
    },
  },
});

export default HeroVariant06;
