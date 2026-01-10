import { Groups } from "@/sanity/utils/constants";
import { defineField } from "sanity";
import { generateLinkField } from "../blocks/defaultFields";
import { isUniqueAcrossAllDocuments } from "@/sanity/utils/helpers";
import { uuid } from "@sanity/uuid";

const Navigation = {
  name: "navigation",
  title: "Navigation",
  type: "document",
  groups: Groups,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        isUnique: isUniqueAcrossAllDocuments,
      },
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          name: "link_list",
          title: "Link List",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "destination",
              title: "Destination",
              type: "string",
            }),
            defineField({
              name: "uid",
              title: "UID",
              type: "slug",
              description: "Please verify this is unique across all menu items",
              initialValue: uuid(),
              validation: (Rule) => Rule.required(),
              options: {
                source: () => {
                  return `${uuid()}`;
                },
                isUnique: isUniqueAcrossAllDocuments,
              },
            }),
            defineField({
              name: "links",
              type: "array",
              of: [generateLinkField(`link_count_2`, `Link Count 2`)],
            }),
          ],
          preview: {
            select: {
              title: "title",
              destination: "destination",
            },
            prepare: ({ title, destination }) => ({
              title,
              subtitle: destination,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title,
    }),
  },
};

export default Navigation;
