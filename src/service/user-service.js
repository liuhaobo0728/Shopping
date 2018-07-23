/*
* @Author: 56513
* @Date:   2018-07-23 11:55:05
* @Last Modified by:   56513
* @Last Modified time: 2018-07-23 12:10:26
*/
var _shop = require('util/shop.js');
var _user = {

//检查登录状态
checkLogin: function(resolve, reject){
        _shop.request({
            url     : _shop.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
//退出
logout: function(resolve, reject){
        _shop.request({
            url     : _shop.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;