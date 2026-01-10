import { css } from "styled-components";

const Utils = css`
  .u {
    // ## Border radius
    &__br {
      &-3 {
        border-radius: 3px;
      }
      &-4 {
        border-radius: 4px;
      }
      &-5 {
        border-radius: 5px;
      }
      &-6 {
        border-radius: 6px;
      }
      &-7 {
        border-radius: 7px;
      }
      &-8 {
        border-radius: 8px;
      }
      &-9 {
        border-radius: 9px;
      }
      &-10 {
        border-radius: 10px;
      }
      &-15 {
        border-radius: 15px;
      }
      &-20 {
        border-radius: 20px;
      }
      &-25 {
        border-radius: 25px;
      }
    }
    // ## End border radius

    // ## Z index
    &__z-index {
      &-1 {
        z-index: 1;
      }
      &-5 {
        z-index: 5;
      }
      &-10 {
        z-index: 10;
      }
      &-15 {
        z-index: 15;
      }
    }
    // ## End Z index

    // ## Position
    &__position {
      &-relative {
        position: relative;
      }
      &-absolute {
        position: absolute;
      }
    }
    // ## End position

    // ## Typography
    &__f {
      &-100 {
        font-weight: 100 !important;
      }
      &-200 {
        font-weight: 200 !important;
      }
      &-300 {
        font-weight: 300 !important;
      }
      &-400 {
        font-weight: 400 !important;
      }
      &-500 {
        font-weight: 500 !important;
      }
      &-600 {
        font-weight: 600 !important;
      }
      &-700 {
        font-weight: 700 !important;
      }
      &-800 {
        font-weight: 800 !important;
      }
      &-900 {
        font-weight: 900 !important;
      }
    }
    &__text {
      &-uppercase {
        text-transform: uppercase;
      }
      &-lowercase {
        text-transform: lowercase;
      }
      &-capitalize {
        text-transform: capitalize;
      }
      &-decoration {
        &-underline {
          text-decoration: underline;
          &-hover {
            &:hover {
              text-decoration: underline !important;
            }
          }
        }
        &-none {
          text-decoration: none;
        }
      }
      &-inverted {
        color: var(--t-cp-base-white);
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: var(--t-cp-base-white);
        }
        a {
          color: var(--t-cp-base-white);
        }
      }
    }
    &__truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__text {
      &-light {
        color: var(--t-light-text-color);
      }
      &-branding {
        &-primary {
          color: var(--t-primary-branding-color);
        }
        &-secondary {
          color: var(--t-secondary-branding-color);
        }
      }
    }
    &__font-weight {
      &-heading {
        font-weight: var(--t-font-weight-heading);
      }
    }
    &__font-family {
      &-heading {
        font-family: var(--t-font-family-heading);
      }
      &-body {
        font-family: var(--t-font-family-body);
      }
    }
    &__heading-color {
      color: var(--t-heading-color);
    }
    &__body-color {
      color: var(--t-body-color);
    }
    &__anchor-color {
      color: var(--t-anchor-color);
    }
    &__d1 {
      font-size: var(--t-font-size-d1);
      line-height: var(--t-line-height-d1);
    }
    &__d2 {
      font-size: var(--t-font-size-d2);
      line-height: var(--t-line-height-d2);
    }
    &__h1 {
      font-size: var(--t-font-size-h1);
      line-height: var(--t-line-height-h1);
    }
    &__h2 {
      font-size: var(--t-font-size-h2);
      line-height: var(--t-line-height-h2);
    }
    &__h3 {
      font-size: var(--t-font-size-h3);
      line-height: var(--t-line-height-h3);
    }
    &__h4 {
      font-size: var(--t-font-size-h4);
      line-height: var(--t-line-height-h4);
    }
    &__h5 {
      font-size: var(--t-font-size-h5);
      line-height: var(--t-line-height-h5);
    }
    &__h6 {
      font-size: var(--t-font-size-h6);
      line-height: var(--t-line-height-h6);
    }
    &__subtitle {
      font-size: var(--t-font-size-subtitle);
      line-height: var(--t-line-height-subtitle);
    }
    &__p {
      font-size: var(--t-font-size-body);
      line-height: var(--t-line-height-body);
    }
    &__small {
      font-size: var(--t-font-size-small);
      line-height: var(--t-line-height-small);
    }
    &__inherited-anchor {
      color: inherit;
      text-decoration: inherit;
      &:hover,
      &:focus {
        color: inherit;
        text-decoration: inherit;
      }
    }
    // ## End typography

    // ## Widths
    &__mw {
      &-400 {
        max-width: 400px !important;
      }
      &-500 {
        max-width: 500px !important;
      }
      &-600 {
        max-width: 600px !important;
      }
      &-700 {
        max-width: 700px !important;
      }
      &-750 {
        max-width: 750px !important;
      }
      &-800 {
        max-width: 800px !important;
      }
      &-900 {
        max-width: 900px !important;
      }
      &-1000 {
        max-width: 1000px !important;
      }
      &-1100 {
        max-width: 1100px !important;
      }
    }
    // ## End widths

    // ## Show/hide

    &__hide-after-1400 {
      display: block;
      @media (min-width: 1400px) {
        display: none;
      }
    }
    &__show-after-1400 {
      display: none;
      @media (min-width: 1400px) {
        display: block;
      }
    }

    &__hide-after-1200 {
      display: block;
      @media (min-width: 1200px) {
        display: none;
      }
    }
    &__show-after-1200 {
      display: none;
      @media (min-width: 1200px) {
        display: block;
      }
    }

    &__hide-after-992 {
      display: block;
      @media (min-width: 992px) {
        display: none;
      }
    }
    &__show-after-992 {
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
    &__hide-after-768 {
      display: block;
      @media (min-width: 768px) {
        display: none;
      }
    }
    &__show-after-768 {
      display: none;
      @media (min-width: 768px) {
        display: block;
      }
    }
    &__hide-after-576 {
      display: block;
      @media (min-width: 576px) {
        display: none;
      }
    }
    &__show-after-576 {
      display: none;
      @media (min-width: 576px) {
        display: block;
      }
    }
    // ## End show/hide

    // ## Anchors
    &__full-cover-anchor {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    &__full-cover-anchor-psuedo {
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }
    // ## End anchors

    // ## Object fit
    &__object-fit {
      &-contain {
        object-fit: contain !important;
      }
      &-cover {
        object-fit: cover !important;
      }
    }
    // ## End object fit

    // ## Overflows
    &__overflow {
      &-hidden {
        overflow: hidden !important;
      }
    }
    // ## End overflows
    // ## Box shadows
    &__box-shadow {
      &-xs {
        box-shadow: var(--t-box-shadow-xs);
      }
      &-sm {
        box-shadow: var(--t-box-shadow-sm);
      }
      &-md {
        box-shadow: var(--t-box-shadow-md);
      }
      &-lg {
        box-shadow: var(--t-box-shadow-lg);
      }
      &-xl {
        box-shadow: var(--t-box-shadow-xl);
      }
      &-2xl {
        box-shadow: var(--t-box-shadow-2xl);
      }
      &-3xl {
        box-shadow: var(--t-box-shadow-3xl);
      }
    }
    // ## End box shadows
    // ## Borders
    &__border {
      &-top {
        border-top: 2px solid var(--t-border-color);
      }
      &-bottom {
        border-bottom: 2px solid var(--t-border-color);
      }
      &-none {
        border: none !important;
      }
    }
    // ## End Borders

    // ## Transitions and cursors
    &__transition {
      transition: 0.2s ease;
      &:hover {
        transition: 0.2s ease;
      }
    }
    &__translate {
      &:hover {
        transform: translateY(-5px);
      }
    }
    &__cursor {
      &-pointer {
        cursor: pointer;
      }
    }
    // ## End Transitions and cursors

    // ## Backgrounds
    &__background {
      &-light {
        background-color: var(--t-light-background-color) !important;
      }
      &-primary {
        background-color: var(--t-primary-branding-color) !important;
      }
      &-secondary {
        background-color: var(--t-secondary-branding-color) !important;
      }
    }
    // ## End Backgrounds

    // ## Misc
    &__height-fit-to-screen {
      @media (min-width: 768px) {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
    &__opacity {
      &-0n5 {
        opacity: 0.5;
      }
      &-0n6 {
        opacity: 0.6;
      }
      &-0n7 {
        opacity: 0.7;
      }
    }
    &__remove-padding {
      &-top {
        &-till-md {
          @media (max-width: 768px) {
            padding-top: 0 !important;
          }
        }
        &-till-sm {
          @media (max-width: 576px) {
            padding-top: 0 !important;
          }
        }
      }
      &-bottom {
        &-till-md {
          @media (max-width: 768px) {
            padding-bottom: 0 !important;
          }
        }
        &-till-sm {
          @media (max-width: 576px) {
            padding-bottom: 0 !important;
          }
        }
      }
      &-left {
        &-till-sm {
          @media (max-width: 576px) {
            padding-left: 0 !important;
          }
        }
        &-till-md {
          @media (max-width: 768px) {
            padding-left: 0 !important;
          }
        }
        &-till-lg {
          @media (max-width: 992px) {
            padding-left: 0 !important;
          }
        }
      }
      &-right {
        &-till-sm {
          @media (max-width: 576px) {
            padding-right: 0 !important;
          }
        }
        &-till-md {
          @media (max-width: 768px) {
            padding-right: 0 !important;
          }
        }
        &-till-lg {
          @media (max-width: 992px) {
            padding-right: 0 !important;
          }
        }
      }
    }
    // ## End misc

    // New util classes here
  }
`;

export default Utils;
