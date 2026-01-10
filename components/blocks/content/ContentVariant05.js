"use client";
import Bounded from "@/components/wrappers/Bounded";
import Button from "@/components/ui/Button";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import IconCard from "@/components/ui/IconCard";
import RichtextField from "@/components/ui/RichtextField";
import Description from "@/components/ui/Description";
import urlFor from "@/lib/imageUrlBuilder";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__content__variant05 {
    &__grid-row {
      &--main {
        --bs-gutter-y: 2rem;
        @media (min-width: 992px) {
          --bs-gutter-x: 3rem;
          --bs-gutter-y: 0;
        }
        @media (min-width: 1200px) {
          --bs-gutter-x: 6rem;
        }
        .col-lg-8 {
          @media (min-width: 992px) {
            width: 63%;
          }
        }
        .col-lg-4 {
          @media (min-width: 992px) {
            width: 37%;
          }
        }
      }
      &--tile {
        --bs-gutter-x: 2rem;
        --bs-gutter-y: 2rem;
        height: 100%;
      }
    }
  }
`;

const ContentVariant05 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__content__variant05 overflow-hidden relative"
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
          {data.heading && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
              <div className="c__heading-wrapper mb-[1rem]">
                <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                  {data.heading}
                </Heading>
              </div>
            </ConditionalBlurFade>
          )}
          {data.description && (
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
              <div className="c__description-wrapper">
                <Description className="u__h6">{data.description}</Description>
              </div>
            </ConditionalBlurFade>
          )}
        </div>
        <div className="container mt-[1rem] lg:mt-[2rem] lg:pt-[1.5rem]">
          <div
            className={`row b__content__variant05__grid-row--main ${data.align_items_center ? `items-center` : ``}`}
          >
            <div className="col-lg-4">
              {data.content && (
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.2}
                >
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
            <div className="col-lg-8">
              {data.repeater && (
                <div className="row b__content__variant05__grid-row--tile">
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
                      <div key={index} className={`col-md-6`}>
                        <ConditionalBlurFade
                          className={`h-full`}
                          enabled={data.enable_animations}
                          delay={0.3 + index * 0.1}
                        >
                          <IconCard
                            style={getCleanValue(data.card_style)}
                            headingTag={getCleanValue(data.card_heading_tag)}
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
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant05;
