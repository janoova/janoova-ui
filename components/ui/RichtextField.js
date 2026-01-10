"use client";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/ui/PortableTextComponents";

const Component = styled.div`
  &.c__richtext-field {
  }
`;

const RichtextField = ({ content, className }) => {
  return (
    <Component className={`c__richtext-field ${className ? className : ``}`}>
      <PortableText value={content} components={PortableTextComponents} />
    </Component>
  );
};

export default RichtextField;
