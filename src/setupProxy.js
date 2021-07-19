// const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'https://way.jd.com/',
      changeOrigin: true,
      pathReWrite: {
        '^/api': ''
      }
    })
  )
}
