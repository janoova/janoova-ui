import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import Pill from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { FaLinkedin } from "react-icons/fa";
import { getCleanValue, parseArrayString } from "@/lib/helpers";
import Button from "@/components/ui/Button";
import TestimonialVariant03Modal from "./TestimonialVariant03Modal";
import RichtextField from "@/components/ui/RichtextField";
import BorderBeamClient from "@/components/ui/BorderBeamClient";
import { fallbackImageBlurDataUrl } from "@/lib/constants";

const Wrapper = styled.div`
  .b__testimonial__variant03 {
    &__grid-row {
      --bs-gutter-y: 3rem;
      @media (min-width: 768px) {
        --bs-gutter-x: 2.5rem;
        --bs-gutter-y: 0;
      }
      @media (min-width: 992px) {
        --bs-gutter-x: 4rem;
      }
    }
    &__logo {
      width: 100%;
      max-width: 140px;
      object-fit: contain;
    }
    &__avatar {
      border-radius: var(--t-global-image-border-radius);
      object-fit: cover;
      width: 100%;
      height: 100%;
      &-wrapper {
        height: 350px;
        position: relative;
        @media (min-width: 768px) {
          height: 275px;
        }
        @media (min-width: 992px) {
          width: 100%;
          height: 100%;
          min-height: 385px;
        }
      }
    }
    &__content-wrapper {
      border-radius: 32px;
      background-color: var(--t-light-background-color);
      box-shadow: var(--t-box-shadow-md);
      border: 1px solid var(--t-border-color);
      padding: 1.5rem;
      @media (min-width: 576px) {
        padding: 2.5rem;
      }
    }
    &__linkedin-link {
      display: inline-flex;
      align-items: center;
      color: #0077b5;
      text-decoration: none;
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 0.8;
      }
      &:focus-visible {
        outline: 2px solid #0077b5;
        outline-offset: 2px;
        border-radius: 4px;
      }
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
    person_linkedin_url: item.person_linkedin_url,
    logo: item.logo,
  };
};

const TestimonialVariant03 = ({ data = {}, index }) => {
  const d = resolveGlobalItem(data);
  // Generate a unique modal ID based on the component's _key
  const modalId = data._key ? `testimonial-modal-${data._key}` : null;
  const shouldShowModal = data.enable_modal && modalId;
  const beamColorList = (() => {
    const parsedArray = parseArrayString(
      getCleanValue(data?.card_beam_color_list)
    );
    return parsedArray && parsedArray.length > 0
      ? parsedArray
      : ["via-orange-500", "via-teal-500"];
  })();
  const borderBeamDelay = [0, 3];

  const buttonComponent = data.button_title && (
    <ConditionalBlurFade enabled={data?.enable_animations} delay={0.35}>
      <div className="c__button-wrapper mt-[2rem]">
        <Button
          destination={
            shouldShowModal
              ? `#trigger-modal:${modalId}`
              : data.button_destination
          }
          title={data.button_title}
          target={data.button_open_in_new_tab}
          theme={data.button_theme}
          renderArrow
        />
      </div>
    </ConditionalBlurFade>
  );

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__testimonial__variant03 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? `dots`}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          <ConditionalBlurFade enabled={data.enable_animations}>
            <div className="b__testimonial__variant03__content-wrapper relative">
              {data.enable_card_border_beam && (
                <>
                  <BorderBeamClient
                    duration={6}
                    size={350}
                    delay={borderBeamDelay[0]}
                    className={`from-transparent ${beamColorList[0]} to-transparent`}
                  />
                  <BorderBeamClient
                    duration={6}
                    delay={borderBeamDelay[1]}
                    size={350}
                    className={`from-transparent ${beamColorList[1]} to-transparent`}
                  />
                </>
              )}
              <div className="row b__testimonial__variant03__grid-row">
                <div className="col-md-8 order-md-2">
                  <blockquote>
                    {data.label && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.1}
                      >
                        <div className="mb-[1.5rem] md:mb-[1rem] xl:mb-[1.5rem]">
                          <Pill title={data.label} />
                        </div>
                      </ConditionalBlurFade>
                    )}

                    {/* {data?.logo?.asset && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.15}
                      >
                        <div className="b__testimonial__variant03__logo-wrapper mt-[1.75rem] mb-[1.25rem]">
                          <Image
                            className="b__testimonial__variant03__logo"
                            sizes="100vw"
                            width={500}
                            height={500}
                            src={urlFor(data.logo).url()}
                            alt={data.logo.alt ?? ""}
                          />
                        </div>
                      </ConditionalBlurFade>
                    )} */}

                    {d.heading && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.2}
                      >
                        <div className="c__heading-wrapper">
                          <Heading
                            tag={data?.heading_tag || "span"}
                            className={`u__h3 mb-0`}
                          >
                            {d.heading}
                          </Heading>
                        </div>
                      </ConditionalBlurFade>
                    )}

                    {d?.logo?.asset && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.25}
                      >
                        <div className="b__testimonial__variant03__logo-wrapper mt-[1.5rem]">
                          <Image
                            className="b__testimonial__variant03__logo"
                            sizes="100vw"
                            width={500}
                            height={500}
                            src={urlFor(d.logo).url()}
                            alt={d.logo.alt ?? ""}
                          />
                        </div>
                      </ConditionalBlurFade>
                    )}

                    {buttonComponent}
                  </blockquote>
                </div>
                <div className="col-md-4 order-md-1">
                  <div>
                    {d?.avatar?.asset && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.2}
                      >
                        <div className="b__testimonial__variant03__avatar-wrapper mb-[1rem]">
                          <Image
                            className="b__testimonial__variant03__avatar"
                            fill={true}
                            placeholder="blur"
                            blurDataURL={
                              d?.avatar?.asset?.metadata?.lqip ||
                              fallbackImageBlurDataUrl
                            }
                            src={urlFor(d.avatar).url()}
                            alt={d.avatar.alt ?? ""}
                            sizes="100%"
                          />
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {d.person_name && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.3}
                      >
                        <div className="c__heading-wrapper mb-[0.1rem]">
                          <Heading tag={`span`} className={`u__h6 mb-0`}>
                            {d.person_name}
                          </Heading>
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {d.person_title && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.35}
                      >
                        <div className="c__heading-wrapper mb-[0]">
                          <Heading
                            tag={`span`}
                            className={`u__small mb-0 u__f-400`}
                          >
                            {d.person_title}
                          </Heading>
                        </div>
                      </ConditionalBlurFade>
                    )}
                    {getCleanValue(d.person_linkedin_url) && (
                      <ConditionalBlurFade
                        enabled={data.enable_animations}
                        delay={0.4}
                      >
                        <a
                          href={getCleanValue(d.person_linkedin_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="b__testimonial__variant03__linkedin-link mt-[0.5rem]"
                          style={{
                            transform: "translateZ(0)",
                            WebkitTransform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                          aria-label={`View ${getCleanValue(d.person_name) || "person"}'s LinkedIn profile`}
                        >
                          <FaLinkedin size={24} color="#0470ae" />
                        </a>
                      </ConditionalBlurFade>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ConditionalBlurFade>
        </div>
      </Wrapper>

      {/* Modal */}
      {shouldShowModal && (
        <TestimonialVariant03Modal modalId={modalId}>
          <div className="space-y-6 pt-[1rem]">
            {/* Person Info */}
            <div className="flex items-start gap-5 pb-[1.85rem] border-b">
              {d?.avatar?.asset && (
                <Image
                  className="flex-shrink-0 rounded-[100%] object-cover w-[100px] h-[100px]"
                  width={200}
                  height={200}
                  src={urlFor(d.avatar).url()}
                  alt={d.avatar.alt ?? ""}
                />
              )}
              <div className="flex-1 min-w-0">
                {d.person_name && (
                  <Heading tag="span" className="u__h6 !mb-[0.25rem]">
                    {d.person_name}
                  </Heading>
                )}
                {d.person_title && (
                  <p className="text-sm text-gray-600 !mb-[0.75rem]">
                    {d.person_title}
                  </p>
                )}
                {getCleanValue(d.person_linkedin_url) && (
                  <a
                    href={getCleanValue(d.person_linkedin_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="b__testimonial__variant03__linkedin-link inline-block"
                    aria-label={`View ${getCleanValue(d.person_name) || "person"}'s LinkedIn profile`}
                  >
                    <FaLinkedin size={20} color="#0470ae" />
                  </a>
                )}
              </div>
            </div>

            {/* Rich Text Content */}
            {data.testimonial_content && (
              <div className="pt-[0.5rem]">
                <RichtextField content={data.testimonial_content} />
              </div>
            )}
          </div>
        </TestimonialVariant03Modal>
      )}
    </Bounded>
  );
};

export default TestimonialVariant03;
