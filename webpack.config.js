/*
* @Author: liuhaobo
* @Date:   2018-07-20 12:06:23
* @Last Modified by:   56513
* @Last Modified time: 2018-07-23 12:56:23
*/

var webpack = require("webpack");
var Ex = require("extract-text-webpack-plugin");
var Hw = require("html-webpack-plugin")

//环境变量的配置，dev、online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev' 

var getHtmlConfig = function(name,title) {
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		title: title,
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
		'result':['./src/page/result/index.js'],
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
			{
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            },

		]
	},
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image'
		}
	},
	plugins: [
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		// 把css单独打包到文件里
		new Ex("css/[name].css"),
		// html模板的处理
		new Hw(getHtmlConfig('index','首页')),
		new Hw(getHtmlConfig('result', '操作结果')),

	]
};
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;

