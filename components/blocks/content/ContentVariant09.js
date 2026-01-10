"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import RichtextField from "@/components/ui/RichtextField";
import Description from "@/components/ui/Description";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { getCleanValue } from "@/lib/helpers";
import { AuroraText } from "@/components/magicui/aurora-text";
import React from "react";

const Wrapper = styled.div``;

// Helper function to parse text and render with AuroraText
const parseTextWithAurora = (text, auroraColors) => {
  if (!text) {
    return text;
  }

  text = getCleanValue(text);
  auroraColors = getCleanValue(auroraColors);

  // Split text by the aurora text markers (e.g., [[Chicago]])
  const parts = text.split(/(\[\[.*?\]\])/);

  return parts.map((part, index) => {
    // Check if this part is wrapped in [[ ]]
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const auroraText = part.slice(2, -2); // Remove [[ ]]
      return (
        <AuroraText
          key={index}
          colors={
            auroraColors && auroraColors.length > 0
              ? auroraColors
              : ["#ffbe4eff", "#ffaa00ff", "#ff914e", "#ffd04eff"]
          }
        >
          {auroraText}
        </AuroraText>
      );
    }

    // Handle HTML content in non-aurora parts
    if (part.includes("<") && part.includes(">")) {
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    }

    return part;
  });
};

const ContentVariant09 = ({ data = {}, index }) => {
  // Parse heading with AuroraText if configured
  const parsedHeading = React.useMemo(() => {
    if (data.heading) {
      return parseTextWithAurora(data.heading, data.aurora_colors);
    }
    return null;
  }, [data.heading, data.aurora_colors]);

  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      index={index}
      className="b__content__variant09 overflow-hidden relative"
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
          <div className={`text-center`}>
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className={`u__d2`}>
                    {parsedHeading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.description && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__description-wrapper">
                  <Description className="u__h5">
                    {data.description}
                  </Description>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        </div>
        {data?.map_iframe_source && (
          <div className="container mt-[3rem]">
            <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
              <div className={`w-full`}>
                <iframe
                  className="rounded-[1rem] shadow-lg h-[300px] md:h-[500px]"
                  src={data.map_iframe_source}
                  width={`100%`}
                  height={`500px`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ConditionalBlurFade>
          </div>
        )}
      </Wrapper>
    </Bounded>
  );
};

export default ContentVariant09;
