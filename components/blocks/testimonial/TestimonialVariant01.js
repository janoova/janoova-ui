import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";

const Wrapper = styled.div`
  .b__testimonial__variant01 {
    &__logo {
      width: 100%;
      max-width: 230px;
      object-fit: contain;
    }
    &__avatar {
      width: 90px;
      height: 90px;
      border-radius: 100%;
    }
  }
`;

const resolveGlobalItem = (data) => {
  if (!data.use_global_testimonials) return data;
  const items = data.global_testimonials_ref?.testimonials ?? [];
  const idx = Math.max(0, (data.global_testimonial_index || 1) - 1);
  const item = items[idx];
  if (!item) return data;
  return {
    ...data,
    heading: item.quote,
    avatar: item.avatar,
    person_name: item.person_name,
    person_title: item.person_title,
    logo: item.logo,
  };
};

const TestimonialVariant01 = ({ data = {}, index }) => {
  const d = resolveGlobalItem(data);
  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__testimonial__variant01 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          <blockquote className="text-center">
            {d?.logo?.asset && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0}>
                <div className="b__testimonial__variant01__logo-wrapper mb-[2rem]">
                  <Image
                    className="b__testimonial__variant01__logo mx-auto w-auto h-auto"
                    sizes="100vw"
                    width={500}
                    height={500}
                    src={urlFor(d.logo).url()}
                    alt={d.logo.alt ?? ""}
                  />
                </div>
              </ConditionalBlurFade>
            )}
            {d.heading && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.1}>
                <div className="c__heading-wrapper mb-[3rem] max-w-[1000px] mx-auto">
                  <Heading
                    tag={data?.heading_tag || "span"}
                    className={`u__h3 mb-0 u__heading-color`}
                  >
                    {d.heading}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {d?.avatar?.asset && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.2}>
                <div className="b__testimonial__variant01__avatar-wrapper mb-[1rem]">
                  <Image
                    className="b__testimonial__variant01__avatar mx-auto w-auto h-auto u__object-fit-cover"
                    sizes="100vw"
                    width={500}
                    height={500}
                    src={urlFor(d.avatar).url()}
                    alt={d.avatar.alt ?? ""}
                  />
                </div>
              </ConditionalBlurFade>
            )}
            {d.person_name && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.3}>
                <div className="c__heading-wrapper mb-[0.1rem]">
                  <Heading
                    tag={`span`}
                    className={`u__h6 mb-0 u__heading-color`}
                  >
                    {d.person_name}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
            {d.person_title && (
              <ConditionalBlurFade enabled={data.enable_animations} delay={0.4}>
                <div className="c__heading-wrapper mb-[0]">
                  <Heading tag={`span`} className={`u__small mb-0 u__f-400`}>
                    {d.person_title}
                  </Heading>
                </div>
              </ConditionalBlurFade>
            )}
          </blockquote>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default TestimonialVariant01;
