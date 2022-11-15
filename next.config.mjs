//@ts-check

/**
 * @type {import('next').NextConfig}
 */
//TODO - 대소문자 rewrite route
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  webpack(config) {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.tsx?$/,
      use: "ts-loader"
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  compiler: {
    styledComponents: true,
    emotion: true
  }
};

export default nextConfig;
