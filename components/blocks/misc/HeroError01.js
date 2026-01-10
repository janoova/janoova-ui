"use client";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 138px);
`;

const HeroError01 = ({ heading }) => {
  const scopedCss = {
    code: `padding: 0;`,
  };
  return (
    <Bounded
      id={null}
      type={`STATIC__HeroError01`}
      scopedCss={scopedCss}
      className="b__misc__HeroError01"
    >
      <Wrapper>
        <div className="container">
          <div className="text-center">
            <Heading tag="h1" className="u__d2">
              {heading}
            </Heading>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default HeroError01;
