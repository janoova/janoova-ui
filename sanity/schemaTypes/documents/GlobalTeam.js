import { defineField, defineType } from "sanity";

const GlobalTeam = defineType({
  name: "global_team",
  title: "Global Team Members",
  type: "document",
  fields: [
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          name: "global_team_member",
          title: "Team Member",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title / Role",
              type: "string",
            }),
            defineField({
              name: "short_description",
              title: "Short Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "social_links",
              title: "Social Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "social_link",
                  title: "Social Link",
                  fields: [
                    defineField({
                      name: "platform",
                      title: "Platform",
                      type: "string",
                      options: {
                        list: [
                          { title: "LinkedIn", value: "linkedin" },
                          { title: "Twitter / X", value: "twitter" },
                          { title: "Facebook", value: "facebook" },
                          { title: "Instagram", value: "instagram" },
                          { title: "Website", value: "website" },
                          { title: "Email", value: "email" },
                        ],
                      },
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: { title: "platform", subtitle: "url" },
                  },
                },
              ],
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "array",
              of: [
                {
                  type: "block",
                  marks: {
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                            validation: (Rule) => Rule.required(),
                          },
                          {
                            name: "open_in_new_tab",
                            type: "boolean",
                            title: "Open in new tab",
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Global Team Members" };
    },
  },
});

export default GlobalTeam;
