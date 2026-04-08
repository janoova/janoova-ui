"use client";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false });

export default function TestimonialVariant03Modal({ modalId, children }) {
  return <Modal modalId={modalId}>{children}</Modal>;
}
