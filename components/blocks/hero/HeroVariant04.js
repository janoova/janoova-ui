"use client";
import Button from "@/components/ui/Button";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import BlurryBlob from "@/components/ui/BlurryBlob";
import Pill from "@/components/ui/Pill";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { fallbackImageBlurDataUrl } from "@/lib/constants";

const Wrapper = styled.div`
  .b__hero__variant04 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 3rem;
      @media (min-width: 992px) {
        --bs-gutter-x: 3rem;
        --bs-gutter-y: 0;
      }
      @media (min-width: 1200px) {
        --bs-gutter-x: 5rem;
      }
    }
    &__col {
      &--image {
        position: relative;
        @media (max-width: 992px) {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    &__content-wrapper {
      padding: 4rem 0 1rem 0;
      z-index: 2;
      position: relative;
      @media (min-width: 992px) {
        padding: 10rem 0;
        max-width: 590px;
        margin-left: auto;
        margin-right: 0;
      }
    }
    &__image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      @media (max-width: 992px) {
        z-index: 2;
      }
      &-wrapper {
        height: 400px;
        position: relative;
        @media (min-width: 768px) {
          height: 600px;
        }
        @media (min-width: 992px) {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
        }
      }
      &-shape {
        display: none;
        @media (min-width: 1200px) {
          position: absolute;
          top: -10%;
          left: -5rem;
          bottom: -10%;
          width: 130px;
          height: 130%;
          background-color: var(--t-cp-base-white);
          transform: rotate(8deg);
          z-index: 1;
          display: block;
        }
      }
    }
  }
`;

const HeroVariant04 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__hero__variant04 overflow-hidden relative py-0"
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
          <BlurryBlob
            top="-20rem"
            left="-20rem"
            color="var(--t-blob-color-2)"
            zIndex="2"
          />
          <BlurryBlob bottom="-20rem" left="0rem" zIndex="2" />
        </>
      )}
      <Wrapper>
        <div className="container-fluid">
          <div className="row b__hero__variant04__row">
            <div className="col-lg-6 b__hero__variant04__col--content">
              <div className="b__hero__variant04__content-wrapper">
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
                      <Heading tag={data.heading_tag} className="u__d2">
                        {data.heading}
                      </Heading>
                    </div>
                  </ConditionalBlurFade>
                )}
                {data.description && (
                  <ConditionalBlurFade
                    enabled={data?.enable_animations}
                    delay={0.2}
                  >
                    <div className="c__description-wrapper">
                      <Description>{data.description}</Description>
                    </div>
                  </ConditionalBlurFade>
                )}

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
              </div>
            </div>
            <div className="col-lg-6 b__hero__variant04__col--image">
              {data?.image?.asset && (
                <div className="b__hero__variant04__image-wrapper">
                  {data.enable_image_shape && (
                    <div className="b__hero__variant04__image-shape"></div>
                  )}
                  <Image
                    className="b__hero__variant04__image"
                    fill={true}
                    placeholder="blur"
                    blurDataURL={
                      data.image.asset?.metadata?.lqip ||
                      fallbackImageBlurDataUrl
                    }
                    src={urlFor(data.image).url()}
                    alt={data.image.alt ?? ""}
                    sizes="100%"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default HeroVariant04;
