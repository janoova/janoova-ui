"use client";

import dynamic from "next/dynamic";

const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

export default function LazyReactSelect(props) {
  return <ReactSelect {...props} />;
}
