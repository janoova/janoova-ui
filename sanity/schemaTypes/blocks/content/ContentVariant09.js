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

const blockLabel = `Content Variant 09`;
const blockCategory = "content";
const ContentVariant09 = defineType({
  name: "ContentVariant09",
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
      initialValue: `Proudly Serving [[Chicago]] <br class="u__show-after-992" />and Surrounding Areas`,
      description:
        "Use [[text]] to wrap words that should have aurora effect (e.g., [[Chicago]])",
      group: "content",
    }),
    generateHeadingTagField({
      name: `heading_tag`,
      title: `Heading Tag`,
    }),
    defineField({
      name: "aurora_colors",
      title: "Aurora Text Colors",
      type: "array",
      of: [
        {
          type: "string",
          validation: (Rule) =>
            Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/, {
              name: "hex color",
              invert: false,
            }).error("Please enter a valid hex color (e.g., #ffbe4eff)"),
        },
      ],
      initialValue: ["#ffbe4eff", "#ffaa00ff", "#ff914e", "#ffd04eff"],
      description:
        "Colors for aurora text effect. Use hex values with optional alpha channel.",
      group: "style",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: `We're proud to be rooted in Chicago, delivering personalized services that <br className="u__show-after-992" /> understand the unique needs of local businesses and communities.`,
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "map_iframe_source",
      title: "Map iFrame Source",
      type: "string",
      group: "content",
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

export default ContentVariant09;
