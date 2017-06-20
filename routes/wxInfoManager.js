var fs = require('fs');

var appID = "wxce86a2f4e5f88d02";
var appSec = "30f600b3b7eeea4db7fe993b0c89d935";
var threshold = 200*1000;  //200 seconds

var readDataFromFile = function readDataFromFile() {
    //console.log("in wxInfoManager, readDataFromFile");
    var ret = JSON.parse(fs.readFileSync('./public/wx_data.json'));
    return ret;
};

var getAccessToken = function getAccessToken(val, callback) {
    //console.log("in wxInfoManager, getAccessToken");
    var https = require('https');
    var tokenQueryStr = '/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + appSec;
    var tokenOptions = {hostname:'api.weixin.qq.com', path:tokenQueryStr, method: 'GET'};

    var timeNow = new Date().getTime();
    https.get(tokenOptions, function(response) {
        response.on('data', function (d1) {
            //console.log("return from token function:");
            var buf1 = new Buffer(d1, 'utf8');
            var tokenJson = JSON.parse(buf1.toString());
            if (tokenJson.access_token != null) {
                val.token_last_access_time = timeNow;
                val.access_token = tokenJson.access_token;
                val.token_expires_in = tokenJson.expires_in;
                //console.log("write token into file, wxData=");
                //console.log(val);
                fs.writeFileSync('./public/wx_data.json', JSON.stringify(val), 'utf8');
                callback(null,  val);
            }
        })
    });
};

var getTicket = function getTicket(val, callback) {
    //console.log("in wxInfoManager, getTicket");
    var https = require('https');
    var ticketQueryStr = '/cgi-bin/ticket/getticket?access_token=' + val.access_token +'&type=jsapi';
    var ticketOptions = {hostname:'api.weixin.qq.com', path:ticketQueryStr, method: 'GET'};

    var timeNow = new Date().getTime();
    https.get(ticketOptions, function(response){
        response.on('data', function(d2){
        //console.log("return from ticket function:");
        var buf2 = new Buffer(d2,'utf8');
        var  ticketJson = JSON.parse(buf2.toString());
        if(ticketJson.errcode == 0) {
            val.ticket_last_access_time = timeNow;
            val.ticket = ticketJson.ticket;
            val.ticket_expires_in = ticketJson.expires_in;
            //console.log("write ticket into file, val=");
            //console.log(val);
            fs.writeFileSync('./public/wx_data.json', JSON.stringify(val),'utf8');
            callback(null,  val);
         }
        })
    });
};

//deprecated
/*var getData = function getWXData() {
    var ret = {};
    var data = JSON.parse(fs.readFileSync('./public/wx_data.json'));
    ret.access_token = data.access_token;
    ret.ticket = data.ticket;
    ret.last_access_time = data.last_access_time;
    ret.expires_in = data.expires_in;

    console.log("In getWXData(), ret: ");
    console.log(ret);

    var timeNow = new Date().getTime();
    var t1 = ret.last_access_time + ret.expires_in*1000 - threshold;
    console.log("timeNow="+timeNow + ", expireTime=" +t1 );
    if(timeNow <= ret.last_access_time + ret.expires_in*1000 - threshold ) {
        //Need not update WXData
        console.log("In getWXData(), Need not update WXData");
        return ret;
    } else {
        // Need update WXData
        console.log("In getWXData(), Need update WXData");
        var https = require('https');
        var tokenQueryStr = '/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + appSec;
        var tokenOptions = {hostname:'api.weixin.qq.com', path:tokenQueryStr, method: 'GET'};
        https.get(tokenOptions, function(response){
            response.on('data', function(d1){
                console.log("return from token function:");
                var buf1 = new Buffer(d1,'utf8');
                console.log("buf1 toString:");
                console.log(buf1.toString());

                var  tokenJson = JSON.parse(buf1.toString());
                if(tokenJson.access_token != null) {
                    ret.last_access_time = timeNow;
                    ret.access_token = tokenJson.access_token;
                    ret.expires_in = tokenJson.expires_in;
                    console.log("write token into file, ret=");
                    console.log(ret);
                    fs.writeFileSync('./public/wx_data.json', JSON.stringify(ret),'utf8');

                    var ticketQueryStr = '/cgi-bin/ticket/getticket?access_token=' + tokenJson.access_token +'&type=jsapi';
                    var ticketOptions = {hostname:'api.weixin.qq.com', path:ticketQueryStr, method: 'GET'};
                    https.get(ticketOptions, function(response){
                        response.on('data', function(d2){
                            console.log("return from ticket function:");
                            var buf2 = new Buffer(d2,'utf8');
                            console.log("buf2 toString:");
                            console.log(buf2.toString());

                            var  ticketJson = JSON.parse(buf2.toString());
                            if(ticketJson.errcode == 0) {
                                ret.ticket = ticketJson.ticket;
                                console.log("write ticket into file, ret=");
                                console.log(ret);
                                fs.writeFileSync('./public/wx_data.json', JSON.stringify(ret),'utf8');
                            }
                        });
                    });
                }
            });
        });
        return ret;
    }

    return ret;
};*/

module.exports.readDataFromFile = readDataFromFile;
module.exports.getAccessToken = getAccessToken;
module.exports.getTicket = getTicket;