"use client";
import styled from "styled-components";
import Bounded from "@/components/wrappers/Bounded";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import BackgroundImageWithTint from "@/components/ui/BackgroundImageWithTint";

const Wrapper = styled.div`
  .b__cta__variant02 {
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

const CtaVariant02 = ({ data = {}, index }) => {
  const invertTextClassName = data?.invert_text_color ? `u__text-inverted` : ``;
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__cta__variant02 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
          )}
        />
      )}
      {data.background_image && (
        <BackgroundImageWithTint
          src={urlFor(data.background_image).url()}
          alt={data.background_image.alt}
          blurDataURL={data?.background_image.asset?.metadata?.lqip}
          enableBackgroundTint={data.enable_background_tint}
        />
      )}
      <Wrapper>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className={cn(invertTextClassName)}>
                {data.heading && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0}
                  >
                    <div className="c__heading-wrapper mb-[1rem]">
                      <Heading
                        tag={data.heading_tag || "h2"}
                        className={`u__h1 mb-0`}
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
                    <div className={`c__description-wrapper`}>
                      <Heading
                        tag={data.description_tag || "p"}
                        className="u__subtitle u__f-400 mb-0"
                      >
                        {data.description}
                      </Heading>
                    </div>
                  </ConditionalBlurFade>
                )}
              </div>
            </div>
            <div className="col-lg-5">
              {data.button_title && (
                <ConditionalBlurFade
                  enabled={data?.enable_animations}
                  delay={0.2}
                >
                  <div className="c__button-wrapper mt-[2rem] lg:mt-0">
                    <div
                      className={`flex flex-col justify-start lg:justify-end gap-[12px] min-[500px]:flex-row`}
                    >
                      {data.button_title && (
                        <Button
                          destination={data.button_destination}
                          title={data.button_title}
                          target={data.button_open_in_new_tab}
                          theme={data.button_theme}
                          size={`large`}
                          className={`w-auto`}
                          renderArrow
                        />
                      )}
                    </div>
                  </div>
                </ConditionalBlurFade>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default CtaVariant02;
