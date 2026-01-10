"use client";
import Bounded from "@/components/wrappers/Bounded";
import styled from "styled-components";
import ResourceCard from "@/components/ui/ResourceCard";
import { baseUrl } from "@/lib/constants";
import { getCleanValue } from "@/lib/helpers";
import urlFor from "@/lib/imageUrlBuilder";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";

const Wrapper = styled.div`
  .b__archive__variant01 {
    &__row {
      --bs-gutter-x: 1.5rem;
      --bs-gutter-y: 2rem;
    }
  }
`;

const ArchiveVariant01 = ({
  data,
  prevPageDestination,
  nextPageDestination,
}) => {
  return (
    <Bounded
      id={data?._key}
      type={data?._type}
      scopedCss={data?.scoped_css}
      className="b__archive__variant01 overflow-hidden relative"
    >
      <Wrapper>
        <div className="container">
          <div className="row b__archive__variant01__row">
            {data.map((elem) => {
              const {
                featured_image,
                slug,
                title,
                heading,
                excerpt,
                publish_date,
                _id,
              } = elem;

              const destination = `${baseUrl}/blog/${slug.current}`;

              const imageObj = featured_image
                ? {
                    src: urlFor(featured_image).url(),
                    alt: featured_image.alt || null,
                    blurDataURL: featured_image
                      ? featured_image.asset?.metadata?.lqip
                      : null,
                  }
                : null;

              return (
                <div key={_id} className="col-md-6 col-lg-4">
                  <ResourceCard
                    image={imageObj}
                    description={excerpt}
                    heading={getCleanValue(heading) ? heading : title}
                    publishDate={publish_date}
                    buttonTitle={`Read more`}
                    buttonDestination={destination}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {prevPageDestination || nextPageDestination ? (
          <div className="container mt-[3rem] pt-[1.5rem]">
            <Pagination
              prevPageDestination={prevPageDestination}
              nextPageDestination={nextPageDestination}
            />
          </div>
        ) : (
          ``
        )}
      </Wrapper>
    </Bounded>
  );
};

export default ArchiveVariant01;
