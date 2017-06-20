/**
 * Created by stevekeol on 2017/06/15.
 */

//取11位随机数
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

//精确到秒（截断毫秒）
var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

var sign = function (jsapi_ticket, url) {
    var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    };
    var content = raw(ret);

    var crypto = require('crypto');
    var shaSum = crypto.createHash('sha1');
    shaSum.update(content);
    ret.signature = shaSum.digest('hex');

    //console.log(ret);
    return ret;
};

module.exports = sign;