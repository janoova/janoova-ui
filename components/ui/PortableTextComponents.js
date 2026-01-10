import parse from "html-react-parser";
import { getCleanValue } from "@/lib/helpers";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import { fallbackImageBlurDataUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PortableTextComponents = {
  types: {
    code: ({ value }) => {
      return <>{value && value.code && parse(getCleanValue(value.code))}</>;
    },
    image: ({ value }) => {
      const alignment = getCleanValue(value.alignment);

      // Map alignment values to margin auto classes
      const getAlignmentClasses = (align) => {
        if (!align) return ""; // Return empty string if no alignment is defined

        switch (align) {
          case "center":
            return "mx-auto";
          case "right":
          case "end":
            return "ms-auto";
          case "left":
          case "start":
          default:
            return ""; // No classes for left alignment or unknown values
        }
      };

      return (
        <>
          {value && value.asset && (
            <>
              <div className="c__richtext-field__image-wrapper">
                <Image
                  className={cn(
                    `c__richtext-field__image`,
                    getCleanValue(value.className),
                    getAlignmentClasses(alignment)
                  )}
                  placeholder="blur"
                  blurDataURL={
                    value.asset.metadata?.lqip ?? fallbackImageBlurDataUrl
                  }
                  src={urlFor(value.asset).url()}
                  alt={value.alt ?? ""}
                  sizes="100%"
                  width={1200}
                  height={800}
                  unoptimized
                />
              </div>
            </>
          )}
        </>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const { href, open_in_new_tab } = value;
      return (
        <a
          href={href}
          target={open_in_new_tab ? "_blank" : "_self"}
          rel={open_in_new_tab ? "noopener noreferrer" : undefined}
          className="c__richtext-field__link"
        >
          {children}
        </a>
      );
    },
  },
};

export default PortableTextComponents;
