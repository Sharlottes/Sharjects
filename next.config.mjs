//@ts-check
import mdnConfig from "@next/mdx";

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

export default withMDX(nextConfig);
