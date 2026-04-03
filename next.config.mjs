/** @type {import('next').NextConfig} */

import redirects from "./redirects.mjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  async redirects() {
    return redirects;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.sanity.io", "ik.imagekit.io"],
  },
};

export default withBundleAnalyzer(nextConfig);
