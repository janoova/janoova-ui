"use client";
import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { stegaClean } from "@sanity/client/stega";

const Component = styled.div`
  .c__two-column-title-with-cta {
    &__wrapper {
      @media (min-width: 992px) {
        display: flex;
        flex-wrap: nowrap;
        margin-left: -12px;
        margin-right: -12px;
      }
    }
    &__column {
      width: 100%;
      @media (min-width: 992px) {
        padding-left: 12px;
        padding-right: 12px;
      }
      &:last-child {
        @media (min-width: 992px) {
          max-width: 25%;
          flex: 0 0 25%;
        }
        @media (min-width: 1200px) {
          max-width: 20%;
          flex: 0 0 20%;
        }
      }
      &:first-child {
        @media (min-width: 992px) {
          max-width: 75%;
          flex: 0 0 75%;
        }
        @media (min-width: 1200px) {
          max-width: 80%;
          flex: 0 0 80%;
        }
      }
    }
    &__button-wrapper {
      @media (min-width: 992px) {
        text-align: right;
        margin-top: 0.65rem;
      }
    }
  }
`;

const TwoColumnTitleWithCTA = ({
  heading,
  headingTag,
  description,
  descriptionTag,
  buttonTitle,
  buttonDestination,
  buttonTheme,
}) => {
  return (
    <Component className={`c__two-column-title-with-cta`}>
      <div className="c__two-column-title-with-cta__wrapper">
        <div className="c__two-column-title-with-cta__column">
          <div className="c__heading-and-description">
            {heading && (
              <div className="c__heading-wrapper mb-3">
                <Heading tag={headingTag || `h2`} className="u__h2">
                  {heading}
                </Heading>
              </div>
            )}
            {description && (
              <div className="c__description-wrapper">
                <Heading
                  tag={descriptionTag || `h3`}
                  className="c__description u__h6 u__f-400 mb-3 mb-lg-0 u__body-color"
                >
                  {description}
                </Heading>
              </div>
            )}
          </div>
        </div>
        {stegaClean(buttonTitle) && (
          <div className="c__two-column-title-with-cta__column">
            <div className="c__two-column-title-with-cta__button-wrapper mt-4 mt-lg-0">
              <Button
                destination={buttonDestination}
                title={buttonTitle}
                theme={buttonTheme}
              />
            </div>
          </div>
        )}
      </div>
    </Component>
  );
};

export default TwoColumnTitleWithCTA;
