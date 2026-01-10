/** @type {import('next').NextConfig} */

import redirects from "./redirects.mjs";

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

export default nextConfig;
