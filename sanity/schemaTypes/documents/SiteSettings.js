import { defineField, defineType } from "sanity";
import { generateRichtextField } from "../blocks/defaultFields";
export default defineType({
  name: "site_settings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "footer", title: "Footer" },
    { name: "social", title: "Social" },
    { name: "legal", title: "Legal" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "og_image",
      title: "Open Graph Image (Site-wide)",
      description:
        "Used for social sharing previews. Set page-specific images in Page documents.",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "header_button_title",
      title: "Header Button Title",
      type: "string",
      initialValue: `Get Strted`,
      group: "general",
    }),
    defineField({
      name: "header_button_destination",
      title: "Header Button Destination",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "header_click_to_call_title",
      title: "Header Click To Call Title",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "header_click_to_call_destination",
      title: "Header Click To Call Destination",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "footer_description",
      title: "Footer Description",
      type: "text",
      group: "footer",
      rows: 3,
    }),
    defineField({
      name: "footer_quick_menu_title",
      title: "Footer Quick Menu Title",
      type: "string",
      group: "footer",
      initialValue: `Quick Menu`,
    }),
    defineField({
      name: "footer_contact_title",
      title: "Footer Contact Title",
      type: "string",
      group: "footer",
      initialValue: `Get in Touch`,
    }),
    generateRichtextField({
      name: "footer_contact_richtext",
      title: "Footer Contact Richtext",
      group: "footer",
      initialValue: [],
    }),
    defineField({
      name: "instagram_url",
      title: "Instagram URL",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "facebook_url",
      title: "Facebook URL",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "x_url",
      title: "X URL",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "linkedin_url",
      title: "LinkedIn URL",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "youtube_url",
      title: "Youtube URL",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "privacy_policy_url",
      title: "Privacy Policy URL",
      type: "string",
      group: "legal",
    }),
    defineField({
      name: "terms_url",
      title: "Terms URL",
      type: "string",
      group: "legal",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Site settings",
    }),
  },
});
