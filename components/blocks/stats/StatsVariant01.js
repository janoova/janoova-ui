"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import StatsCard from "@/components/ui/StatsCard";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__stats__variant01 {
    &__row {
      &--atf {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 1rem;
        @media (min-width: 992px) {
          --bs-gutter-x: 3rem;
          --bs-gutter-y: 0rem;
        }
        @media (min-width: 1200px) {
          --bs-gutter-x: 5rem;
        }
      }
      &--btf {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 2.5rem;
        @media (min-width: 768px) {
          --bs-gutter-x: 3rem;
          --bs-gutter-y: 3rem;
        }
        @media (min-width: 992px) {
          --bs-gutter-x: 3rem;
          --bs-gutter-y: 0rem;
        }
        @media (min-width: 1200px) {
          --bs-gutter-x: 5rem;
        }
      }
    }
  }
`;

const StatsVariant01 = ({ data = {}, index }) => {
  const invertTextColor = data.invert_text_color ? `u__text-inverted` : ``;

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__stats__variant01 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]"
          )}
        />
      )}

      <Wrapper>
        <div className="container relative u__z-index-1">
          <div className={cn(invertTextColor)}>
            <div className="row b__stats__variant01__row b__stats__variant01__row--atf">
              <div className="col-lg-6">
                {data.heading && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0}
                  >
                    <div className="c__heading-wrapper mb-[0rem]">
                      <Heading
                        tag={data.heading_tag || "h2"}
                        className={`u__h1 mb-0`}
                      >
                        {data.heading}
                      </Heading>
                    </div>
                  </ConditionalBlurFade>
                )}
              </div>
              <div className="col-lg-6">
                {data.content && (
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0.1}
                  >
                    <div className="c__description-wrapper">
                      <Description className="u__h5 mb-0">
                        {data.content}
                      </Description>
                    </div>
                  </ConditionalBlurFade>
                )}
              </div>
            </div>
          </div>
        </div>
        {data.repeater && (
          <div className="container mt-[2.5rem] md:mt-[4.5rem] relative u__z-index-1">
            <div className="row b__stats__variant01__row b__stats__variant01__row--btf">
              {data.repeater.map((elem, index) => {
                const { ticker_animation, heading, description } = elem;
                return (
                  <div key={index} className="col-md-6 col-lg-4">
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0.3 + index * 0.1}
                    >
                      <StatsCard
                        tickerAnimation={ticker_animation}
                        heading={heading}
                        description={description}
                        className={cn(invertTextColor)}
                      />
                    </ConditionalBlurFade>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Wrapper>
    </Bounded>
  );
};

export default StatsVariant01;
