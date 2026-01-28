"use client";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Bounded from "@/components/wrappers/Bounded";
import { getCleanValue } from "@/lib/helpers";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import { fallbackImageBlurDataUrl } from "@/lib/constants";
import BackgroundImageWithTint from "@/components/ui/BackgroundImageWithTint";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import Description from "@/components/ui/Description";
import Pill from "@/components/ui/Pill";

const Wrapper = styled.div`
  .b__hero__variant09 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 2.5rem;
      @media (min-width: 992px) {
        --bs-gutter-x: 3rem;
        --bs-gutter-y: 0;
      }
      @media (min-width: 1200px) {
        --bs-gutter-x: 8rem;
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
          height: 550px;
        }
        @media (min-width: 992px) {
          width: 100%;
          height: 100%;
          min-height: 600px;
        }
        @media (min-width: 1200px) {
          min-height: 650px;
        }
      }
    }
  }
`;

const HeroVariant09 = ({ data = {}, index }) => {
  const invertTextClassName = data?.invert_text_color ? `u__text-inverted` : ``;
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className={`b__hero__variant09 py-0 overflow-hidden relative`}
    >
      <div
        className={`b__hero__variant09__block-wrapper relative px-[0] px-[0] py-[5rem] sm:py-[7rem] [@media(min-width:992px)]:px-[1.5rem] [@media(min-width:992px)]:py-[100px] [@media(min-width:992px)]:m-4 [@media(min-width:992px)]:rounded-3xl [@media(min-width:992px)]:overflow-hidden ${data.background_theme && `u__background-${getCleanValue(data.background_theme)}`}`}
      >
        {data?.enable_background_pattern && (
          <BackgroundPattern
            patternType={data?.background_pattern_type ?? `dots`}
            className={cn(
              "[mask-image:radial-gradient(circle_at_center,white,transparent_70%)]",
            )}
          />
        )}
        {data.background_image && (
          <BackgroundImageWithTint
            src={urlFor(data.background_image).url()}
            alt={data.background_image.alt}
            blurDataURL={data.background_image?.asset?.metadata?.lqip}
            enableBackgroundTint={data.enable_background_tint}
          />
        )}
        <Wrapper className="container relative u__z-index-1">
          <div
            className={`row b__hero__variant09__row ${data.align_items_center ? "items-center" : ``}`}
          >
            <div className="col-lg-6">
              <div className={cn(`text-left`, invertTextClassName)}>
                {data.label && (
                  <ConditionalBlurFade enabled={data?.enable_animations}>
                    <Pill title={data.label} />
                  </ConditionalBlurFade>
                )}
                {data.heading && (
                  <ConditionalBlurFade enabled={data?.enable_animations}>
                    <div
                      className={`c__heading-wrapper ${data.description ? `mb-[1rem]` : `mb-0`}`}
                    >
                      <Heading
                        tag={data.heading_tag || `h1`}
                        className={`u__${data.heading_size ? data.heading_size : `d2`} ${!data.description && `mb-0`}`}
                      >
                        {data.heading}
                      </Heading>
                    </div>
                  </ConditionalBlurFade>
                )}
                {data.description && (
                  <ConditionalBlurFade
                    enabled={data?.enable_animations}
                    delay={0.1}
                  >
                    <div
                      className={`c__subtitle-wrapper ${data.button_title ? `mb-[1rem]` : ``}`}
                    >
                      <Description
                        tag={data?.description_tag ?? `p`}
                        className={`u__${data.description_size ? data.description_size : `h6`}  ${data.button_title ? `mb-[0.5rem]` : `mb-[0]`}`}
                      >
                        {data.description}
                      </Description>
                    </div>
                  </ConditionalBlurFade>
                )}
                {data.button_title && (
                  <ConditionalBlurFade
                    enabled={data?.enable_animations}
                    delay={0.2}
                  >
                    <div className="c__button-wrapper mt-[2rem]">
                      <div
                        className={`flex flex-col gap-[12px] min-[500px]:flex-row justify-start`}
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
            </div>
            <div className="col-lg-6">
              {data?.image?.asset && (
                <>
                  <ConditionalBlurFade
                    enabled={data?.enable_animations}
                    delay={0.3}
                  >
                    <div className="b__hero__variant09__image-wrapper">
                      <Image
                        className="b__hero__variant09__image"
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
      </div>
    </Bounded>
  );
};

export default HeroVariant09;
