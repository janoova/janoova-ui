"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import RichtextField from "@/components/ui/RichtextField";

const Wrapper = styled.div`
  .b__content__variant01 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 1.5rem;
      @media (min-width: 1200px) {
        --bs-gutter-x: 4rem;
      }
      @media (min-width: 1300px) {
        --bs-gutter-x: 5.5rem;
      }
    }
  }
`;

const ContentVariant01 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__content__variant01 overflow-hidden relative"
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
        <div className="container relative">
          <div className="row b__content__variant01__row">
            <div className="col-lg-4">
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__h2`}>
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            </div>
            <div className="col-lg-8">
              {data.content && (
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.1}
                >
                  <RichtextField className="u__h6" content={data.content} />
                </ConditionalBlurFade>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant01;
