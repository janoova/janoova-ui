"use client";
import { useState } from "react";
import Bounded from "@/components/wrappers/Bounded";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getCleanValue } from "@/lib/helpers";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { fallbackImageBlurDataUrl } from "@/lib/constants";

const cardBgMap = {
  white: "bg-[var(--t-cp-base-white)]",
  light: "bg-[var(--t-light-background-color)]",
};

const TestimonialCard = ({ item, enabled: animEnabled, delay, cardBackground }) => {
  const bgClass = cardBgMap[getCleanValue(cardBackground)] ?? "bg-[var(--t-cp-base-white)]";
  return (
    <ConditionalBlurFade enabled={animEnabled} delay={delay} className="h-full">
      <div className={`flex flex-col justify-between h-full ${bgClass} rounded-xl border border-[var(--t-border-color)] p-6`}>
        <div className="mb-6">
          {item.quote && (
            <Description className="u__p mb-0">{item.quote}</Description>
          )}
        </div>
        <div className="flex items-center gap-3">
          {item?.avatar?.asset && (
            <Image
              className="w-11 h-11 min-w-[44px] rounded-full object-cover"
              width={88}
              height={88}
              placeholder="blur"
              blurDataURL={
                item?.avatar?.asset?.metadata?.lqip || fallbackImageBlurDataUrl
              }
              src={urlFor(item.avatar).url()}
              alt={item.avatar.alt ?? item.person_name ?? ""}
            />
          )}
          <div>
            {item.person_name && (
              <Heading tag="span" className="u__small u__f-600 mb-0 d-block">
                {item.person_name}
              </Heading>
            )}
            {item.person_title && (
              <Description className="u__small mb-0 u__muted-color">
                {item.person_title}
              </Description>
            )}
          </div>
        </div>
      </div>
    </ConditionalBlurFade>
  );
};

const TestimonialVariant04 = ({ data = {}, index }) => {
  const testimonials = data.use_global_testimonials
    ? (data.global_testimonials_ref?.testimonials ?? [])
    : (data.testimonials ?? []);
  const initialCount = data.initial_visible_count ?? 6;
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? testimonials
    : testimonials.slice(0, initialCount);
  const hasMore = testimonials.length > initialCount;

  const isCentered = data.heading_alignment === "center";
  const headerAlignClass = isCentered ? "text-center" : "text-start";

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__testimonial__variant04 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? "dots"}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
      )}
      <div className="container relative u__z-index-1">
        {/* Section header */}
        {(data.label || data.heading || data.subheading) && (
          <div className={cn("b__header mb-[2.5rem]", headerAlignClass)}>
            {data.label && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="c__label-wrapper mb-[0.5rem]">
                  <Heading
                    tag={data?.label_heading_tag || "span"}
                    className="u__subtitle u__text-branding-primary u__f-500"
                  >
                    {data.label}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__heading-wrapper mb-[1rem]">
                  <Heading tag={data.heading_tag || "h2"} className="u__h1">
                    {data.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {data.subheading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
                <div className="c__description-wrapper">
                  <Description className="u__h6">{data.subheading}</Description>
                </div>
              </ConditionalBlurFade>
            )}
          </div>
        )}

        {/* Cards grid */}
        {visibleItems.length > 0 && (
          <div className="row" style={{ "--bs-gutter-y": "1.5rem" }}>
            {visibleItems.map((item, i) => (
              <div key={item._key ?? i} className="col-md-6 col-lg-4 d-flex">
                <TestimonialCard
                  item={item}
                  enabled={data.enable_animations}
                  delay={0.1 + (i % 3) * 0.08}
                  cardBackground={data.card_background}
                />
              </div>
            ))}
          </div>
        )}

        {/* Show all / show less toggle or link */}
        {(hasMore || data.show_all_button_destination) && (
          <ConditionalBlurFade enabled={data.enable_animations} delay={0.3}>
            <div className="c__button-wrapper text-center mt-[2.5rem]">
              {data.show_all_button_destination ? (
                <Button
                  destination={data.show_all_button_destination}
                  title={data.show_all_button_title || "See All Customer Stories"}
                  target={data.show_all_button_open_in_new_tab}
                  theme={data.button_theme || "primary"}
                />
              ) : (
                <Button
                  actionable
                  title={
                    showAll
                      ? data.show_less_button_title || "Show Less"
                      : data.show_all_button_title || "See All Customer Stories"
                  }
                  theme={data.button_theme || "primary"}
                  onClick={() => setShowAll((prev) => !prev)}
                />
              )}
            </div>
          </ConditionalBlurFade>
        )}
      </div>
    </Bounded>
  );
};

export default TestimonialVariant04;
