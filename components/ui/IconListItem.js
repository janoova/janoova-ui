"use client";
import styled from "styled-components";
import parse from "html-react-parser";
import Image from "next/image";
import Heading from "./Heading";
import Description from "./Description";
import { getCleanValue } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const Component = styled.div`
  .c__icon-list-item {
    &__wrapper {
      display: flex;
      flex-wrap: nowrap;
      margin-left: -8px;
      margin-right: -8px;
    }
    &__column {
      padding-left: 8px;
      padding-right: 8px;
      &:first-child {
        min-width: 55px;
      }
    }
    &__figure-wrapper {
      img,
      svg {
        width: 39px;
        height: 39px;
        margin-top: -1px;
      }
      svg {
        object-fit: contain;
      }
    }
  }
`;

const IconListItem = ({
  className,
  iconType = `svg`,
  iconColor = `var(--t-primary-branding-color)`,
  iconSvg,
  icon,
  heading,
  headingTag,
  description,
}) => {
  return (
    <Component className={cn(`c__icon-list-item`, className)}>
      <div className="c__icon-list-item__wrapper">
        <div className="c__icon-list-item__column">
          {(icon?.src || iconSvg) && (
            <div
              className={`c__icon-list-item__figure-wrapper`}
              style={{ color: iconColor }}
            >
              <figure className="m-0 inline">
                {iconType === `image` && icon?.src && (
                  <Image
                    src={icon.src}
                    alt={icon.alt ?? ""}
                    width={500}
                    height={500}
                  />
                )}
                {iconType === `svg` && iconSvg && (
                  <>{parse(getCleanValue(iconSvg))}</>
                )}
              </figure>
            </div>
          )}
        </div>
        <div className="c__icon-list-item__column">
          {heading && (
            <div className="c__icon-list-item__heading-wrapper">
              <Heading
                tag={headingTag || `h3`}
                className="c__icon-list-item__heading u__h5"
              >
                {heading}
              </Heading>
            </div>
          )}

          {description && (
            <div className={`c__icon-list-item__description-wrapper`}>
              <Description className="c__icon-list-item__description mb-0">
                {description}
              </Description>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default IconListItem;
