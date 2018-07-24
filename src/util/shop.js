/*
* @Author: 56513
* @Date:   2018-07-20 17:49:37
* @Last Modified by:   56513
* @Last Modified time: 2018-07-23 13:23:17
*/
var Hg = require('hogan.js'); 	
var conf = {
	serverHost: ''
};
 var _shop = {
 	//网络请求
 	request: function(param) {
 		var _this = this;
 		$.ajax({
 			type: param.method || 'get',
 			url: param.url || "",
 			dataTypr :param.type || 'json',
 			data: param.data ||'',
 			success: function(res) {
 				//成功
 				if(0 === res.status){
 					typeof param.success === 'function' && param.success(res.data,res.msg);
 				}
 				//没有登录状态
 				else if(10 ===res.status){
 					_this.doLogin();
 				}
 				//请求数据错误
 				else if(1 ===res.status){
 					typeof param.error === 'function' && param.error(res.msg);
 				}
 			},
 			error: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);

 			}
 		});
 	},
 	//获取服务器地址
 	getServerUrl: function(path) {
 		return conf.serverHost + path;
 	},
 	//获取url参数
 	getUrlParam: function(name) {
 		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
 		var result = window.location.search.substr(1).match(reg);
 		return result ? decodeURIComponent(result[2]) : null;
 	},
 	//渲染html模板
 	renderHtml: function(htmlTemplate,data) {
 		var template = Hg.compile(htmlTemplate),
 			result = template.render(data);
 			return result;
 	},
 	//成功提示
 	successTips: function(msg) {
 		alert(msg || '操作成功！');
 	},
 	errorTips: function(msg) {
 		alert(msg || '哪里不对了！');
 	},
 	//字段验证，支持是否为空、手机、邮箱
 	validate: function(value,type) {
 		var value = $.trim(value);
 		//非空验证
 		if('require' === type){
 			return !!value;
 		}
 		//手机号验证
 		if('phone' === type){
 			return /^1\d{10}$/.test(value);
 		}
 		//邮箱验证
 		if('email' === type){
 			return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(value);
 		}
 	},
 	//统一登录验证
 	doLogin: function() {
 		window.location.href = './user-login.html?redirect=' +encodeURIComponent(window.location.href);
 	},
 	//返回主页
 	goHome: function() {
 		window.location.href = './index.html'
 	}
 };

 module.exports = _shop;