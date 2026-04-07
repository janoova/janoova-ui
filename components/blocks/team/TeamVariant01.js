"use client";
import { useState } from "react";
import Bounded from "@/components/wrappers/Bounded";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import RichtextField from "@/components/ui/RichtextField";
import styled from "styled-components";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import { cn } from "@/lib/utils";
import { getCleanValue } from "@/lib/helpers";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { ConditionalBlurFade } from "@/components/ui/RevealAnimations";
import { Dialog as RadixDialog } from "radix-ui";
import { XIcon } from "lucide-react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PRIMARY_COLOR = "var(--t-primary-branding-color)";

const Wrapper = styled.div`
  .b__team__variant01 {
    &__card {
      cursor: pointer;
      transition: transform 0.2s ease;
      &:hover {
        transform: translateY(-4px);
      }
    }
    &__card-image-wrap {
      width: 100%;
      overflow: hidden;
      border-radius: 12px;
      position: relative;
      margin-bottom: 1rem;
    }
    &__social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--t-light-background-color, #f5f5f5);
      color: var(--t-primary-branding-color);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
      &:hover {
        background-color: var(--t-primary-branding-color);
        color: #fff;
      }
    }
  }
`;

const SOCIAL_ICONS = {
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  website: FaGlobe,
  email: FaEnvelope,
};

const resolveMembers = (data) => {
  if (data.use_global_team) return data.global_team_ref?.members ?? [];
  return data.repeater ?? [];
};

const SocialLinks = ({ links }) => {
  if (!links?.length) return null;
  return (
    <div className="flex gap-[0.75rem] flex-wrap">
      {links.map((link, i) => {
        const platform = getCleanValue(link.platform);
        const Icon = SOCIAL_ICONS[platform] ?? FaGlobe;
        const url = getCleanValue(link.url) ?? "";
        const href = platform === "email" ? `mailto:${url}` : url;
        return (
          <a
            key={i}
            href={href}
            target={platform !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="b__team__variant01__social-link"
            aria-label={platform}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
};

const TeamMemberModal = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onClose}>
      <RadixDialog.Portal>
        {/* Glass blur overlay */}
        <RadixDialog.Overlay className="fixed inset-0 z-[99999998] backdrop-blur-sm bg-black/40 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />

        {/* Content — no border, overflow-hidden on outer clips rounded corners on scroll */}
        <RadixDialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 z-[99999999] -translate-x-1/2 -translate-y-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-[90vw] lg:max-w-[960px] xl:max-w-[1100px] bg-background rounded-xl shadow-xl outline-none overflow-hidden duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <RadixDialog.Title className="sr-only">
            {member.name}
          </RadixDialog.Title>
          <RadixDialog.Description className="sr-only">
            {member.title}
          </RadixDialog.Description>

          {/* Inner scrollable */}
          <div className="max-h-[90vh] overflow-y-auto">
            {/* Close button — extra bottom margin on mobile (item 7) */}
            <div className="flex items-center justify-end px-[1rem] pt-[0.75rem] pb-[1rem] md:pb-[0.25rem]">
              <button
                onClick={onClose}
                aria-label="Close"
                className="inline-flex items-center justify-center w-[2rem] h-[2rem] rounded-md bg-transparent border-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Body — image + social left, name/title/bio right */}
            <div className="flex flex-col md:flex-row pb-[1.5rem]">
              {/* Left: image only */}
              {member.image?.asset && (
                <div className="md:w-[30%] md:max-w-[260px] shrink-0 px-[1.5rem] pb-[1rem] md:pb-[0]">
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={urlFor(member.image).url()}
                      alt={member.image.alt ?? getCleanValue(member.name) ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}

              {/* Right: name, title, social icons, bio */}
              <div className="flex-1 px-[1.5rem] flex flex-col min-w-0">
                {member.name && (
                  <div className="mb-[0.5rem]">
                    <Heading tag="h3" className="u__h4 mb-0">
                      {member.name}
                    </Heading>
                  </div>
                )}
                {member.title && (
                  <div className="mb-[1rem]">
                    <p
                      className="u__small u__f-600 mb-0"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {member.title}
                    </p>
                  </div>
                )}
                <SocialLinks links={member.social_links} />
                {member.bio?.length > 0 && (
                  <div className="mt-[1.5rem]">
                    <RichtextField content={member.bio} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

const TeamVariant01 = ({ data = {}, index }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const members = resolveMembers(data);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear member after exit animation (duration-200 + small buffer)
    setTimeout(() => setSelectedMember(null), 300);
  };

  // Grid columns + matching image aspect ratio + container constraint
  const cols = getCleanValue(data.grid_columns);
  const colsNum = cols === "2" ? "2" : cols === "3" ? "3" : "4";
  const gridClass =
    colsNum === "2"
      ? "grid-cols-1 sm:grid-cols-2"
      : colsNum === "3"
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  // All column counts use square card images
  const imageAspect = "aspect-square";
  // Constrain container so 2-col/3-col images aren't oversized
  const gridContainerClass =
    colsNum === "2"
      ? "max-w-[600px] mx-auto"
      : colsNum === "3"
        ? "max-w-[900px] mx-auto"
        : "";

  // Item 4: show short description toggle
  const showDesc = data.show_short_description !== false;

  return (
    <Bounded
      id={data._key}
      type={data._type}
      scopedCss={data.scoped_css}
      index={index}
      className="b__team__variant01 overflow-hidden relative"
    >
      {data.enable_background_pattern && (
        <BackgroundPattern
          patternType={data.background_pattern_type ?? "dots"}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]",
          )}
        />
      )}
      <Wrapper>
        <div className="container relative u__z-index-1">
          {(data.label || data.heading || data.description) && (
            <div className="text-center mx-auto mb-[3rem]">
              {/* Item 6: label as styled heading text, not Pill */}
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
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.1}
                >
                  <div className="c__heading-wrapper mb-[1rem]">
                    <Heading tag={data.heading_tag || "h2"} className="u__h1">
                      {data.heading}
                    </Heading>
                  </div>
                </ConditionalBlurFade>
              )}

              {data.description && (
                <ConditionalBlurFade
                  enabled={data.enable_animations}
                  delay={0.2}
                >
                  <div className="c__description-wrapper">
                    <Description className="u__h6">
                      {data.description}
                    </Description>
                  </div>
                </ConditionalBlurFade>
              )}
            </div>
          )}

          {members.length > 0 && (
            <div
              className={cn(
                "grid gap-[1.5rem] lg:gap-[2rem]",
                gridClass,
                gridContainerClass,
              )}
            >
              {members.map((member, i) => (
                <ConditionalBlurFade
                  key={i}
                  enabled={data.enable_animations}
                  delay={0.1 + i * 0.05}
                >
                  <div
                    className="b__team__variant01__card"
                    onClick={() => openModal(member)}
                  >
                    {member.image?.asset && (
                      <div
                        className={cn(
                          "b__team__variant01__card-image-wrap",
                          imageAspect,
                        )}
                      >
                        <Image
                          src={urlFor(member.image).url()}
                          alt={
                            member.image.alt ?? getCleanValue(member.name) ?? ""
                          }
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}

                    {member.name && (
                      <Heading tag="h4" className="u__h5 u__f-700 mb-[0.25rem]">
                        {member.name}
                      </Heading>
                    )}

                    {/* Item 3: add bottom margin on title when short description is visible */}
                    {member.title && (
                      <p
                        className={cn(
                          "u__small u__f-600",
                          showDesc && member.short_description
                            ? "mb-[0.4rem]"
                            : "mb-0",
                        )}
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {member.title}
                      </p>
                    )}

                    {/* Item 4: conditionally show short description */}
                    {showDesc && member.short_description && (
                      <p className="u__small u__body-color mb-0">
                        {member.short_description}
                      </p>
                    )}
                  </div>
                </ConditionalBlurFade>
              ))}
            </div>
          )}
        </div>
      </Wrapper>

      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Bounded>
  );
};

export default TeamVariant01;
