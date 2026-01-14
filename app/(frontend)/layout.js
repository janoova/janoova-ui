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
import TawkMessenger from "@/components/wrappers/TawkMessenger";
import GTMTracker from "@/components/wrappers/GTMTracker";
import { Suspense } from "react";
import ForceRefreshLinks from "@/components/wrappers/ForceRefreshLinks";
import FontSelector from "@/components/wrappers/FontSelector";
import DynamicFontLoader from "@/components/wrappers/DynamicFontLoader";

const globalFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--t-font-family--outfit",
});

// export const metadata = {
//   verification: {
//     google: "uye_V3mht9i4rFvdCAqu_K9cviI2TozmtTHVP-aRJK4",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={globalFont.variable}>
      <body
        data-url={process.env.NEXT_PUBLIC_VERCEL_URL}
        data-prod-url={process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}
      >
        {/* <GoogleTagManager gtmId="GTM-MF983CW" /> */}
        <Suspense fallback={null}>
          <GTMTracker />
        </Suspense>
        <NextTopLoader
          color="var(--t-primary-branding-color)"
          showSpinner={false}
          height={2}
          zIndex={999999}
        />
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
        <VisualEditingControls />
        <HeadingTagsDisplay />
        <SmoothScrollHandler />
        <RouteSubmenuReset />
        <FontSelector />
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
