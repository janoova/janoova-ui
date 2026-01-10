"use client";
import Button from "@/components/ui/Button";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import urlFor from "@/lib/imageUrlBuilder";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import RichtextField from "@/components/ui/RichtextField";
import { fallbackImageBlurDataUrl } from "@/lib/constants";

const Wrapper = styled.div`
  .b__feature__variant01 {
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
    &__image {
      border-radius: var(--t-global-image-border-radius);
      object-fit: cover;
      width: 100%;
      height: 100%;
      &-wrapper {
        height: 350px;
        position: relative;
        @media (min-width: 768px) {
          height: 500px;
        }
        @media (min-width: 992px) {
          width: 100%;
          height: 100%;
          min-height: 450px;
        }
      }
    }
  }
`;

const FeatureVariant01 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__feature__variant01 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
          )}
        />
      )}

      <Wrapper className="container relative u__z-index-1">
        <div
          className={`row b__feature__variant01__row ${data.align_items_center ? "items-center" : ``}`}
        >
          <div
            className={`col-lg-6 ${data.invert_order ? `lg:order-2` : `lg:order-1`}`}
          >
            {data.label && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__label-wrapper mb-[0.5rem]">
                  <Heading
                    tag={data.label_heading_tag || "span"}
                    className={`u__subtitle u__text-branding-primary u__f-500`}
                  >
                    {data.label}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.content && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
                <RichtextField content={data.content} />
              </ConditionalBlurFade>
            )}

            {data.button_title && (
              <ConditionalBlurFade
                enabled={data?.enable_animations}
                delay={0.3}
              >
                <div className="c__button-wrapper mt-[2rem]">
                  <div
                    className={`flex flex-col gap-[12px] min-[500px]:flex-row`}
                  >
                    {data.button_title && (
                      <Button
                        destination={data.button_destination}
                        title={data.button_title}
                        target={data.button_open_in_new_tab}
                        theme={data.button_theme}
                        className={`${data.button_two_title ? "w-full min-[500px]:w-auto" : "w-auto"}`}
                      />
                    )}
                    {data.button_two_title && (
                      <Button
                        destination={data.button_two_destination}
                        title={data.button_two_title}
                        target={data.button_two_open_in_new_tab}
                        theme={data.button_two_theme}
                        className="w-full min-[500px]:w-auto"
                      />
                    )}
                  </div>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
          <div
            className={`col-lg-6 ${data.invert_order ? `lg:order-1` : `lg:order-2`}`}
          >
            {data?.image?.asset && (
              <>
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.2}
                >
                  <div className="b__feature__variant01__image-wrapper">
                    <Image
                      className="b__feature__variant01__image"
                      fill={true}
                      placeholder="blur"
                      blurDataURL={
                        data?.image?.asset?.metadata?.lqip ||
                        fallbackImageBlurDataUrl
                      }
                      src={urlFor(data.image).url()}
                      alt={data.image.alt ?? ""}
                      sizes="100%"
                    />
                  </div>
                </ConditionalBlurFade>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default FeatureVariant01;
