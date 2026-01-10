"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import IconCard from "@/components/ui/IconCard";
import urlFor from "@/lib/imageUrlBuilder";
import { getCleanValue } from "@/lib/helpers";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import ResourceCard from "@/components/ui/ResourceCard";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__content__variant08 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 2rem;
    }
  }
`;

const cardColumns = {
  2: "col-lg-6",
  3: "col-lg-4",
  4: "col-lg-3",
};
const ContentVariant08 = ({ data = {}, index }) => {
  const dataCardColumns = getCleanValue(data.card_columns);
  const columnClassName = `col-md-6 ${dataCardColumns ? cardColumns[dataCardColumns] : `col-lg-4`}`;
  return (
    <Bounded
      id={data._key}
      type={data._type}
      index={index}
      scopedCss={data.scoped_css}
      className="b__content__variant08 overflow-hidden relative"
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
          <div className="">
            {data.label && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__label-wrapper mb-[0.5rem]">
                  <Heading
                    tag={data?.label_heading_tag || "span"}
                    className={`u__subtitle u__text-branding-primary u__f-500`}
                  >
                    {data.label}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data?.heading_tag || "h2"} className={`u__d2`}>
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
          <div className="container relative u__z-index-1 mt-[2.5rem]">
            <div
              className={`row b__content__variant08__row justify-${getCleanValue(data.justify_content)}`}
            >
              {data.repeater.map((elem, index) => {
                const {
                  image,
                  heading,
                  description,
                  button_title,
                  button_destination,
                  button_open_in_new_tab,
                } = elem;

                const imageObj = image
                  ? {
                      src: urlFor(image)?.url(),
                      alt: image.alt || null,
                      blurDataURL: image ? image.asset?.metadata?.lqip : null,
                    }
                  : null;
                return (
                  <div key={index} className={columnClassName}>
                    <ConditionalBlurFade
                      enabled={data.enable_animations}
                      delay={0.3 + index * 0.1}
                    >
                      <ResourceCard
                        image={imageObj}
                        heading={heading}
                        description={description}
                        cardTag="div"
                        headingTag={data.card_heading_tag}
                        buttonTitle={button_title}
                        buttonDestination={button_destination}
                        buttonTarget={button_open_in_new_tab}
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

export default ContentVariant08;
