"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const FontSelectorLazy = dynamic(
  () => import("@/components/wrappers/FontSelector"),
  { ssr: false }
);

function FontSelectorGateInner() {
  const searchParams = useSearchParams();
  const shouldLoad = searchParams?.get("customize_font") === "true";
  if (!shouldLoad) return null;
  return <FontSelectorLazy />;
}

export default function FontSelectorGate() {
  return (
    <Suspense fallback={null}>
      <FontSelectorGateInner />
    </Suspense>
  );
}
