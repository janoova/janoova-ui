"use client";
import styled from "styled-components";
import Image from "next/image";
import Heading from "./Heading";
import Button from "./Button";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import Description from "./Description";
import { stegaClean } from "@sanity/client/stega";

const Component = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  .c__resource-card {
    &__image {
      width: 100%;
      object-fit: cover;
      border-radius: var(--t-global-image-border-radius);
      height: auto;
      max-height: 350px;
      @media (min-width: 992px) {
        height: 200px;
      }
      @media (min-width: 1200px) {
        height: 250px;
      }
    }
  }
  &.c__resource-card {
    &--bordered {
      border: 2px solid var(--t-border-color);
      border-radius: var(--t-global-card-border-radius);
      overflow: hidden;
      .c__resource-card {
        &__image-wrapper {
          img {
            border-radius: 0;
          }
        }
        &__bottom,
        &__button-wrapper {
          padding: 0 1.5rem;
        }
        &__bottom {
          padding-top: 0.5rem;
        }
        &__button-wrapper {
          padding-bottom: 1.5rem;
        }
      }
    }
  }
  .col-lg-6 & .c__resource-card__image {
    @media (min-width: 992px) {
      height: 320px;
    }
    @media (min-width: 1200px) {
      height: 400px;
    }
  }
`;

const ResourceCard = ({
  image = {
    src: `https://cdn.sanity.io/images/nqj5p7gd/production/1f41c4bad180126545d88582d90cd3b3f1cc43ed-605x451.jpg`,
    alt: `Placeholder grayscale mountains`,
    blurDataURL: `https://cdn.sanity.io/images/nqj5p7gd/production/1f41c4bad180126545d88582d90cd3b3f1cc43ed-605x451.jpg`,
  },
  defaultProps,
  heading = defaultProps && `Powerful Card Heading`,
  headingTag = "h3",
  headingSize = "h5",
  description = defaultProps &&
    `Massa nec scelerisque lacus dis vitae aenean montes platea ullamcorper condimentum quis magna purus tortor class a conubia dui nascetur id.`,
  descriptionSize = "small",
  publishDate,
  cardTag = "article",
  style = "default",
  buttonTitle = defaultProps && "Learn More",
  buttonTarget,
  buttonDestination,
  buttonTheme = "link",
}) => {
  return (
    <Component
      as={cardTag}
      className={`c__resource-card c__resource-card--${style} relative`}
    >
      <div className="c__resource-card__top mb-[1rem]">
        {image && (
          <div className="c__resource-card__image-wrapper">
            <Image
              className="c__resource-card__image"
              sizes="100vw"
              width={800}
              height={800}
              placeholder={`blur`}
              blurDataURL={image.blurDataURL}
              src={image.src}
              alt={image.alt ?? ""}
            />
          </div>
        )}
      </div>
      <div className="c__resource-card__bottom">
        {publishDate && (
          <div className="c__resource-card__date-wrapper mb-[0.5rem]">
            <span className="u__small u__text-light">
              <time dateTime={`${publishDate}T00:00:00Z`}>
                {formatDate(publishDate)}
              </time>
            </span>
          </div>
        )}
        {heading && (
          <div className="c__resource-card__heading-wrapper">
            <Heading tag={headingTag} className={`u__${headingSize}`}>
              {buttonDestination ? (
                <Link
                  href={buttonDestination || "#"}
                  className="u__full-cover-anchor-psuedo u__inherited-anchor u__text-decoration-underline-hover"
                >
                  {heading}
                </Link>
              ) : (
                heading
              )}
            </Heading>
          </div>
        )}
        {description && (
          <div className="c__resource-card__description-wrapper">
            <Description className={`u__${descriptionSize}`}>
              {description}
            </Description>
          </div>
        )}
      </div>
      {stegaClean(buttonTitle) && (
        <div className="c__resource-card__button-wrapper mt-auto">
          <Button
            destination={buttonDestination}
            title={buttonTitle}
            theme={buttonTheme}
            target={buttonTarget}
          />
        </div>
      )}
    </Component>
  );
};

export default ResourceCard;
