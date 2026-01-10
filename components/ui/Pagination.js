import styled from "styled-components";
import Link from "next/link";

const Component = styled.div`
  .c__pagination {
    &__row {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -6px;
      margin-right: -6px;
    }
    &__col {
      padding-left: 6px;
      padding-right: 6px;
    }
    &__link {
      background-color: var(--t-pagination-button-color);
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      &:hover {
        background-color: var(--t-pagination-button-hover-color);
      }
      &--next {
        .c__pagination__text {
          padding-right: 0.4rem;
        }
      }
      &--prev {
        .c__pagination__text {
          padding-left: 0.4rem;
        }
      }
    }
    &__icon {
      width: 18px;
      height: 18px;
    }
  }
`;

const Pagination = ({ prevPageDestination, nextPageDestination }) => {
  return (
    <Component className="c__pagination">
      <div className="c__pagination__row">
        {prevPageDestination && (
          <div className="c__pagination__col">
            <Link href={prevPageDestination || `#`}>
              <div className="c__pagination__link c__pagination__link--prev">
                <figure className="inline m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="c__pagination__icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </figure>
                <span className="c__pagination__text">Prev</span>
              </div>
            </Link>
          </div>
        )}
        {nextPageDestination && (
          <div className="c__pagination__col">
            <Link href={nextPageDestination || `#`}>
              <div className="c__pagination__link c__pagination__link--next">
                <span className="c__pagination__text">Next</span>
                <figure className="inline m-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="c__pagination__icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </figure>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Component>
  );
};

export default Pagination;
