import "./globals.css";
import "@/styles/index.scss";
import Layout from "@/components/wrappers/Layout";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import VisualEditingControls from "@/components/wrappers/VisualEditingControls";
import NextTopLoader from "nextjs-toploader";
import { Outfit } from "next/font/google";
import HeadingTagsDisplay from "@/components/wrappers/HeadingTagsDisplay";
import SmoothScrollHandler from "@/components/wrappers/SmoothScrollHandler";
import RouteSubmenuReset from "@/components/wrappers/RouteSubmenuReset";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import GTMTracker from "@/components/wrappers/GTMTracker";
import { Suspense } from "react";
import ForceRefreshLinks from "@/components/wrappers/ForceRefreshLinks";
import FontSelectorGate from "@/components/wrappers/FontSelectorGate";
import DynamicFontLoader from "@/components/wrappers/DynamicFontLoader";
import ThemeProvider from "@/components/wrappers/ThemeProvider";
import OrganizationJsonLd from "@/components/wrappers/OrganizationJsonLd";
import { getSiteSettings } from "@/sanity/utils/queries";

const globalFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--t-font-family--outfit",
});

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const base = {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"
    ),
  };
  if (siteSettings?.disable_indexing) {
    return { ...base, robots: { index: false, follow: false } };
  }
  return base;
}

export default async function RootLayout({ children }) {
  const siteSettings = await getSiteSettings();
  const gtmId = siteSettings?.gtm_id;
  const enableTopLoader = siteSettings?.enable_top_loader;
  return (
    <html lang="en" className={globalFont.variable} suppressHydrationWarning>
      <body
        data-url={process.env.NEXT_PUBLIC_VERCEL_URL}
        data-prod-url={process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <Suspense fallback={null}>
          <GTMTracker />
        </Suspense>
        {enableTopLoader && (
          <NextTopLoader
            color="var(--t-primary-branding-color)"
            showSpinner={false}
            height={2}
            zIndex={999999}
          />
        )}
        <OrganizationJsonLd />
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <Layout>{children}</Layout>
          </ThemeProvider>
        </StyledComponentsRegistry>
        <VisualEditingControls />
        <HeadingTagsDisplay />
        <SmoothScrollHandler />
        <RouteSubmenuReset />
        <FontSelectorGate />
        <DynamicFontLoader />
        {/* <Analytics /> */}
        {/* <TawkMessenger
          propertyId="68ced175c4e82919233cb870"
          widgetId="1j5ju4d5k"
        /> */}
        {/* <ForceRefreshLinks /> */}
      </body>
    </html>
  );
}

// export const revalidate = 10;
