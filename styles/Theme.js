import { css } from "styled-components";
import { BrandingTheme, DarkTheme } from "@/workspace/theme";

export { DarkTheme };

const WireframingTheme = css`
  :root {
    // Theme colors
    --t-primary-branding-color: rgb(0, 0, 0);
    --t-primary-branding-hover-color: rgb(50, 50, 50);
    --t-secondary-branding-color: #333;
    --t-secondary-branding-hover-color: #555;
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
    --t-form-input-focus-box-shadow: 0px 0px 0px 4px #780df21f;
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
    --t-light-background-color: #f6f6f6;
    --t-light-text-color: #686868;
    --t-global-card-border-radius: 16px;
    --t-global-image-border-radius: 16px;
    --t-pagination-button-color: var(--t-light-background-color);
    --t-pagination-button-hover-color: #f5f1f9;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
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

// Starter Theme Overrides — default (light) and dark per starter
const starterThemes = {
  manufacturing: {
    default: css`
      :root {
        --t-primary-branding-color: #a64019;
        --t-primary-branding-hover-color: #843012;
        --t-secondary-branding-color: #243f50;
        --t-secondary-branding-hover-color: #182c39;
        --t-border-color: #e1e3e4;
        --t-light-background-color: #f5f5f2;
        --t-font-family-heading: var(--t-font-family--outfit), var(--t-font-family-system);
        --t-font-family-body: var(--t-font-family--outfit), var(--t-font-family-system);
        --t-font-weight-heading: 700;
      }
    `,
    dark: css`
      :root.dark {
        --t-primary-branding-color: #a64019;
        --t-primary-branding-hover-color: #843012;
        --t-secondary-branding-color: #243f50;
        --t-secondary-branding-hover-color: #182c39;
        --t-border-color: #293b48;
        --t-light-background-color: #142632;
      }
    `,
  },
  plumbing: {
    default: css`
      :root {
        --t-primary-branding-color: #0756a3;
        --t-primary-branding-hover-color: #03417e;
        --t-secondary-branding-color: #b9470b;
        --t-secondary-branding-hover-color: #963707;
        --t-border-color: #dbe6ee;
        --t-light-background-color: #f0f7fc;
        --t-font-family-heading: var(--t-font-family--outfit), var(--t-font-family-system);
        --t-font-family-body: var(--t-font-family--outfit), var(--t-font-family-system);
        --t-font-weight-heading: 800;
      }
    `,
    dark: css`
      :root.dark {
        --t-primary-branding-color: #0756a3;
        --t-primary-branding-hover-color: #03417e;
        --t-secondary-branding-color: #b9470b;
        --t-secondary-branding-hover-color: #963707;
        --t-border-color: #28445c;
        --t-light-background-color: #122b40;
      }
    `,
  },
  law: {
    default: css`
      :root {
        --t-primary-branding-color: #203e42;
        --t-primary-branding-hover-color: #152a2dff;
        --t-secondary-branding-color: #744210;
        --t-secondary-branding-hover-color: #975a16;
        --t-border-color: #eee;
        --t-light-background-color: #fffaf7;
        --t-font-family-heading:
          var(--t-font-family--lora), var(--t-font-family-system);
        --t-font-family-body:
          var(--t-font-family--lora), var(--t-font-family-system);
        --t-font-weight-heading: 400;
      }
    `,
    dark: css`
      .dark {
        --t-primary-branding-color: #4a9da8;
        --t-primary-branding-hover-color: #5bb8c4;
        --t-secondary-branding-color: #c48a3a;
        --t-secondary-branding-hover-color: #d9a04f;
        --t-light-background-color: #0f1e20;
      }
    `,
  },
  medical: {
    default: css`
      :root {
        --t-primary-branding-color: #0369a1;
        --t-primary-branding-hover-color: #0284c7;
        --t-secondary-branding-color: #059669;
        --t-secondary-branding-hover-color: #10b981;
        --t-heading-color: #1e293b;
        --t-body-color: #334155;
        --t-light-background-color: #f0f9ff;
        --t-blob-color-1: #0369a1;
        --t-blob-color-2: #06b6d4;
        --t-blob-color-3: #059669;
        --t-blob-color-4: #8b5cf6;
      }
    `,
    dark: css`
      .dark {
        --t-primary-branding-color: #38bdf8;
        --t-primary-branding-hover-color: #7dd3fc;
        --t-secondary-branding-color: #34d399;
        --t-secondary-branding-hover-color: #6ee7b7;
        --t-light-background-color: #0c1a27;
      }
    `,
  },
  restaurant: {
    default: css`
      :root {
        --t-primary-branding-color: #dc2626;
        --t-primary-branding-hover-color: #ef4444;
        --t-secondary-branding-color: #ea580c;
        --t-secondary-branding-hover-color: #f97316;
        --t-heading-color: #18181b;
        --t-body-color: #27272a;
        --t-light-background-color: #fef2f2;
        --t-blob-color-1: #dc2626;
        --t-blob-color-2: #ea580c;
        --t-blob-color-3: #f59e0b;
        --t-blob-color-4: #eab308;
      }
    `,
    dark: css`
      .dark {
        --t-primary-branding-color: #f87171;
        --t-primary-branding-hover-color: #fca5a5;
        --t-secondary-branding-color: #fb923c;
        --t-secondary-branding-hover-color: #fdba74;
        --t-light-background-color: #1c0a0a;
      }
    `,
  },
  // Add more starter themes here...
};

// Reuse the plumbing branding for the photo-based starter.
starterThemes["plumbing-2"] = starterThemes.plumbing;

// Get the active starter slug from the URL pathname
const getActiveStarterSlug = () => {
  if (typeof window === "undefined") return null;
  const match = window.location.pathname.match(/\/starters\/([^\/]+)/);
  return match?.[1] ?? null;
};

// Check for default theme query param
const hasDefaultTheme =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("default_theme");

// Build the theme
const buildTheme = () => {
  if (hasDefaultTheme) {
    return WireframingTheme;
  }

  const starterSlug = getActiveStarterSlug();
  const starter = starterSlug ? starterThemes[starterSlug] : null;

  if (starter) {
    return css`
      ${BrandingTheme}
      ${starter.default}
      ${starter.dark}
    `;
  }

  return BrandingTheme;
};

const Theme = buildTheme();

export default Theme;
