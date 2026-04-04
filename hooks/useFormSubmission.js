import { useState } from "react";
import { getCleanValue, checkValidJS } from "@/lib/helpers";
import { stegaClean } from "@sanity/client/stega";

export const useFormSubmission = ({
  form_title,
  notification_email,
  form_fields,
  thankyou_message,
  redirect_url,
  reset,
  gtm_event_name = "form-submission-success",
}) => {
  const [formMessage, setFormMessage] = useState(null);
  const [payloadPosting, setPayloadPosting] = useState(false);

  const onSubmit = async (data) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      // Build a name→label map from the form field definitions
      let fieldLabels = {};
      try {
        const code = stegaClean(`${form_fields?.code ?? ""}`);
        if (code && checkValidJS(`return ${code}`)) {
          const parsed = new Function(`return ${code}`)();
          if (Array.isArray(parsed)) {
            parsed.forEach((f) => {
              if (f.name && f.label) fieldLabels[f.name] = f.label;
            });
          }
        }
      } catch (_) {}

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: data,
          formTitle: getCleanValue(form_title),
          notificationEmail: getCleanValue(notification_email),
          fieldLabels,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setPayloadPosting(false);
      reset();
      setFormMessage({
        type: "success",
        message: thankyou_message || "Thanks for submitting the form!",
      });

      // Push event to dataLayer for GTM
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: gtm_event_name,
          formTitle: getCleanValue(form_title),
          formData: data,
        });
      }

      if (redirect_url && typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = redirect_url;
        }, 100);
      }
    } catch (err) {
      console.log(err);
      setPayloadPosting(false);
      setFormMessage({
        type: "error",
        message: "Oops, something went wrong. Please try again later",
      });
    }
  };

  return {
    formMessage,
    payloadPosting,
    onSubmit,
  };
};
