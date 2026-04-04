const FormSubmission = {
  name: "formSubmission",
  title: "Form Submissions",
  type: "document",
  fields: [
    {
      name: "form_title",
      title: "Form Title",
      type: "string",
    },
    {
      name: "notification_email",
      title: "Notification Email",
      type: "string",
    },
    {
      name: "page_url",
      title: "Page URL",
      type: "string",
    },
    {
      name: "submitted_at",
      title: "Submitted At",
      type: "datetime",
    },
    {
      name: "fields",
      title: "Fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Field Name", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "value" },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "form_title",
      subtitle: "submitted_at",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Submission",
        subtitle: subtitle ? new Date(subtitle).toLocaleString() : "",
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submitted_at", direction: "desc" }],
    },
  ],
};

export default FormSubmission;
