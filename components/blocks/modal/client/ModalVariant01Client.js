"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Form from "@/components/ui/Form";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import Modal from "@/components/ui/Modal";
import Heading from "@/components/ui/Heading";

const Wrapper = styled.div`
  .b__modal__variant01 {
    &__form-wrapper {
      form {
        .c__button {
          width: 100%;
        }
      }
    }
  }
`;

const ModelVariant01Client = ({ data = {}, index, siteSettings }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState: { isValid },
  } = useForm({
    mode: "all",
  });

  const {
    form_fields = null,
    formspark_id = null,
    button_title: formButtonTitle,
    redirect_url,
    thankyou_message,
  } = data?.form || {};

  const { formMessage, payloadPosting, onSubmit } = useFormSubmission({
    formspark_id,
    thankyou_message,
    redirect_url,
    reset,
  });

  if (!data?.modal_id) {
    console.warn("ModelVariant01Client requires a modal_id in data");
    return null;
  }

  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      index={index}
      className="b__modal__variant01 overflow-hidden relative py-0"
    >
      <Wrapper>
        <Modal
          scopedCss={data?.scoped_css}
          siteSettings={siteSettings}
          modalId={data?.modal_id}
        >
          {data?.heading && (
            <div className="px-[1.5rem] py-[0.5rem] rounded-[100px] bg-[var(--t-light-background-color)] text-center border-[2px] border-[solid] border-[#ff914e8c] w-auto md:w-max mx-auto mb-[1.5rem] [box-shadow:0px_1px_2px_rgba(16,_24,_40,_0.05),_0px_0px_0px_4px_var(--t-cp-error-50)]">
              <Heading tag={`span`} className="u__h6 u__f-700 mb-[0]">
                {data.heading}
              </Heading>
            </div>
          )}
          {form_fields && (
            <div className="b__modal__variant01__form-wrapper">
              <Form
                isValid={isValid}
                formFields={form_fields.code}
                register={register}
                errors={errors}
                control={control}
                onSubmit={handleSubmit(onSubmit)}
                payloadPosting={payloadPosting}
                formMessage={formMessage}
                buttonTitle={formButtonTitle ?? `Get Started`}
                includeHoneypot
              />
            </div>
          )}
        </Modal>
      </Wrapper>
    </Bounded>
  );
};

export default ModelVariant01Client;
