import React from "react";
import parse from "html-react-parser";
import { stegaClean } from "@sanity/client/stega";

const Heading = ({ children, className = "u__h1", tag, disableParse }) => {
  const HeadingTag = tag ? stegaClean(tag) : `h2`;

  const renderChildren = () => {
    if (disableParse) {
      return children;
    }

    if (typeof children === "string") {
      return children.includes("<span")
        ? parse(stegaClean(children))
        : parse(children);
    }

    return children;
  };

  return (
    <>
      <HeadingTag
        className={`c__heading ${stegaClean(className)} u__font-weight-heading mb-[0.5rem] block`}
      >
        {renderChildren()}
      </HeadingTag>
    </>
  );
};

export default Heading;
