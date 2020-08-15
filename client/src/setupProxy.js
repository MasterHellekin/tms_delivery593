const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      secure: false,
      changeOrigin: true,
    })
  );
  // app.use(
  //   createProxyMiddleware("/v1", {
  //     target: "https://us1.locationiq.com",
  //     secure: false,
  //     changeOrigin: true,
  //   })
  // );
};
