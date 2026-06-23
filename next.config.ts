import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Strapi on Railway (production)
      {
        protocol: "https",
        hostname: "*.up.railway.app",
        pathname: "/uploads/**",
      },
      // Strapi local dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
