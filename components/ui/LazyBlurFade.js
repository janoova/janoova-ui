"use client";

import dynamic from "next/dynamic";

const BlurFade = dynamic(
  () =>
    import("@/components/magicui/blur-fade").then((mod) => ({
      default: mod.BlurFade,
    })),
  { ssr: false }
);

export default function LazyBlurFade(props) {
  return <BlurFade {...props} />;
}
