/** @type {import('next').NextConfig} */

import redirects from "./redirects.mjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  productionBrowserSourceMaps: true,
  async redirects() {
    return redirects;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@sanity/icons",
      "motion",
      "framer-motion",
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
