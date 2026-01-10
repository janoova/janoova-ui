"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { getCleanValue } from "@/lib/helpers";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";

const Wrapper = styled.div`
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const PartnerVariant02 = ({ data = {}, index }) => {
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__partner__variant02 overflow-hidden relative"
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

        <div className="relative u__z-index-1 mt-[1.25rem]">
          <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
            <div className="w-full h-[700px] max-w-[1200px] mx-auto relative flex size-full items-center justify-center overflow-hidden">
              {data?.repeater_outer && data?.repeater_outer?.length > 0 && (
                <OrbitingCircles iconSize={190} radius={300} speed={0.7}>
                  {data.repeater_outer?.map((elem, index) => {
                    if (!elem) return null;
                    const image = elem?.image;
                    const imageObj = image
                      ? { src: urlFor(image).url(), alt: image.alt || `` }
                      : null;
                    return (
                      <img
                        key={index}
                        src={imageObj?.src}
                        alt={imageObj?.alt}
                        loading="lazy"
                      />
                    );
                  })}
                </OrbitingCircles>
              )}
              {data.repeater_inner && data.repeater_inner?.length && (
                <OrbitingCircles iconSize={90} radius={150} reverse speed={0.7}>
                  {data.repeater_inner.map((elem, index) => {
                    if (!elem) return null;
                    const image = elem?.image;
                    const imageObj = image
                      ? { src: urlFor(image).url(), alt: image.alt || `` }
                      : null;
                    return (
                      <img
                        key={index}
                        src={imageObj?.src}
                        alt={imageObj?.alt}
                        loading="lazy"
                      />
                    );
                  })}
                </OrbitingCircles>
              )}
            </div>
          </ConditionalBlurFade>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default PartnerVariant02;
