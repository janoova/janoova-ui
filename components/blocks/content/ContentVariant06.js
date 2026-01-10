"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import IconCard from "@/components/ui/IconCard";
import RichtextField from "@/components/ui/RichtextField";
import Description from "@/components/ui/Description";
import urlFor from "@/lib/imageUrlBuilder";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__content__variant06 {
    &__grid-row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 3rem;
      @media (min-width: 768px) {
        --bs-gutter-x: 4rem;
      }
    }
    &__row {
      @media (min-width: 992px) {
        display: flex;
        margin-left: -12px;
        margin-right: -12px;
        flex-wrap: nowrap;
      }
    }
    &__column {
      width: 100%;
      @media (min-width: 992px) {
        padding-left: 12px;
        padding-right: 12px;
      }
      &--image {
        margin-bottom: 1.75rem;
        @media (min-width: 992px) {
          margin-bottom: 0;
          max-width: 35%;
          flex: 0 0 35%;
        }
        @media (min-width: 1200px) {
          max-width: 32%;
          flex: 0 0 32%;
        }
      }
      &--content {
        @media (min-width: 992px) {
          max-width: 65%;
          flex: 0 0 65%;
        }
        @media (min-width: 1200px) {
          max-width: 68%;
          flex: 0 0 68%;
        }
      }
    }
    &__image-wrapper {
      @media (min-width: 992px) {
        padding-right: 1rem;
        height: 100%;
      }
      figure {
        @media (min-width: 992px) and (max-width: 1200px) {
          height: 100%;
        }
      }
      img {
        border-radius: var(--t-global-image-border-radius);
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-height: 275px;
        @media (min-width: 576px) {
          max-height: 330px;
        }
        @media (min-width: 768px) {
          max-height: 360px;
        }
        @media (min-width: 992px) and (max-width: 1200px) {
          min-height: 100%;
        }
        @media (min-width: 992px) {
          max-height: 420px;
        }
      }
    }
    &__content-wrapper {
      @media (min-width: 992px) {
        padding-left: 1rem;
      }
    }
    &__content-grid {
      margin-top: 2rem;
      @media (min-width: 992px) {
        margin-top: 4rem;
      }
      &__row {
        @media (min-width: 768px) {
          display: flex;
          flex-wrap: wrap;
          margin-left: -20px;
          margin-right: -20px;
        }
        @media (min-width: 992px) {
          margin-left: -20px;
          margin-right: -20px;
        }
        @media (min-width: 1200px) {
          margin-left: -33px;
          margin-right: -33px;
        }
      }
      &__column {
        width: 100%;
        margin-bottom: 1.75rem;
        @media (min-width: 768px) {
          max-width: 50%;
          flex: 0 0 50%;
          padding-left: 20px;
          padding-right: 20px;
        }
        @media (min-width: 992px) {
          padding-left: 20px;
          padding-right: 20px;
          max-width: 33.3333336%;
          flex: 0 0 33.3333336%;
        }
        @media (min-width: 1200px) {
          padding-left: 33px;
          padding-right: 33px;
        }
      }
    }
  }
  .c__stacked-icon-with-description {
    &__icon-wrapper {
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
  }
`;

const cardColumns = {
  2: "col-lg-6",
  3: "col-lg-4",
  4: "col-lg-3",
};

const ContentVariant06 = ({ data = {}, index }) => {
  const dataCardColumns = getCleanValue(data.card_columns);
  const columnClassName = `col-md-6 ${dataCardColumns ? cardColumns[dataCardColumns] : `col-lg-4`}`;

  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__content__variant06 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container">
          <div className={`c__two-column-title-with-cta`}>
            <div className="c__two-column-title-with-cta__wrapper">
              <div className="c__two-column-title-with-cta__column">
                <div className="c__heading-and-description">
                  {data.heading && (
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0}
                    >
                      <div className="c__heading-wrapper mb-[1rem]">
                        <Heading
                          tag={data.heading_tag || "h2"}
                          className={`u__h1`}
                        >
                          {data.heading}
                        </Heading>
                      </div>
                    </ConditionalBlurFade>
                  )}
                  {data.description && (
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0.1}
                    >
                      <div className="c__description-wrapper">
                        <Description className="u__h6">
                          {data.description}
                        </Description>
                      </div>
                    </ConditionalBlurFade>
                  )}
                </div>
              </div>
              {data.button_title && (
                <div className="c__two-column-title-with-cta__column">
                  <div className="c__two-column-title-with-cta__button-wrapper mt-[1.5rem] lg:mt-0">
                    <Button
                      destination={data.button_destination}
                      title={data.button_title}
                      target={data.button_open_in_new_tab}
                      theme={data.button_theme}
                      className={`w-auto`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-[3rem] lg:mt-[3.5rem]">
          <div className="b__content__variant06__row">
            {data?.image?.asset && (
              <div className="b__content__variant06__column b__content__variant06__column--image">
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0.2}
                  className="h-full"
                >
                  <div className="b__content__variant06__image-wrapper relative">
                    <figure className="m-0 inline">
                      <Image
                        placeholder="blur"
                        blurDataURL={
                          data?.image?.asset?.metadata?.lqip ||
                          fallbackImageBlurDataUrl
                        }
                        src={urlFor(data.image).url()}
                        alt={data.image.alt ?? ""}
                        sizes="100vw"
                        width={800}
                        height={800}
                      />
                    </figure>
                  </div>
                </ConditionalBlurFade>
              </div>
            )}
            <div className="b__content__variant06__column b__content__variant06__column--content">
              <div className="b__content__variant06__content-wrapper">
                {data.content && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0.2}
                  >
                    <RichtextField
                      className="u__subtitle"
                      content={data.content}
                    />
                  </ConditionalBlurFade>
                )}
                {data.repeater && (
                  <div className="b__content__variant06__content-grid">
                    <div className="row b__content__variant06__grid-row">
                      {data.repeater.map((elem, index) => {
                        const {
                          icon_svg,
                          icon_type,
                          icon_color,
                          image,
                          heading,
                          description,
                          button_title,
                          button_destination,
                          button_open_in_new_tab,
                        } = elem;

                        const imageObj = image
                          ? {
                              src: urlFor(image).url(),
                              alt: image.alt || null,
                            }
                          : null;
                        return (
                          <div key={index} className={columnClassName}>
                            <ConditionalBlurFade
                              className={`h-full`}
                              enabled={data.enable_animations}
                              delay={0.3 + index * 0.1}
                            >
                              <IconCard
                                style={
                                  getCleanValue(data.card_style) || `block`
                                }
                                headingTag={getCleanValue(
                                  data.card_heading_tag
                                )}
                                icon={imageObj}
                                iconSvg={icon_svg}
                                iconType={icon_type}
                                iconColor={icon_color}
                                heading={heading}
                                description={description}
                                buttonTitle={button_title}
                                buttonDestination={button_destination}
                                buttonTarget={button_open_in_new_tab}
                              />
                            </ConditionalBlurFade>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant06;
