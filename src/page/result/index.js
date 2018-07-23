/*
* @Author: 56513
* @Date:   2018-07-23 12:53:20
* @Last Modified by:   56513
* @Last Modified time: 2018-07-23 13:02:10
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _shop = require('util/shop.js');

$(function(){
    var type        = _shop.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _shop.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})