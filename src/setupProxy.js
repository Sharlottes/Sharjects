import { proxy } from 'http-proxy-middleware';
module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'https://koreanbots.dev/api/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }),
  );
};