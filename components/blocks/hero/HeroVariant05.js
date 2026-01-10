"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import BlurryBlob from "@/components/ui/BlurryBlob";
import Pill from "@/components/ui/Pill";
import Heading from "@/components/ui/Heading";
import Form from "@/components/ui/Form";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { ShineBorder } from "@/components/magicui/shine-border";
import RichtextField from "@/components/ui/RichtextField";
import { getCleanValue, parseArrayString } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__hero__variant05 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 2rem;
      @media (min-width: 992px) {
        --bs-gutter-x: 3rem;
        --bs-gutter-y: 0;
      }
      @media (min-width: 1200px) {
        --bs-gutter-x: 5rem;
      }
    }
    &__form-wrapper {
      padding: 2rem 1rem;
      @media (min-width: 768px) {
        padding: 4rem 2rem;
      }
      background-color: var(--t-cp-base-white);
      border-radius: 24px;
      border: 2px solid var(--t-border-color);
      box-shadow: var(--t-box-shadow-2xl);
      form {
        .c__button {
          width: 100%;
        }
      }
      &--with-heading {
        @media (min-width: 768px) {
          padding: 2rem;
        }
      }
    }
  }
`;

const HeroVariant05 = ({ data = {}, index }) => {
  const invertTextClassName = data?.invert_text_color ? `u__text-inverted` : ``;
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

  const beamColorList = (() => {
    const parsedArray = parseArrayString(getCleanValue(data?.beam_color_list));
    return parsedArray && parsedArray.length > 0
      ? parsedArray
      : ["var(--t-primary-branding-color)", "#FE8FB5", "#FFBE7B"];
  })();

  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__hero__variant05 overflow-hidden relative"
    >
      {data?.enable_background_pattern && (
        <BackgroundPattern
          patternType={data?.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      )}
      {data?.enable_blobs && (
        <>
          <BlurryBlob top="-20rem" left="-20rem" />
          <BlurryBlob
            bottom="-20rem"
            right="0rem"
            color="var(--t-blob-color-2)"
          />
        </>
      )}
      <Wrapper className="container relative u__z-index-1">
        <div
          className={`row b__hero__variant05__row ${data?.align_items_center ? "items-center" : ``}`}
        >
          <div className="col-lg-6">
            <div className={cn(invertTextClassName)}>
              {data.label && (
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0}
                >
                  <Pill title={data.label} />
                </ConditionalBlurFade>
              )}
              {data.heading && (
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0.1}
                >
                  <div className="c__heading-wrapper mb-[1rem]">
                    <Heading
                      tag={data.heading_tag || "h1"}
                      className={`u__${data.heading_size || "d2"}`}
                    >
                      {data.heading}
                    </Heading>
                  </div>
                </ConditionalBlurFade>
              )}
              {data.content && (
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0.2}
                >
                  <div className="c__description-wrapper">
                    <Description
                      className={cn(
                        `u__h6`,
                        !data.additional_content?.length > 0 &&
                          !data.button_title
                          ? `mb-0`
                          : ``
                      )}
                    >
                      {data.content}
                    </Description>
                  </div>
                </ConditionalBlurFade>
              )}

              {data.additional_content?.length > 0 && (
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.2}
                >
                  <RichtextField
                    content={data.additional_content}
                    className={`u__${data.heading_size} || p`}
                  />
                </ConditionalBlurFade>
              )}

              {data.button_title && (
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0.3}
                >
                  <div className="c__button-wrapper mt-[2.5rem]">
                    <Button
                      destination={data.button_destination}
                      title={data.button_title}
                      target={data.button_open_in_new_tab}
                      theme={data.button_theme}
                    />
                  </div>
                </ConditionalBlurFade>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="lg:pl-[3rem]">
              <div className="relative">
                {form_fields && (
                  <ConditionalBlurFade
                    enabled={data?.enable_animations}
                    delay={0.3}
                  >
                    <div
                      className={cn(
                        `b__hero__variant05__form-wrapper`,
                        (data?.form_heading || data?.form_description) &&
                          `b__hero__variant05__form-wrapper--with-heading`
                      )}
                    >
                      {data?.enable_form_beam && (
                        <ShineBorder shineColor={beamColorList} />
                      )}
                      {(data?.form_heading || data?.form_description) && (
                        <div
                          className={`mb-[1.5rem] text-${getCleanValue(data?.form_header_alignment) || `left`}`}
                        >
                          <div className="c__heading-wrapper mb-[0.5rem]">
                            <Heading
                              tag={data?.form_heading_tag || "span"}
                              className="u__h4 mb-[0]"
                            >
                              {data?.form_heading}
                            </Heading>
                          </div>
                          <div className="c__description-wrapper">
                            <Description className="mb-0">
                              {data?.form_description}
                            </Description>
                          </div>
                        </div>
                      )}
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
                  </ConditionalBlurFade>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default HeroVariant05;
