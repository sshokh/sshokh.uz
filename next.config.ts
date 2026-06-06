import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@heroui/react", "@gravity-ui/icons"],
  },
};

export default nextConfig;
