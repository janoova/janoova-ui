"use client";
import { organization } from "@/lib/constants";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import styled from "styled-components";
import Description from "@/components/ui/Description";
import Link from "next/link";
import RichtextField from "@/components/ui/RichtextField";

const Wrapper = styled.div`
  .b__footer__variant02 {
    &__row {
      --bs-gutter-x: 2rem;
      --bs-gutter-y: 3rem;
      @media (min-width: 768px) {
        --bs-gutter-y: 2rem;
      }
    }
  }
`;

const FooterVariant02 = ({
  siteSettings,
  navigationSchema,
  copyright = `© ${new Date().getFullYear()} ${organization}. All rights reserved.`,
}) => {
  const socialLinks = [
    {
      icon: <FaInstagram className="size-5" />,
      href: siteSettings?.instagram_url,
      label: "Instagram",
    },
    {
      icon: <FaFacebook className="size-5" />,
      href: siteSettings?.facebook_url,
      label: "Facebook",
    },
    {
      icon: <FaXTwitter className="size-5" />,
      href: siteSettings?.x_url,
      label: "X",
    },
    {
      icon: <FaLinkedin className="size-5" />,
      href: siteSettings?.linkedin_url,
      label: "LinkedIn",
    },
    {
      icon: <FaYoutubeSquare className="size-5" />,
      href: siteSettings?.youtube_url,
      label: "Youtube",
    },
  ];

  const legalLinks = [
    { name: "Terms and Conditions", href: siteSettings?.terms_url },
    { name: "Privacy Policy", href: siteSettings?.privacy_policy_url },
  ];

  return (
    <footer className="pt-[4rem] pb-[1rem] border-t b__footer__variant02 overflow-hidden">
      <Wrapper className="container">
        <div className="row b__footer__variant02__row">
          <div className="col-md-4 col-lg-6">
            {siteSettings?.logo?.asset && (
              <div className="">
                <div className="mb-[1.25rem]">
                  <a href={`/`}>
                    <Image
                      className="b__header__variant01__logo w-[auto] mw-w-[200px] h-[50px] u__object-fit-contain"
                      width={500}
                      height={500}
                      src={urlFor(siteSettings.logo).url()}
                      alt={siteSettings.logo.alt ?? ""}
                      sizes="100%"
                    />
                  </a>
                </div>

                {siteSettings?.footer_description && (
                  <div className="mb-0">
                    <Description className="text-muted-foreground max-w-[70%] text-sm mb-0">
                      {siteSettings?.footer_description}
                    </Description>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-md-4 col-lg-3">
            <div>
              <span className="u__h6 u__f-700 d-block mb-[1rem]">
                {siteSettings?.footer_quick_menu_title}
              </span>
              <ul className="text-muted-foreground space-y-3 text-sm">
                {navigationSchema?.items.map((elem, idx) => (
                  <li key={idx} className="hover:text-primary font-medium">
                    <Link
                      className="!no-underline hover:!underline"
                      href={elem.destination}
                    >
                      {elem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <span className="u__h6 u__f-700 d-block mb-[1rem]">
              {siteSettings?.footer_contact_title}
            </span>
            {siteSettings?.footer_contact_richtext && (
              <div className="text-muted-foreground  text-sm">
                <RichtextField
                  content={siteSettings?.footer_contact_richtext}
                />
              </div>
            )}
            <div className="mt-[1.5rem]">
              <ul className="text-muted-foreground flex items-center space-x-6">
                {socialLinks.map((elem, idx) => {
                  if (elem?.href) {
                    return (
                      <li key={idx} className="hover:text-primary font-medium">
                        <a
                          target="_blank"
                          href={elem.href}
                          aria-label={elem.label}
                        >
                          {elem.icon}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-[3rem] pt-[1rem] md:pt-[2rem] flex flex-col justify-between gap-4 border-t text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((elem, idx) => {
              if (elem?.href) {
                return (
                  <li key={idx} className="hover:text-primary">
                    <a
                      className="!no-underline hover:!underline"
                      href={elem.href}
                    >
                      {elem.name}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </Wrapper>
    </footer>
  );
};

export default FooterVariant02;
