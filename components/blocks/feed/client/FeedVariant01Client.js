"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import ResourceCard from "@/components/ui/ResourceCard";
import { baseUrl } from "@/lib/constants";
import { getCleanValue } from "@/lib/helpers";
import urlFor from "@/lib/imageUrlBuilder";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { cn } from "@/lib/utils";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";

const Wrapper = styled.div`
  .b__feed__variant01 {
    &__row {
      --bs-gutter-x: 1.5rem;
      --bs-gutter-y: 2rem;
    }
  }
`;

const FeedVariant01Client = ({ data = {}, feedData = {}, index }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__feed__variant01 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          <div className="text-center">
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading
                    tag={data?.heading_tag || "h2"}
                    className={`u__h1 mb-0`}
                  >
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {getCleanValue(data.description) && (
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

        <div className="container mt-[3rem]">
          <div className="row b__feed__variant01__row">
            {feedData.map((elem, index) => {
              const {
                featured_image,
                slug,
                title,
                heading,
                excerpt,
                publish_date,
                _id,
              } = elem;

              const destination = `${baseUrl}/blog/${slug.current}`;

              const imageObj = featured_image
                ? {
                    src: urlFor(featured_image).url(),
                    alt: featured_image.alt || null,
                    blurDataURL: featured_image
                      ? featured_image.asset?.metadata?.lqip
                      : null,
                  }
                : null;

              return (
                <div key={_id} className="col-md-6 col-lg-4">
                  <ConditionalBlurFade
                    enabled={data.enable_animations}
                    delay={0.2 + index * 0.1}
                  >
                    <ResourceCard
                      image={imageObj}
                      description={excerpt}
                      heading={getCleanValue(heading) ? heading : title}
                      publishDate={publish_date}
                      buttonTitle={`Read more`}
                      buttonDestination={destination}
                    />
                  </ConditionalBlurFade>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default FeedVariant01Client;
