"use client";
import styled from "styled-components";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Component = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .c__partner-logo {
    &__image {
      width: 100%;
      height: 50px;
      max-width: 150px;
      object-fit: contain;
    }
  }
`;

const PartnerLogo = ({ image, className }) => {
  // Don't render if no valid image src
  if (!image?.src) return null;

  return (
    <Component className={cn(`c__partner-logo relative`, className)}>
      <Image
        className="c__partner-logo__image w-auto h-auto"
        src={image.src}
        alt={image.alt || ``}
        width={800}
        height={800}
        sizes="100vw"
      />
    </Component>
  );
};

export default PartnerLogo;
