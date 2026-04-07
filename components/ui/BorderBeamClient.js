"use client";

import dynamic from "next/dynamic";

const BorderBeam = dynamic(
  () =>
    import("@/components/magicui/border-beam").then((mod) => ({
      default: mod.BorderBeam,
    })),
  { ssr: false }
);

export default function BorderBeamClient(props) {
  return <BorderBeam {...props} />;
}
