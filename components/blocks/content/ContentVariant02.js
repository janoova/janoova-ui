"use client";
import Bounded from "@/components/wrappers/Bounded";
import Button from "@/components/ui/Button";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import RichtextField from "@/components/ui/RichtextField";

const Wrapper = styled.div`
  .b__content__variant02 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 2rem;
      @media (min-width: 992px) {
        --bs-gutter-x: 5rem;
      }
      @media (min-width: 1200px) {
        --bs-gutter-x: 6rem;
      }
      @media (min-width: 1300px) {
        --bs-gutter-x: 8rem;
      }
    }
  }
`;

const ContentVariant02 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__content__variant02 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container">
          <div className="row b__content__variant02__row">
            <div className="col-lg-6">
              <div className="b__content__variant02__content-wrapper">
                {data.label && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0}
                  >
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
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0.1}
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
                    delay={0.2}
                  >
                    <div className="c__description-wrapper">
                      <Description className="u__subtitle">
                        {data.description}
                      </Description>
                    </div>
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
            </div>
            <div className="col-lg-6">
              {data.content && (
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.3}
                >
                  <RichtextField
                    className="u__subtitle"
                    content={data.content}
                  />
                </ConditionalBlurFade>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant02;
