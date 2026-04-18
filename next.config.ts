import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    proxyClientMaxBodySize: "20mb",
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
