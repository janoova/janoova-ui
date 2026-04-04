import { defineField, defineType } from "sanity";

const GlobalTestimonials = defineType({
  name: "global_testimonials",
  title: "Global Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          name: "testimonial_global_item",
          title: "Testimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
            defineField({
              name: "person_name",
              title: "Person Name",
              type: "string",
            }),
            defineField({
              name: "person_title",
              title: "Person Title",
              type: "string",
            }),
            defineField({
              name: "person_linkedin_url",
              title: "Person LinkedIn URL",
              type: "string",
            }),
            defineField({
              name: "logo",
              title: "Company Logo",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
          ],
          preview: {
            select: {
              title: "person_name",
              subtitle: "person_title",
              media: "avatar",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Global Testimonials" };
    },
  },
});

export default GlobalTestimonials;
