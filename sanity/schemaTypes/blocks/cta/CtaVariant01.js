import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateButtonField,
  generateHeadingTagField,
  generateBackgroundPatternField,
} from "../defaultFields";

const blockLabel = `CTA Variant 01`;
const blockCategory = "cta";
const CtaVariant01 = defineType({
  name: "CtaVariant01",
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: `Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <br class="u__show-after-992" />Lorem ipsum dolor sit amet`,
      rows: 4,
      group: "content",
    }),
    generateHeadingTagField({
      name: `description_tag`,
      title: `Description Tag`,
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

export default CtaVariant01;
