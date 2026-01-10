"use client";
import styled from "styled-components";

// ****DEPRECIATED***

const Component = styled.div`
  height: 100%;
  .c__card-with-spotlight-heading {
    &__row {
      height: 100%;
      display: flex;
      margin-left: -12px;
      margin-right: -12px;
      @media (min-width: 768px) {
        margin-left: -14px;
        margin-right: -14px;
      }
    }
    &__col {
      padding-left: 12px;
      padding-right: 12px;
      @media (min-width: 768px) {
        padding-left: 14px;
        padding-right: 14px;
      }
      &--right {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    &__heading {
      background: var(--t-primary-branding-color);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &__border {
      height: 100%;
      width: 4px;
      background: var(--t-primary-branding-color);
    }
  }
`;

const CardWithSpotlightHeading = ({ className, heading, description }) => {
  return (
    <Component
      className={`c__card-with-spotlight-heading ${className ? className : ``}`}
    >
      <div className="c__card-with-spotlight-heading__row">
        <div className="c__card-with-spotlight-heading__col c__card-with-spotlight-heading__col--left">
          <div className="c__card-with-spotlight-heading__border" />
        </div>
        <div className="c__card-with-spotlight-heading__col c__card-with-spotlight-heading__col--right">
          {heading && (
            <div className="c__card-with-spotlight-heading__heading-wrapper">
              <h3 className="c__card-with-spotlight-heading__heading u__d2">
                {heading}
              </h3>
            </div>
          )}
          {description && (
            <div className="c__card-with-spotlight-heading__description-wrapper">
              <p className="c__card-with-spotlight-heading__description u__subtitle mb-0">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default CardWithSpotlightHeading;
