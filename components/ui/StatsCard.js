"use client";
import styled from "styled-components";
import CountUp from "react-countup";
import Heading from "@/components/ui/Heading";
import Description from "@/components/ui/Description";
import { cn } from "@/lib/utils";

const Component = styled.div`
  height: 100%;
  .c__stats-card {
    &__row {
      height: 100%;
      display: flex;
      margin-left: -12px;
      margin-right: -12px;
      @media (min-width: 768px) {
        margin-left: -14px;
        margin-right: -14px;
      }
    }
    &__col {
      padding-left: 12px;
      padding-right: 12px;
      @media (min-width: 768px) {
        padding-left: 14px;
        padding-right: 14px;
      }
      &--right {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    &__border {
      height: 100%;
      width: 3px;
      background: var(--t-primary-branding-color);
    }
  }
  .c__heading {
    color: var(--t-primary-branding-color);
    @media (min-width: 1300px) {
      font-size: 5rem;
      line-height: 1.2;
    }
  }
  &.u__text-inverted {
    .c__heading {
      color: var(--t-cp-base-white);
    }
    .c__stats-card {
      &__border {
        background: var(--t-cp-base-white);
      }
    }
  }
`;

const StatsCard = ({
  className,
  tickerAnimation = false,
  heading = `150`,
  headingTag = `span`,
  description = `Websites`,
  headingClassName = `u__d1`,
  descriptionClassName = `u__h5`,
}) => {
  const parseHeading = (heading) => {
    if (typeof heading !== "string") return { number: 0, suffix: heading };
    const match = heading.match(/^([\d,\.]+)(.*)$/);
    if (match) {
      const number = parseFloat(match[1].replace(/,/g, ""));
      const suffix = match[2];
      return { number: isNaN(number) ? 0 : number, suffix };
    }

    return { number: 0, suffix: heading };
  };

  const { number, suffix } = parseHeading(heading);
  const isValidNumber = number > 0;

  const renderHeading = () => {
    if (tickerAnimation && isValidNumber) {
      return (
        <CountUp
          end={number}
          duration={2}
          separator=","
          enableScrollSpy
          scrollSpyOnce
          suffix={suffix}
        />
      );
    }
    return heading;
  };

  return (
    <Component className={cn(`c__stats-card`, className)}>
      <div className="c__stats-card__row">
        <div className="c__stats-card__col c__stats-card__col--left">
          <div className="c__stats-card__border" />
        </div>
        <div className="c__stats-card__col c__stats-card__col--right">
          {heading && (
            <div className="c__heading-wrapper mb-[0rem]">
              <Heading
                tag={headingTag}
                className={cn(`mb-0`, headingClassName)}
              >
                {renderHeading()}
              </Heading>
            </div>
          )}
          {description && (
            <div className="c__description-wrapper">
              <Description className={cn(`mb-0`, descriptionClassName)}>
                {description}
              </Description>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default StatsCard;
