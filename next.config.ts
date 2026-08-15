import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@gravity-ui/icons"],
  },
};

export default nextConfig;
