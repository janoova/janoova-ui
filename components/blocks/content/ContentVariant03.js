"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import TextCardWithBar from "@/components/ui/TextCardWithBar";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";

const Wrapper = styled.div`
  .b__content__variant03 {
    &__grid-row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 3rem;
      @media (min-width: 1200px) {
        --bs-gutter-x: 8rem;
      }
    }
  }
`;

const cardColumns = {
  2: "col-lg-6",
  3: "col-lg-4",
  4: "col-lg-3",
};

const ContentVariant03 = ({ data = {}, index }) => {
  const dataCardColumns = getCleanValue(data.card_columns);
  const columnClassName = `col-md-6 ${dataCardColumns ? cardColumns[dataCardColumns] : `col-lg-4`}`;
  const rowAlignment = `justify-${getCleanValue(data.justify_content) || `start`}`;

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__content__variant03 overflow-hidden relative"
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
        <div className="container relative u__z-index-1 c__entry-title">
          <div className="text-center mx-auto">
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
                  <Description className="u__h6">
                    {data.description}
                  </Description>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        </div>

        {data?.repeater && (
          <div className="container mt-[3rem] lg:mt-[4.5rem]">
            <div
              className={`row b__content__variant03__grid-row ${rowAlignment}`}
            >
              {data.repeater.map((elem, index) => {
                const { heading, description } = elem;
                return (
                  <div key={index} className={columnClassName}>
                    <ConditionalBlurFade
                      className={`h-full`}
                      enabled={data.enable_animations}
                      delay={0.3 + index * 0.1}
                    >
                      <TextCardWithBar
                        heading={heading}
                        headingTag={getCleanValue(data.card_heading_tag)}
                        description={description}
                        theme={getCleanValue(data.card_theme)}
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

export default ContentVariant03;
