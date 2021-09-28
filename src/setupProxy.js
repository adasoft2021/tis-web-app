const { createProxyMiddleware } = require('http-proxy-middleware')
const { API_URL, BASE_API } = require('./config/environment')

module.exports = function (app) {
	app.use(
		BASE_API,
		createProxyMiddleware({
			target: API_URL,
			changeOrigin: true,
		})
	)
}
