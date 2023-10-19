//@ts-check
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";
import createMdnConfig from "@next/mdx";

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const withMDX = createMdnConfig({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  compiler: {
    emotion: true,
  },
  experimental: {
    mdxRs: true,
  },
};

export default withBundleAnalyzer(withVanillaExtract(withMDX(nextConfig)));
