"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import ArticleContent from "@/components/ui/ArticleContent";
import RichtextField from "@/components/ui/RichtextField";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__content__variant04 {
    &__content-wrapper {
      max-width: var(--content-max-width, 900px);
    }
  }
`;

const ContentVariant04 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__content__variant04 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper
        style={{
          "--content-max-width": `${data.content_max_width || 900}px`,
        }}
      >
        <div className="container">
          <div className="b__content__variant04__content-wrapper mx-auto">
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__h1`}>
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}

            {data.content && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div
                  className={
                    data.content_type === `article`
                      ? `mt-[2.5rem]`
                      : `mt-[1rem]`
                  }
                >
                  {data.content_type == "article" && (
                    <ArticleContent content={data.content} />
                  )}
                  {data.content_type == "richtext" && (
                    <RichtextField content={data.content} />
                  )}
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant04;
