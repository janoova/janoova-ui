"use client";
import { createGlobalStyle } from "styled-components";

const CustomGlobalStyle = createGlobalStyle`
  ${(props) => props.$css}
`;

const GlobalCustomCSS = ({ css }) => {
  if (!css) return null;
  return <CustomGlobalStyle $css={css} />;
};

export default GlobalCustomCSS;
