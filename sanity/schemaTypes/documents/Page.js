import { Groups } from "@/sanity/utils/constants";
import { isUniqueAcrossAllDocuments } from "@/sanity/utils/helpers";
import { defineField, defineArrayMember } from "sanity";
import { createDocumentArray } from "@/sanity/utils/helpers";
import pageBuilderBlocks from "../blocks";

const Page = {
  name: "page",
  title: "Pages",
  type: "document",
  groups: Groups,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.warning("Page title is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug || !slug.current) {
            return true; // Let the required() rule handle empty values
          }

          const slugPattern = /^[a-z0-9_\/-]+$/;

          if (!slugPattern.test(slug.current)) {
            return "Slug can only contain lowercase letters, numbers, underscores, hyphens, and forward slashes.";
          }

          return true;
        }),
      options: {
        source: "title",
        isUnique: isUniqueAcrossAllDocuments,
      },
    },
    {
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (rule) => rule.warning("Meta description is required"),
    },
    {
      name: "seo_no_index",
      title: "Do not index this page",
      description:
        "If checked, this content won't be indexed by search engines.",
      type: "boolean",
      group: "seo",
      initialValue: () => false,
    },
    {
      name: "featured_image",
      title: "Featured Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    defineField({
      name: "page_builder",
      title: "Page Builder",
      type: "array",
      group: "content",
      of: createDocumentArray(pageBuilderBlocks),
      options: {
        insertMenu: {
          groups: [
            {
              name: "hero",
              title: "Hero",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "hero")
                ?.map((elem) => elem.name),
            },
            {
              name: "feature",
              title: "Feature",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "feature")
                ?.map((elem) => elem.name),
            },
            {
              name: "content",
              title: "Content",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "content")
                ?.map((elem) => elem.name),
            },
            {
              name: "faq",
              title: "FAQs",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "faq")
                ?.map((elem) => elem.name),
            },
            {
              name: "cta",
              title: "CTAs",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "cta")
                ?.map((elem) => elem.name),
            },
            {
              name: "partner",
              title: "Partners",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "partner")
                ?.map((elem) => elem.name),
            },
            {
              name: "stats",
              title: "Stats",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "stats")
                ?.map((elem) => elem.name),
            },
            {
              name: "testimonial",
              title: "Testimonials",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "testimonial")
                ?.map((elem) => elem.name),
            },
            {
              name: "feed",
              title: "Feeds",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "feed")
                ?.map((elem) => elem.name),
            },
            {
              name: "modal",
              title: "Modals",
              of: pageBuilderBlocks
                .filter((elem) => elem._menuCategory === "modal")
                ?.map((elem) => elem.name),
            },
          ],
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaTypeName) =>
                `/static/previews/blocks/${schemaTypeName}.png`,
            },
            { name: "list" },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      featured_image: "featured_image",
    },
    prepare(selection) {
      const { title, slug, featured_image } = selection;
      return {
        title,
        subtitle: slug && (slug === "index" ? "/" : `/${slug}`),
        media: featured_image,
      };
    },
  },
};

export default Page;
