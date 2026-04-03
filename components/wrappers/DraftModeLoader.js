"use client";
import dynamic from "next/dynamic";

const DraftModeContent = dynamic(
  () => import("@/components/wrappers/DraftModeContent.js"),
  { ssr: false }
);

export default function DraftModeLoader() {
  return <DraftModeContent />;
}
