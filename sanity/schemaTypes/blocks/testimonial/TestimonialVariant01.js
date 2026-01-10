import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import { scopedCss, generateBackgroundPatternField } from "../defaultFields";
const blockCategory = "testimonial";
const TestimonialVariant01 = defineType({
  name: "TestimonialVariant01",
  title: "Testimonial Variant 01",
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
      name: "logo",
      title: "Logo",
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
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 4,
      initialValue: `"Working with [Company] transformed our marketing strategy and significantly increased our ROI! Their insights are invaluable."`,
      group: "content",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
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
      name: "person_name",
      title: "Person Name",
      type: "string",
      initialValue: `Emily Johnson`,
      group: "content",
    }),
    defineField({
      name: "person_title",
      title: "Person Title",
      type: "string",
      initialValue: `Marketing Director, TechCorp`,
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
        subtitle: "Testimonial Variant 01",
      };
    },
  },
});

export default TestimonialVariant01;
