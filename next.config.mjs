//@ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
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
    return config;
  },
  compiler: {
    styledComponents: true,
    emotion: true
  }
};

export default nextConfig;
