"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import RichtextField from "@/components/ui/RichtextField";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__content__variant07 {
    &__grid-row {
      --bs-gutter-y: 1rem;
      @media (min-width: 992px) {
        --bs-gutter-x: 4rem;
        --bs-gutter-y: 0rem;
      }
    }
    &__wrapper {
      padding: 2rem 1.5rem;
      border-radius: 16px;
      &--theme {
        &-primary {
          background-color: var(--t-primary-branding-color);
        }
        &-secondary {
          background-color: var(--t-secondary-branding-color);
        }
      }
      @media (min-width: 576px) {
        padding: 2rem;
      }
      @media (min-width: 768px) {
        padding: 3rem;
      }
      @media (min-width: 992px) {
        padding: 3.4rem 4.9rem;
      }
      @media (min-width: 1200px) {
        padding: 3.75rem 4.9rem 4rem 4.9rem;
      }
    }
  }
`;

const ContentVariant07 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__content__variant07 overflow-hidden relative"
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
          <div
            className={`b__content__variant07__wrapper b__content__variant07__wrapper--theme-${getCleanValue(data.theme) || `primary`}`}
          >
            <div
              className={`b__content__variant07__content-wrapper ${getCleanValue(data.disable_inverted_text) || `u__text-inverted`}`}
            >
              {data.heading && (
                <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                  <div className="c__heading-wrapper mb-[1.5rem]">
                    <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                      {data.heading}
                    </Heading>
                  </div>
                </ConditionalBlurFade>
              )}
              <div className="row b__content__variant07__grid-row">
                <div
                  className={`${getCleanValue(data.disable_second_column) ? `col-lg-12` : `col-lg-6`}`}
                >
                  {data.content_left && (
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0.2}
                    >
                      <RichtextField
                        className={`u__${getCleanValue(data.content_size) || "h6"}`}
                        content={data.content_left}
                      />
                    </ConditionalBlurFade>
                  )}
                </div>
                {!data.disable_second_column && (
                  <div className="col-lg-6">
                    {data.content_right && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.3}
                      >
                        <RichtextField
                          className={`u__${getCleanValue(data.content_size) || "h6"}`}
                          content={data.content_right}
                        />
                      </ConditionalBlurFade>
                    )}
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

export default ContentVariant07;
