"use client";
import React, { useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { PortableText } from "@portabletext/react";

const Component = styled.div`
  border-bottom: none;
  margin-bottom: 1.25rem;
  &:last-child {
    margin-bottom: 0 !important;
  }
  .c__accordion {
    &__header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    &__body-wrapper {
      padding-bottom: 1rem;
      padding-top: 1rem;
    }
    &__heading-wrapper {
      padding-right: 1.5rem;
    }
    &__figure-wrapper {
      svg {
        width: 23px;
      }
    }
  }
  &.c__accordion {
    &--active {
      .c {
        &__accordion {
          &__body-wrapper {
            display: block !important;
          }
          &__figure-wrapper {
            &__plus {
              display: none !important;
            }
            &__minus {
              display: block !important;
              svg {
                path {
                  stroke: var(--t-primary-branding-color);
                }
              }
            }
          }
        }
      }
    }
    &--border-bottom {
      border-bottom: 1px solid var(--t-border-color);
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      .c {
        &__richtext-field {
          > :last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

const Accordion = ({ index, heading, content, borderBottom = true }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <Component
      className={`c__accordion ${borderBottom ? `c__accordion--border-bottom` : ``} ${expanded ? `c__accordion--active` : ``}`}
    >
      <div
        tabIndex={0}
        aria-expanded={expanded}
        role="button"
        aria-controls={`c__accordion-index-${index}`}
        className="c__accordion__header-wrapper"
        onClick={() => {
          handleExpanded();
        }}
        onKeyDown={(e) => (e.key === "Enter" ? handleExpanded() : "")}
      >
        {heading && (
          <div className="c__accordion__heading-wrapper">
            <h3 className="c__accordion__heading u__h5 mb-0">
              {parse(heading)}
            </h3>
          </div>
        )}
        <div className="c__accordion__figure-wrapper">
          <div className="c__accordion__figure-wrapper__plus">
            <figure className="m-0">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="#A8A9AB"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </figure>
          </div>
          <div
            className="c__accordion__figure-wrapper__minus"
            style={{ display: "none" }}
          >
            <figure className="m-0">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="#A8A9AB"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </figure>
          </div>
        </div>
      </div>
      {content && (
        <div
          id={`c__accordion-index-${index}`}
          aria-hidden={expanded ? `false` : `true`}
          className="c__accordion__body-wrapper"
          style={{ display: "none" }}
        >
          <div className="c__richtext-field">
            <PortableText value={content} />
          </div>
        </div>
      )}
    </Component>
  );
};

export default Accordion;
