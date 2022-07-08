const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://koreanbots.dev/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;