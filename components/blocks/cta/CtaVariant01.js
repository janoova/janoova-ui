"use client";
import styled from "styled-components";
import Bounded from "@/components/wrappers/Bounded";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__cta__variant01 {
    &__wrapper {
      border-radius: 16px;
      padding: 2rem;
      @media (min-width: 768px) {
        padding: 4rem;
      }
      &--theme {
        &-primary {
          background-color: var(--t-primary-branding-color);
        }
        &-secondary {
          background-color: var(--t-secondary-branding-color);
        }
      }
    }
  }
`;

const CtaVariant01 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__cta__variant01 overflow-hidden relative"
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
          <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
            <div
              className={`mx-auto b__cta__variant01__wrapper b__cta__variant01__wrapper--theme-${stegaClean(data.theme) || `primary`}`}
            >
              <div className="b__cta__variant01__content-wrapper text-center u__text-inverted">
                {data.heading && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0.1}
                  >
                    <div className="c__heading-wrapper mb-[1rem]">
                      <Heading
                        tag={data.heading_tag || "h2"}
                        className={`u__h2`}
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
                    <div className={`c__description-wrapper`}>
                      <Heading
                        tag={data.description_tag || "p"}
                        className="u__h5 u__f-400"
                      >
                        {data.description}
                      </Heading>
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
                        className={`flex flex-col justify-center gap-[12px] min-[500px]:flex-row`}
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
          </ConditionalBlurFade>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default CtaVariant01;
