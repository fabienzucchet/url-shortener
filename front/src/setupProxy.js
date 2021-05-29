const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://url-shortener_api_1:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': '/',
            },
        })
    );
};
