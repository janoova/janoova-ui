import Image from "next/image";
import BackgroundTint from "@/components/ui/BackgroundTint";

const BackgroundImageWithTint = ({
  src,
  alt,
  blurDataURL,
  enableBackgroundTint,
}) => {
  return (
    <>
      {src && (
        <div className="c__absolute-image">
          <Image
            fill={true}
            placeholder="blur"
            blurDataURL={blurDataURL}
            src={src}
            alt={alt ?? ""}
            sizes="100%"
          />
        </div>
      )}
      {enableBackgroundTint && <BackgroundTint />}
    </>
  );
};

export default BackgroundImageWithTint;
