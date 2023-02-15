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
  webpack(config) {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.tsx?$/,
      use: "ts-loader",
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  compiler: {
    styledComponents: true,
    emotion: true,
  },
};

export default withMDX(nextConfig);
