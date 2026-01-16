"use client";
import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import Link from "next/link";
import Description from "./Description";
import { getCleanValue } from "@/lib/helpers";
import BackgroundImageWithTint from "./BackgroundImageWithTint";

const Component = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--t-global-image-border-radius);
  overflow: hidden;
  .c__button--link {
    color: var(--t-cp-base-white) !important;
  }
  .c__background-tint {
    /* background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)); */
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--t-primary-branding-color) 0%, rgba(0, 0, 0, 1)),
      color-mix(
        in srgb,
        var(--t-primary-branding-color) 15%,
        rgba(0, 0, 0, 0.25)
      )
    );
  }
  .c__background-image-card {
    &__image-wrapper {
      height: 350px;
    }
    &__content-wrapper {
      position: absolute;
      padding: 1.5rem 1rem;
      left: 0;
      bottom: 0;
    }
  }
  .col-lg-6 & .c__background-image-card__image-wrapper {
    @media (min-width: 992px) {
      height: 500px;
    }
    @media (min-width: 1200px) {
      height: 500px;
    }
  }
  .col-lg-6 & .c__background-image-card__content-wrapper {
    @media (min-width: 992px) {
      padding: 2rem 1.5rem;
    }
  }
`;

const BackgroundImageCard = ({
  image = {
    src: `https://cdn.sanity.io/images/nqj5p7gd/production/1f41c4bad180126545d88582d90cd3b3f1cc43ed-605x451.jpg`,
    alt: `Placeholder grayscale mountains`,
    blurDataURL: `https://cdn.sanity.io/images/nqj5p7gd/production/1f41c4bad180126545d88582d90cd3b3f1cc43ed-605x451.jpg`,
  },
  defaultProps,
  heading = defaultProps && `Powerful Card Heading`,
  headingTag = "h3",
  headingSize = "h4",
  description = defaultProps &&
    `Massa nec scelerisque lacus dis vitae aenean montes platea ullamcorper condimentum quis magna purus tortor class a conubia dui nascetur id.`,
  descriptionSize = "p",
  cardTag = "div",
  buttonTitle = defaultProps && "Learn More",
  buttonTarget,
  buttonDestination,
  buttonTheme = "link",
}) => {
  return (
    <Component
      as={cardTag}
      className={`c__background-image-card relative ${buttonDestination ? `u__transition u__translate` : ``}`}
    >
      {buttonDestination && (
        <Link
          className="u__full-cover-anchor u__z-index-1"
          href={buttonDestination}
          target={buttonTarget ? "_blank" : "_self"}
        >
          <span className="sr-only">{heading}</span>
        </Link>
      )}
      {image && (
        <div className="c__background-image-card__image-wrapper">
          <BackgroundImageWithTint
            src={image.src}
            alt={image.alt ?? ""}
            blurDataURL={image.blurDataURL}
            enableBackgroundTint={true}
          />
          <div className="c__background-image-card__content-wrapper u__text-inverted">
            {heading && (
              <div className="c__background-image-card__heading-wrapper">
                <Heading tag={headingTag} className={`u__${headingSize}`}>
                  {heading}
                </Heading>
              </div>
            )}
            {description && (
              <div className="c__background-image-card__description-wrapper">
                <Description className={`u__${descriptionSize}`}>
                  {description}
                </Description>
              </div>
            )}
            {getCleanValue(buttonTitle) && (
              <div className="c__background-image-card__button-wrapper mt-auto">
                <Button
                  destination={buttonDestination}
                  title={buttonTitle}
                  theme={buttonTheme}
                  target={buttonTarget}
                  className={`u__z-index-5 relative`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Component>
  );
};

export default BackgroundImageCard;
