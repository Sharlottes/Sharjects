//@ts-check
//TODO - 대소문자 rewrite route

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
    appDir: true,
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
