import { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import { getCleanValue } from "@/lib/helpers";

export const useFormSubmission = ({
  formspark_id,
  thankyou_message,
  redirect_url,
  reset,
  gtm_event_name = "form-submission-success",
}) => {
  const FORMSPARK_FORM_ID = getCleanValue(formspark_id);
  const [formMessage, setFormMessage] = useState(null);
  const [payloadPosting, setPayloadPosting] = useState(false);
  const [submit] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const onSubmit = async (data) => {
    setPayloadPosting(true);
    setFormMessage(null);
    try {
      const payloadResponse = await submit(data);
      setPayloadPosting(false);
      reset();
      setFormMessage({
        type: `success`,
        message: thankyou_message || `Thanks for submitting the form!`,
      });

      // Push event to dataLayer for GTM
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: gtm_event_name,
          formId: FORMSPARK_FORM_ID,
          formData: data,
          response: payloadResponse,
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
        type: `error`,
        message: `Oops, something went wrong. Please try again later`,
      });
    }
  };

  return {
    formMessage,
    payloadPosting,
    onSubmit,
  };
};
