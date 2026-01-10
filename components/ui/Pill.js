"use client";
import styled from "styled-components";
import parse from "html-react-parser";

const Component = styled.div`
  .c__pill {
    border-radius: 16px;
    font-size: 0.8rem;
    padding: 1px 18px;
    width: fit-content;
    &__text {
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
      margin: 0;
      padding: 0;
    }
    &--primary {
      background-color: var(--t-primary-branding-color);
      color: var(--t-cp-base-white);
    }
    &--secondary {
      background-color: var(--t-secondary-branding-color);
      color: var(--t-cp-base-white);
    }
  }
`;

const Pill = ({ variant = `primary`, title }) => {
  return (
    <Component className="c__pill-wrapper">
      <div className={`c__pill c__pill--${variant} u__f-700 mb-3`}>
        <span className="c__pill__text u__p">{parse(title)}</span>
      </div>
    </Component>
  );
};

export default Pill;
