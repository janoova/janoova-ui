import { css } from "styled-components";

/**
 * workspace/theme.js
 *
 * Client-specific theme tokens. This file changes per project.
 * All other framework files (styles/, components/, etc.) stay identical across deployments.
 */

export const DarkTheme = css`
  .dark {
    // Typography
    --t-heading-color: #fafafa;
    --t-body-color: #a1a1aa;
    --t-light-text-color: #71717a;
    // Surfaces
    --t-cp-base-white: #09090b;
    --t-cp-base-black: #fafafa;
    // Misc
    --t-border-color: #3f3f46;
    --t-light-background-color: #18181b;
    --t-pagination-button-color: #27272a;
    --t-pagination-button-hover-color: #3f3f46;
    // Form
    --t-form-label-color: #e4e4e7;
    --t-form-input-border-color: #3f3f46;
    --t-form-placeholder-color: #52525b;
    --t-form-select-selected-color: #27272a;
    // Glass header
    --t-header-glass-bg: rgba(9, 9, 11, 0.85);
    // Box shadows (dark surfaces need higher-opacity dark shadows)
    --t-box-shadow-xs: 0px 1px 2px rgba(0, 0, 0, 0.4);
    --t-box-shadow-sm: 0px 1px 3px rgba(0, 0, 0, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.4);
    --t-box-shadow-md: 0px 4px 8px -2px rgba(0, 0, 0, 0.5), 0px 2px 4px -2px rgba(0, 0, 0, 0.4);
    --t-box-shadow-lg: 0px 12px 16px -4px rgba(0, 0, 0, 0.5), 0px 4px 6px -2px rgba(0, 0, 0, 0.3);
    --t-box-shadow-xl: 0px 20px 24px -4px rgba(0, 0, 0, 0.5), 0px 8px 8px -4px rgba(0, 0, 0, 0.3);
    --t-box-shadow-2xl: 0px 24px 48px -12px rgba(0, 0, 0, 0.6);
    --t-box-shadow-3xl: 0px 32px 64px -12px rgba(0, 0, 0, 0.55);
    // Brand colors in dark mode — override for this client
    --t-primary-branding-color: #ff6a2e;
    --t-primary-branding-hover-color: #ff5518;
    --t-secondary-branding-color: #0a4a4e;
    --t-secondary-branding-hover-color: #0d5f64;
  }

  // Header: remove border-bottom and fix the hardcoded light shadow
  .dark .b__header__variant01 {
    border-bottom-color: transparent;
    box-shadow: none;
  }
`;

export const BrandingTheme = css`
  :root {
    // Theme colors
    --t-primary-branding-color: #ff4800;
    --t-primary-branding-hover-color: #df4204ff;
    --t-secondary-branding-color: #03272a;
    --t-secondary-branding-hover-color: #011618ff;
    // Buttons
    --t-button-padding: 0.575rem 1.7rem;
    --t-button-padding-large: 0.75rem 1.7rem;
    --t-button-padding-xlarge: 0.85rem 1.7rem;
    --t-button-border-radius: 8px;
    // Typography
    --t-heading-color: #291643;
    --t-body-color: #291643;
    --t-anchor-color: var(--t-primary-branding-color);
    --t-anchor-hover-color: var(--t-primary-branding-hover-color);
    --t-heading-line-height: 1.3;
    --t-heading-letter-spacing: 0px;
    --t-body-line-height: 1.5;
    --t-body-letter-spacing: 0px;
    --t-font-family-system:
      system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
    --t-font-family-heading:
      var(--t-font-family--outfit), var(--t-font-family-system);
    --t-font-family-body:
      var(--t-font-family--outfit), var(--t-font-family-system);
    --t-font-weight-heading: 700;
    --t-font-weight-button: 700;
    --t-font-family-button: var(--t-font-family-heading);
    /* Font sizes */
    --t-font-size-d1: 3rem;
    --t-font-size-d2: 2.5rem;
    --t-font-size-h1: 2.125rem;
    --t-font-size-h2: 1.875rem;
    --t-font-size-h3: 1.75rem;
    --t-font-size-h4: 1.4375rem;
    --t-font-size-h5: 1.25rem;
    --t-font-size-h6: 1.125rem;
    --t-font-size-subtitle: 1.125rem;
    --t-font-size-body: 1rem;
    --t-font-size-small: 0.9rem;
    @media (min-width: 992px) {
      --t-font-size-d1: 4.312rem;
      --t-font-size-d2: 3.562rem;
      --t-font-size-h1: 3rem;
      --t-font-size-h2: 2.5rem;
      --t-font-size-h3: 2.062rem;
      --t-font-size-h4: 1.75rem;
      --t-font-size-h5: 1.438rem;
      --t-font-size-h6: 1.1875rem;
      --t-font-size-subtitle: 1.125rem;
      --t-font-size-body: 1rem;
      --t-font-size-small: 0.9rem;
    }
    /* Line heights */
    --t-line-height-d1: 3.5rem;
    --t-line-height-d2: 3rem;
    --t-line-height-h1: 2.65rem;
    --t-line-height-h2: 2.375rem;
    --t-line-height-h3: 2.375rem;
    --t-line-height-h4: 2rem;
    --t-line-height-h5: 1.75rem;
    --t-line-height-h6: 1.75rem;
    --t-line-height-subtitle: 1.65rem;
    --t-line-height-body: 1.5rem;
    --t-line-height-small: 1.5rem;
    @media (min-width: 992px) {
      --t-line-height-d1: 5rem;
      --t-line-height-d2: 4.5rem;
      --t-line-height-h1: 3.5rem;
      --t-line-height-h2: 3rem;
      --t-line-height-h3: 2.75rem;
      --t-line-height-h4: 2.43rem;
      --t-line-height-h5: 2rem;
      --t-line-height-h6: 1.75rem;
      --t-line-height-subtitle: 1.65rem;
      --t-line-height-body: 1.5rem;
      --t-line-height-small: 1.5rem;
    }
    // Form
    --t-form-title-color: var(--t-primary-branding-color);
    --t-form-label-color: #25282a;
    --t-form-help-text-color: var(--t-body-color);
    --t-form-input-box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    --t-form-input-border-radius: 8px;
    --t-form-input-focus-border-color: var(--t-primary-branding-color);
    --t-form-input-focus-box-shadow: 0px 0px 0px 4px #f28d0d1f;
    --t-form-input-border-color: #d4d4d4;
    --t-form-placeholder-color: #a8a9ab;
    --t-form-select-selected-color: #f4f4f5;
    // Box shadows
    --t-box-shadow-xs: 0px 1px 2px rgba(16, 24, 40, 0.05);
    --t-box-shadow-sm:
      0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    --t-box-shadow-md:
      0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    --t-box-shadow-lg:
      0px 12px 16px -4px rgba(16, 24, 40, 0.08),
      0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    --t-box-shadow-xl:
      0px 20px 24px -4px rgba(16, 24, 40, 0.08),
      0px 8px 8px -4px rgba(16, 24, 40, 0.03);
    --t-box-shadow-2xl: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
    --t-box-shadow-3xl: 0px 32px 64px -12px rgba(16, 24, 40, 0.14);
    // Misc
    --t-border-color: #eee;
    --t-light-background-color: #fffaf7;
    --t-light-text-color: #686868;
    --t-global-card-border-radius: 16px;
    --t-global-image-border-radius: 16px;
    --t-pagination-button-color: var(--t-light-background-color);
    --t-pagination-button-hover-color: #faf5f2;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    // Header
    --t-header-glass-bg: rgba(255, 255, 255, 0.8);
    // Inverted text (e.g. white text on dark/colored backgrounds — stays light in all modes)
    --t-inverted-text-color: #ffffff;
    // Blobs
    --t-blob-color-1: var(--t-primary-branding-color);
    --t-blob-color-2: #28ffea;
    --t-blob-color-3: #2897ff;
    --t-blob-color-4: #ff28b8;
    // Palette
    --t-cp-base-white: #fff;
    --t-cp-base-black: #000;
    --t-cp-error-50: #fee4e2;
    --t-cp-error-400: #b42318;
    --t-cp-success-100: #ddffcf;
    --t-cp-success-400: #78da4e;
  }
`;
