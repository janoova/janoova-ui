"use client";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/ui/PortableTextComponents";

const Component = styled.div`
  &.c__article-content {
    > :first-child {
      margin-top: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 2.75rem;
      margin-bottom: 1.25rem;
    }
    img,
    iframe {
      max-width: 100%;
      margin: 2rem 0 2rem 0;
    }
    blockquote {
      padding: 1rem;
      padding-left: 2rem;
      border-left: 3px solid var(--t-primary-branding-color);
      & > :last-child {
        margin-bottom: 0;
      }
    }
    ul li,
    ol li {
      margin-bottom: 0.5rem;
    }
    ul,
    ol {
      margin-bottom: 1rem;
    }
    &--list-dash {
      ul {
        list-style: none;
        padding: 0;
        li {
          margin-bottom: 1rem;
          padding-left: 1.75rem;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            background-image: url("data:image/svg+xml,%3Csvg width='10' height='3' viewBox='0 0 10 3' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='3' fill='%236816E2'/%3E%3C/svg%3E%0A");
            background-size: contain;
            background-repeat: no-repeat;
            top: 12px;
            width: 10px;
            height: 10px;
            left: 8px;
          }
        }
      }
    }
  }
`;

const ArticleContent = ({ content, className }) => {
  return (
    <Component
      className={`c__article-content prose max-w-none ${className ? className : ``}`}
    >
      <PortableText value={content} components={PortableTextComponents} />
    </Component>
  );
};

export default ArticleContent;
