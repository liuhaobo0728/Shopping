/*
* @Author: liuhaobo
* @Date:   2018-07-20 12:06:23
* @Last Modified by:   56513
* @Last Modified time: 2018-07-24 11:55:39
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
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'payment'           : ['./src/page/payment/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js'],
        'about'             : ['./src/page/about/index.js'],
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
       	new Hw(getHtmlConfig('index', '首页')),
	    new Hw(getHtmlConfig('list', '商品列表')),
	    new Hw(getHtmlConfig('detail', '商品详情')),
	    new Hw(getHtmlConfig('cart', '购物车')),
	    new Hw(getHtmlConfig('order-confirm', '订单确认')),
	    new Hw(getHtmlConfig('order-list', '订单列表')),
	    new Hw(getHtmlConfig('order-detail', '订单详情')),
	    new Hw(getHtmlConfig('payment', '订单支付')),
	    new Hw(getHtmlConfig('user-login', '用户登录')),
	    new Hw(getHtmlConfig('user-register', '用户注册')),
	    new Hw(getHtmlConfig('user-pass-reset', '找回密码')),
	    new Hw(getHtmlConfig('user-center', '个人中心')),
	    new Hw(getHtmlConfig('user-center-update', '修改个人信息')),
	    new Hw(getHtmlConfig('user-pass-update', '修改密码')),
	    new Hw(getHtmlConfig('result', '操作结果')),
	    new Hw(getHtmlConfig('about', '关于网站')),

	]
};
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;

