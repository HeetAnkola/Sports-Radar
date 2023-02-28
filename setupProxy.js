const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.sportradar.us/nhl/trial/v7/en',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
