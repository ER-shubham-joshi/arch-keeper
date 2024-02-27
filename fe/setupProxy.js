// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'http://localhost:3001', // Change this to your backend server URL
            changeOrigin: true,
        })
    );
};
