"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import IconCard from "@/components/ui/IconCard";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue, parseArrayString } from "@/lib/helpers";
import { RetroGrid } from "@/components/magicui/retro-grid";

const Wrapper = styled.div`
  .b__feature__variant02 {
    &__row {
      --bs-gutter-y: 1.5rem;
    }
  }
`;

const cardColumns = {
  2: "col-lg-6",
  3: "col-lg-4",
  4: "col-lg-3",
};

const FeatureVariant02 = ({ data = {}, index }) => {
  const dataCardColumns = getCleanValue(data.card_columns);
  const columnClassName = `col-md-6 ${dataCardColumns ? cardColumns[dataCardColumns] : `col-lg-4`}`;
  const rowAlignment = `justify-${getCleanValue(data.justify_content) || `start`}`;

  const beamColorList = (() => {
    const parsedArray = parseArrayString(
      getCleanValue(data?.card_beam_color_list)
    );
    return parsedArray && parsedArray.length > 0
      ? parsedArray
      : ["via-orange-500", "via-teal-500"];
  })();

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__feature__variant02 overflow-hidden relative"
    >
      {data?.enable_background_matrix && (
        <div className="u__show-after-992">
          <RetroGrid
            opacity={0.3}
            cellSize={20}
            lightLineColor={`#d17034`}
            angle={65}
          />
        </div>
      )}

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
            {data.label && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__label-wrapper mb-[0.5rem]">
                  <Heading
                    tag={data.label_heading_tag || "span"}
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
          <div className="container relative u__z-index-1 mt-[2.5rem]">
            <div className={`row b__feature__variant02__row ${rowAlignment}`}>
              {data.repeater.map((elem, index) => {
                const {
                  icon_svg,
                  icon_type,
                  icon_color,
                  image,
                  heading,
                  description,
                  button_title,
                  button_destination,
                  button_open_in_new_tab,
                } = elem;

                const imageObj = image
                  ? {
                      src: urlFor(image).url(),
                      alt: image.alt || null,
                    }
                  : null;
                return (
                  <div key={index} className={columnClassName}>
                    <ConditionalBlurFade
                      className={`h-full`}
                      enabled={data.enable_animations}
                      delay={0.3 + index * 0.1}
                    >
                      <IconCard
                        style={getCleanValue(data.card_style)}
                        headingTag={getCleanValue(data.card_heading_tag)}
                        icon={imageObj}
                        iconSvg={icon_svg}
                        iconType={icon_type}
                        iconColor={icon_color}
                        heading={heading}
                        description={description}
                        buttonTitle={button_title}
                        buttonDestination={button_destination}
                        buttonTarget={button_open_in_new_tab}
                        enableBorderBeam={data?.enable_card_border_beam}
                        beamColorList={beamColorList}
                        borderBeamDelay={[0, 1.5 * (index + 1)]}
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

export default FeatureVariant02;
