//@ts-check
import mdnConfig from "@next/mdx";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

const withMDX = mdnConfig({
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

export default withVanillaExtract(withMDX(nextConfig));
