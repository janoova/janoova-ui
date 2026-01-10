import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";

import {
  scopedCss,
  generateHeadingTagField,
  generateBackgroundPatternField,
  generateButtonField,
} from "../defaultFields";

const blockLabel = `Hero Variant 01`;
const blockCategory = "hero";

const HeroVariant01 = defineType({
  name: "HeroVariant01",
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
      name: "enable_blobs",
      title: "Enable Blobs",
      type: "boolean",
      initialValue: () => false,
      group: "style",
    }),
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
      initialValue: `Data to enrich your <br class="u__show-after-992" />online business`,
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
        "Gubergren, no sea takimata sanctus est <br>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      rows: 4,
      group: "content",
    }),

    generateHeadingTagField({
      name: `description_heading_tag`,
      title: `Description Heading Tag`,
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "text",
      initialValue: `consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`,
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
      themeLabel: `Button Two Theme`,
      initialTitle: null,
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
      console.log(selection);
      const { heading } = selection;
      return {
        title: heading || "Heading needs to be set",
        subtitle: blockLabel,
      };
    },
  },
});

export default HeroVariant01;
