import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    // In local dev, Strapi runs on localhost (a private/loopback IP). Next.js's
    // image optimisation proxy blocks requests to private IPs as an SSRF guard,
    // so we bypass optimisation entirely in dev and serve images directly.
    // In production the Strapi URL is a public Railway hostname, so optimisation
    // is enabled and `remotePatterns` is used normally.
    unoptimized: isDev,
    remotePatterns: [
      // Strapi on Railway (production)
      {
        protocol: "https",
        hostname: "**.up.railway.app",
        pathname: "/uploads/**",
      },
      // Strapi local dev — kept so TypeScript types resolve correctly
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
