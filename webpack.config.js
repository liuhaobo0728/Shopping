/*
* @Author: liuhaobo
* @Date:   2018-07-20 12:06:23
* @Last Modified by:   56513
* @Last Modified time: 2018-07-20 17:16:24
*/

var webpack = require("webpack");
var Ex = require("extract-text-webpack-plugin");
var Hw = require("html-webpack-plugin")

//环境变量的配置，dev、online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev' 

var getHtmlConfig = function(name) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		inject: true,
		hash: true,
		chunks: ['common',name]
	}
}
var config = {
	entry: {
		'index':['./src/page/index/index.js'],
		'login':['./src/page/login/index.js'],
		'common':['./src/page/common/index.js'],
	},
	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: Ex.extract("style-loader","css-loader")},
			{ test: /\.(gif|png|jpg|eot|woff|svg|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]"},

		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		new Ex("css/[name].css"),
		new Hw(getHtmlConfig('index')),
		new Hw(getHtmlConfig('login')),

	]
};
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;

