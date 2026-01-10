"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import { getCleanValue } from "@/lib/helpers";
import ArticleContent from "@/components/ui/ArticleContent";
import { BackgroundPattern } from "@/components/ui/BackgroundPatterns";
import { cn } from "@/lib/utils";

const Wrapper = styled.article`
  .b__post__variant01 {
    &__image-wrapper {
      width: 100%;
      height: 300px;
      @media (max-width: 500px) {
        width: 125%;
        margin-left: -2rem;
      }
      @media (min-width: 768px) {
        height: 450px;
      }
      @media (min-width: 992px) {
        height: 600px;
      }
      img {
        border-radius: var(--t-global-image-border-radius);
        object-fit: cover;
        object-position: 50% 50%;
        width: 100%;
      }
    }
  }
`;

const PostVariant01 = ({ data }) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      index={0}
      scopedCss={data?.scoped_css}
      className="b__post__variant01 overflow-hidden relative"
    >
      {/* <BackgroundPattern
        patternType={`grid`}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
        )}
      /> */}

      <Wrapper>
        <div className="container">
          <div className="b__post__variant01__header">
            <div className="b__post__variant01__heading-wrapper max-w-[900px] mx-auto mb-[2.5rem] text-center">
              {data.primary_category && (
                <div className="mb-[0.5rem]">
                  <Link
                    href={
                      data.primary_category.slug.current
                        ? `/blog/category/${data.primary_category.slug.current}`
                        : `#`
                    }
                    className="u__subtitle u__f-500 u__text-branding-primary u__font-family-heading u__text-decoration-none"
                  >
                    {data.primary_category.title}
                  </Link>
                </div>
              )}
              {data.title || data.heading ? (
                <Heading tag="h1" className="u__d2">
                  {getCleanValue(data.heading) ? data.heading : data.title}
                </Heading>
              ) : (
                ``
              )}
            </div>
            {data?.featured_image?.asset && (
              <div className="b__post__variant01__image-wrapper relative mb-[1.5rem] pb-[0.5rem]">
                <Image
                  className="b__hero__variant04__image"
                  fill={true}
                  placeholder="blur"
                  blurDataURL={data.featured_image.asset?.metadata?.lqip}
                  src={urlFor(data.featured_image).url()}
                  alt={data.featured_image.alt ?? ""}
                  sizes="100%"
                />
              </div>
            )}
            <div className="b__post__variant01__body u__mw-800 mx-auto">
              {data.publish_date && (
                <div className="b__post__variant01__date-wrapper mb-[1.5rem]">
                  <span className="u__small u__text-light">
                    <time dateTime={`${data.publish_date}T00:00:00Z`}>
                      Published on {formatDate(data.publish_date)}
                    </time>
                  </span>
                </div>
              )}
              {data.content && (
                <div className="b__post__variant01__article">
                  <ArticleContent content={data.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Bounded>
  );
};

export default PostVariant01;
