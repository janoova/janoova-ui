import { defineField, defineType } from "sanity";
import { scopedCss } from "../defaultFields";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
const blockCategory = "modal";
const ModalVariant01 = defineType({
  name: "ModalVariant01",
  title: "Modal Variant 01",
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
      name: "modal_id",
      title: "Modal ID",
      type: "string",
      initialValue: "",
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: null,
      group: "content",
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "form" }],
      group: "content",
    }),
  ],
  preview: {
    select: {
      formId: "form.form_id",
      formRef: "form",
    },
    prepare(selection) {
      const { formId, formRef } = selection;
      return {
        title: `Modal Form`,
        subtitle: "Modal Variant 01",
      };
    },
  },
});

export default ModalVariant01;
