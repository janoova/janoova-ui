"use client";
import styled from "styled-components";
import parse from "html-react-parser";
import { getCleanValue } from "@/lib/helpers";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";

const Component = styled.div`
  .c__text-card {
    &__bar {
      height: 3px;
      &-wrapper {
        max-width: 125px;
        margin-bottom: 1.5rem;
      }
    }
    &__heading-wrapper {
      margin-bottom: 0.85rem;
    }
  }
  &.c__text-card {
    &--primary {
      .c__text-card {
        &__bar {
          background: var(--t-primary-branding-color);
        }
      }
    }
    &--secondary {
      .c__text-card {
        &__bar {
          background: var(--t-secondary-branding-color);
        }
      }
    }
  }
`;

const TextCardWithBar = ({
  heading,
  description,
  theme = `primary`,
  headingTag = "h3",
}) => {
  return (
    <Component
      className={`c__text-card ${theme && `c__text-card--${getCleanValue(theme)}`}`}
    >
      <div className="c__text-card__wrapper">
        <div className="c__text-card__bar-wrapper">
          <div className="c__text-card__bar" />
        </div>
        {heading && (
          <div className="c__text-card__heading-wrapper">
            <Heading
              tag={headingTag || `h3`}
              className="c__text-card__heading u__h5"
            >
              {heading}
            </Heading>
          </div>
        )}
        {description && (
          <div className="c__text-card__description-wrapper">
            <Description className="c__text-card__description mb-0">
              {description}
            </Description>
          </div>
        )}
      </div>
    </Component>
  );
};

export default TextCardWithBar;
