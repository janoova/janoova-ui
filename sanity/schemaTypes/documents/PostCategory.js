import { Groups } from "@/sanity/utils/constants";
import { isUniqueAcrossAllDocuments } from "@/sanity/utils/helpers";
import { defineField, defineArrayMember } from "sanity";

const PostCategory = {
  name: "post_category",
  title: "Post Categories",
  type: "document",
  groups: Groups,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
        subtitle:
          slug && (slug === "index" ? "/category" : `/category/${slug}`),
        media: featured_image,
      };
    },
  },
};

export default PostCategory;
