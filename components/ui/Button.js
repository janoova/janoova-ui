"use client";
import Link from "next/link";
import React from "react";
import { getCleanValue } from "@/lib/helpers";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

const Component = styled.div`
  .c {
    &__button {
      padding: var(--t-button-padding);
      border-radius: var(--t-button-border-radius);
      border: 2px solid;
      &__content {
        font-weight: var(--t-font-weight-button);
        font-family: var(--t-font-family-button);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
      }
      &__icon {
        display: flex;
        align-items: center;
        svg {
          width: 16px;
          height: 16px;
        }
      }
      &__arrow-icon {
        display: flex;
        align-items: center;
        svg {
          width: 16px;
          height: 16px;
        }
      }
      &__loading-icon {
        width: auto;
        display: none;
        padding-left: 0.85em;
        position: relative;
        top: -2px;
        margin: 0;
        .c__spinner {
          height: 20px;
          width: 20px;
        }
      }
      &--loading {
        opacity: 0.7;
        pointer-events: none;
        .c {
          &__button {
            &__content {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            &__arrow-icon {
              svg path {
                stroke: var(--t-cp-base-white);
              }
            }
            &__icon {
              svg path {
                stroke: var(--t-cp-base-white);
              }
            }
            &__loading-icon {
              display: block;
            }
          }
        }
      }
      &--disabled {
        opacity: 0.7;
        pointer-events: none;
      }
      &__size {
        &--default {
          font-size: 16px;
        }
        &--large {
          font-size: 18px;
          padding: var(--t-button-padding-large);
          .c__button__arrow-icon {
            svg {
              width: 18px;
              height: 18px;
            }
          }
        }
        &--xlarge {
          font-size: 20px;
          padding: var(--t-button-padding-xlarge);
          .c__button__arrow-icon {
            svg {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      &__anchor-element {
        text-decoration: none;
        &:hover,
        &:focus,
        &:active {
          text-decoration: none;
        }
        > span.c__button {
          display: inline-block;
        }
      }
      &--primary {
        background: var(--t-primary-branding-color);
        color: var(--t-cp-base-white);
        border-color: var(--t-primary-branding-color);
        &:hover {
          background: var(--t-primary-branding-hover-color);
          border-color: var(--t-primary-branding-hover-color);
        }
      }
      &--secondary {
        background: var(--t-secondary-branding-color);
        color: var(--t-cp-base-white);
        border-color: var(--t-secondary-branding-color);
        &:hover {
          background: var(--t-secondary-branding-hover-color);
          border-color: var(--t-secondary-branding-hover-color);
        }
      }
      &--ghost {
        &-primary {
          background: transparent;
          border: 2px solid var(--t-primary-branding-color);
          color: var(--t-primary-branding-color);
          &:hover {
            background: var(--t-primary-branding-color);
            color: var(--t-cp-base-white);
            border-color: var(--t-primary-branding-color);
          }
        }
        &-secondary {
          background: transparent;
          border: 2px solid var(--t-secondary-branding-color);
          color: var(--t-secondary-branding-color);
          &:hover {
            background: var(--t-secondary-branding-color);
            color: var(--t-cp-base-white);
            border-color: var(--t-secondary-branding-color);
          }
        }
      }
      &--link {
        background-color: transparent;
        border: none;
        color: var(--t-anchor-color);
        padding: 0;
        .c {
          &__button {
            &__content {
              font-weight: 600 !important;
            }
          }
        }
        &:hover {
          color: var(--t-anchor-hover-color);
          .c {
            &__button__content {
              text-decoration: underline;
              text-underline-offset: 6px;
              text-decoration-thickness: 1px;
            }
          }
          svg {
            path {
              stroke: var(--t-anchor-hover-color);
            }
          }
        }
      }
      &--skip-to-content {
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        clip: rect(0, 0, 0, 0);
        border-width: 0;
        white-space: nowrap;
        &:focus {
          height: auto;
          margin: auto;
          overflow: visible;
          width: auto;
          clip: auto;
          top: 1rem;
          z-index: 9;
        }
      }
      &--inverted {
        background: var(--t-cp-base-white);
        color: var(--t-primary-branding-color);
        &:hover {
          background: #eee;
        }
      }
    }
  }
`;

const Button = ({
  title,
  destination,
  target,
  renderArrow = false,
  icon,
  iconPosition = "after",
  iconProps = {},
  className,
  linkClassName,
  theme = `primary`,
  size = `default`,
  actionable,
  type,
  onClick,
  isLoading,
  isDisabled,
}) => {
  // Render custom icon
  const renderCustomIcon = () => {
    if (!icon) return null;

    const IconComponent = icon;
    return (
      <div className="c__button__icon">
        <IconComponent strokeWidth={2.5} {...iconProps} />
      </div>
    );
  };

  const renderArrowIcon = () => {
    if (!renderArrow) return null;

    return (
      <div className="c__button__arrow-icon">
        <ArrowRight strokeWidth={2.5} />
      </div>
    );
  };

  // Render loading spinner
  const renderLoadingIcon = () => (
    <figure className="c__button__loading-icon">
      <svg className="c__spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </figure>
  );
  const renderButtonContent = () => {
    const customIcon = renderCustomIcon();
    const arrowIcon = renderArrowIcon();
    const textContent = <span>{title}</span>;
    const loadingIcon = renderLoadingIcon();

    return (
      <div className="c__button__content">
        {iconPosition === "before" && customIcon}
        {textContent}
        {iconPosition === "after" && customIcon}
        {arrowIcon}
        {loadingIcon}
      </div>
    );
  };

  return (
    <>
      {actionable ? (
        <>
          {title && (
            <Component>
              <button
                onClick={onClick}
                type={type}
                className={`c__button c__button--${getCleanValue(theme)} ${
                  className ? className : ``
                } c__button__size--${size} ${isLoading ? `c__button--loading` : ``} ${isDisabled ? `c__button--disabled` : ``}`}
              >
                {renderButtonContent()}
              </button>
            </Component>
          )}
        </>
      ) : (
        <>
          {title && (
            <Component>
              <Link
                className={`c__button__anchor-element ${linkClassName ? linkClassName : ``}`}
                href={getCleanValue(destination) || "#"}
                target={target ? "_blank" : "_self"}
                rel={target ? "noopener noreferrer" : undefined}
              >
                <span
                  className={`c__button c__button--${getCleanValue(theme)} ${
                    className ? className : ``
                  } c__button__size--${size}`}
                >
                  {renderButtonContent()}
                </span>
              </Link>
            </Component>
          )}
        </>
      )}
    </>
  );
};

export default Button;
