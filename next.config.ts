import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the local network load the dev server.
  allowedDevOrigins: ["192.168.2.50"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
