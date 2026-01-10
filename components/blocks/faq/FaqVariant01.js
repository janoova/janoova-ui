"use client";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Accordion from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__faq__variant01 {
    &__list-wrapper {
      max-width: 800px;
    }
  }
`;

const FaqVariant01 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__faq__variant01 overflow-hidden relative"
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
        <div className="container relative u__z-index-1">
          <div className="text-center mx-auto">
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__heading-wrapper mb-[1.5rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}

            {data.description && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
                <div className="c__description-wrapper">
                  <Description className="u__h6">
                    {data.description}
                  </Description>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        </div>
        {data.repeater && (
          <div className="container mt-[3rem] lg:mt-[4rem]">
            <div className="b__faq__variant01__list-wrapper mx-auto">
              {data.repeater.map((elem, index) => {
                return (
                  <ConditionalBlurFade
                    key={index}
                    className={`h-full mb-[1rem]`}
                    enabled={data.enable_animations}
                    delay={0.2 + index * 0.1}
                  >
                    <Accordion
                      index={index}
                      heading={elem.heading}
                      content={elem.content}
                      borderBottom={
                        index === data.repeater.length - 1 ? null : true
                      }
                    />
                  </ConditionalBlurFade>
                );
              })}
            </div>
          </div>
        )}
      </Wrapper>
    </Bounded>
  );
};

export default FaqVariant01;
