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
import { fallbackImageBlurDataUrl } from "@/lib/constants";
import Description from "@/components/ui/Description";

const Wrapper = styled.div`
  .b__hero__variant10 {
    &__image {
      border-radius: var(--t-global-image-border-radius);
      object-fit: cover;
      width: 100%;
      height: 100%;
      @media (max-width: 500px) {
        border-radius: 0;
      }
      &-wrapper {
        @media (max-width: 500px) {
          margin-left: -13px;
          margin-right: -13px;
        }
        height: 350px;
        position: relative;
        @media (min-width: 768px) {
          height: 500px;
        }
        @media (min-width: 992px) {
          width: 100%;
          height: 100%;
          min-height: 550px;
        }
      }
    }
  }
`;

const HeroVariant10 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__hero__variant10 overflow-hidden relative max-[500px]:!pb-0"
    >
      {data?.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]",
          )}
        />
      )}
      <Wrapper className="container relative u__z-index-1">
        <div className="b__hero__variant10__content-wrapper max-w-[800px]">
          {data.label && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
              <div className="c__label-wrapper mb-[0.5rem]">
                <Heading
                  tag={data.label_heading_tag || "span"}
                  className={`u__small u__text-branding-primary u__f-700`}
                >
                  {data.label}
                </Heading>
              </div>
            </ConditionalBlurFade>
          )}
          {data.heading && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
              <div className="c__heading-wrapper mb-[1rem]">
                <Heading tag={data.heading_tag || "h1"} className={`u__d2`}>
                  {data.heading}
                </Heading>
              </div>
            </ConditionalBlurFade>
          )}

          {data.content && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
              <div className="c__description-wrapper">
                <Description className="u__h6">{data.content}</Description>
              </div>
            </ConditionalBlurFade>
          )}

          {data.button_title && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.3}>
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
                      renderArrow
                    />
                  )}
                </div>
              </div>
            </ConditionalBlurFade>
          )}
        </div>

        {data?.image?.asset && (
          <>
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.3}>
              <div className="b__hero__variant10__image-wrapper mt-[2.5rem] md:mt-[4rem]">
                <Image
                  className="b__hero__variant10__image"
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
      </Wrapper>
    </Bounded>
  );
};

export default HeroVariant10;
