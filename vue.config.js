const path = require('path');
module.exports = {
	publicPath: "./",
	// assetsDir:"./",
	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableInSFC: true
		},
	},
	productionSourceMap: false,
	devServer: {
		contentBase: path.join(__dirname, 'public'),
	},
}