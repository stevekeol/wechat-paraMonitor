var fs = require('fs');
var async = require('async');
var signWX = require('./wxSign.js');

var WXData = null;  //cache weixin data, json
var WxExpireSoft = 200*1000;   // 200 seconds
var appId = "wxce86a2f4e5f88d02";

function getConfig(req, callback) {
	var timeNow = new Date().getTime();
    if(WXData != null && timeNow <= WXData.ticket_last_access_time + WXData.ticket_expires_in*1000 - WxExpireSoft ) {
        // Go to addDevice page directly
        console.log("Go to addDevice page directly.  "+new Date().toLocaleString());
        // var wxUrl = req.protocol + "://" + req.headers.host  + req.originalUrl;
        var wxUrl = "http://" + req.headers.host  + req.originalUrl;

        var jsApiTicket = WXData.ticket;
        var cfg = signWX(jsApiTicket, wxUrl);
        cfg.appId = appId;
        callback(cfg);
    } else {
        // sync functions: 1. readDataFromFile, 2.getAccessToken, 3.getTicket
        var updateToken = false;
        var updateTicket = false;
        var wxManager  = require('./wxInfoManager.js');
        async.waterfall([function(cb){
                console.log("1: readDataFromFile");
                var data = wxManager.readDataFromFile();
                if(WXData == null) {
                    WXData = {};
                }
                WXData.access_token = data.access_token;
                WXData.token_last_access_time = data.token_last_access_time;
                WXData.token_expires_in = data.token_expires_in;
                WXData.ticket = data.ticket;
                WXData.ticket_last_access_time = data.ticket_last_access_time;
                WXData.ticket_expires_in = data.ticket_expires_in;
                cb(null,  WXData);
            },
                function(result, cb){
                    var timeNow = new Date().getTime();
                    if(timeNow > WXData.token_last_access_time + WXData.token_expires_in*1000 - WxExpireSoft ) {
                        updateToken = true;
                        console.log("2: getAccessToken");
                        wxManager.getAccessToken(result, cb);
                    } else {
                        cb(null,  WXData);
                    }
                },
                function(result, cb){
                    if(updateToken) {
                        WXData.access_token = result.access_token;
                        WXData.token_last_access_time = result.token_last_access_time;
                        WXData.token_expires_in = result.token_expires_in;
                    }
                    var timeNow = new Date().getTime();
                    if(timeNow > WXData.ticket_last_access_time + WXData.ticket_expires_in*1000 - WxExpireSoft ) {
                        updateTicket = true;
                        console.log("3: getTicket");
                        wxManager.getTicket(result, cb);
                    } else {
                        cb(null,  WXData);
                    }
                }],
            function(err, result){
                if(updateTicket) {
                    WXData.ticket = result.ticket;
                    WXData.ticket_last_access_time = result.ticket_last_access_time;
                    WXData.ticket_expires_in = result.ticket_expires_in;
                }
                // var wxUrl = req.protocol + "://" + req.headers.host  + req.originalUrl;
                var wxUrl = "http://" + req.headers.host  + req.originalUrl;
                var jsApiTicket = WXData.ticket;
                var cfg = signWX(jsApiTicket, wxUrl);
                cfg.appId = appId;
                callback(cfg);
            });
    }
}

module.exports.getConfig = getConfig;
