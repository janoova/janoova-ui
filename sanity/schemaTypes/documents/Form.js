const Form = {
  name: "form",
  title: "Forms",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      // validation: (rule) => rule.warning("Title is required"),
      validation: (rule) => rule.required(),
    },
    {
      name: "notification_email",
      title: "Notification Email",
      description: "Email(s) to receive form submission notifications. Separate multiple with commas.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "form_fields",
      title: "Form Fields",
      type: "code",
      options: {
        language: "js",
        languageAlternatives: [{ title: "JavaScript", value: "js" }],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "button_title",
      title: "Button Title",
      type: "string",
    },
    {
      name: "thankyou_message",
      title: "Thank You Message",
      type: "string",
    },

    {
      name: "redirect_url",
      title: "Redirect URL",
      type: "string",
    },
    {
      name: "enable_recaptcha",
      title: "Enable reCAPTCHA",
      description: "Verify submissions with Google reCAPTCHA v3. Requires reCAPTCHA keys in Site Settings > Integrations.",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      notification_email: "notification_email",
    },
    prepare(selection) {
      const { title, notification_email } = selection;
      return {
        title,
        subtitle: notification_email || "",
      };
    },
  },
};

export default Form;
