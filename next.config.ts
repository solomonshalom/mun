import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // Add SVG support for both webpack and Turbo
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Add URL loader for SVGs when imported with ?url
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /url/,
      type: "asset",
    });

    return config;
  },
  // Enable experimental features for Turbo compatibility
  // JK we cant use turbopack it doesnt work with svgr
  // experimental: {
  //   turbo: {
  //     rules: {
  //       // Add Turbo-specific rules for SVG handling
  //       "*.svg": {
  //         loaders: ["@svgr/webpack"],
  //         as: "react",
  //       },
  //       "*.svg?url": {
  //         loaders: [],
  //         as: "url",
  //       },
  //     },
  //   },
  // },
};

export default nextConfig;
