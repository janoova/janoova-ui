"use client";
import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

const Section = styled.section`
  ${(props) =>
    props.$scopedCss ||
    `padding: 64px 0; background-color: var(--t-cp-base-white);`}
`;

const Bounded = ({
  type,
  className,
  id,
  scopedCss,
  children,
  index,
  ...restProps
}) => {
  return (
    <Section
      id={id ? `bounded-section-id-${id}` : null}
      $scopedCss={scopedCss ? scopedCss?.code : null}
      data-block-type={type && parse(type)}
      className={cn(
        className,
        index?.toString() && `bounded-section-idx-${index}`
      )}
      {...restProps}
    >
      {children}
    </Section>
  );
};

export default Bounded;
