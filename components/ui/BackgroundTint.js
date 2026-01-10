"use client";
import styled from "styled-components";

const Component = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BackgroundTint = () => {
  return <Component className="c__background-tint"></Component>;
};

export default BackgroundTint;
