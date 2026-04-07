import { defineField, defineType } from "sanity";
import { copyPaste } from "@superside-oss/sanity-plugin-copy-paste";
import {
  scopedCss,
  generateHeadingTagField,
  generateBackgroundPatternField,
} from "../defaultFields";

const blockCategory = "team";

// Shared team member object — used for both inline and (mirrored in) GlobalTeam
const teamMemberFields = [
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
    description: "Optional short blurb shown on the card below the title.",
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
];

const TeamVariant01 = defineType({
  name: "TeamVariant01",
  title: "Team Variant 01",
  type: "object",
  _menuCategory: blockCategory,
  groups: [
    { name: "content", title: "Content" },
    { name: "style", title: "Style" },
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
      name: "label",
      title: "Section Label",
      type: "string",
      initialValue: "Our Team",
      description: "Small branding-coloured label displayed above the heading.",
      group: "content",
    }),
    generateHeadingTagField({ name: "label_heading_tag", title: "Label Heading Tag" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Meet Our Team",
      group: "content",
    }),
    generateHeadingTagField({ name: "heading_tag", title: "Heading Tag" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      initialValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      group: "content",
    }),
    // Global team toggle
    defineField({
      name: "use_global_team",
      title: "Use Global Team Members",
      type: "boolean",
      initialValue: false,
      description: "When enabled, the inline team members below are ignored and the global list is used.",
      group: "content",
    }),
    defineField({
      name: "global_team_ref",
      title: "Global Team Source",
      type: "reference",
      to: [{ type: "global_team" }],
      group: "content",
      hidden: ({ parent }) => !parent?.use_global_team,
    }),
    // Inline team members
    defineField({
      name: "repeater",
      title: "Team Members",
      type: "array",
      group: "content",
      hidden: ({ parent }) => !!parent?.use_global_team,
      of: [
        {
          type: "object",
          name: "team_member",
          title: "Team Member",
          fields: teamMemberFields,
          preview: {
            select: { title: "name", subtitle: "title", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "grid_columns",
      title: "Grid Columns",
      type: "string",
      initialValue: "4",
      group: "style",
      options: {
        list: [
          { title: "2 Columns", value: "2" },
          { title: "3 Columns", value: "3" },
          { title: "4 Columns", value: "4" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "show_short_description",
      title: "Show Short Description on Cards",
      type: "boolean",
      initialValue: true,
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
    select: { heading: "heading" },
    prepare(selection) {
      return {
        title: selection.heading || "Heading needs to be set",
        subtitle: "Team Variant 01",
      };
    },
  },
});

export default TeamVariant01;
