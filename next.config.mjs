//@ts-check

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: "ts-loader"
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    config.plugins.push(
      new BundleAnalyzerPlugin()
    )
    return config;
  },
};

export default nextConfig;
