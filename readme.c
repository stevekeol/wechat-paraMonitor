//微信开发配置信息 - 备份

/*****************************
*@1
******************************/
appId:
wxce86a2f4e5f88d02
appsecrect:
30f600b3b7eeea4db7fe993b0c89d935

/*****************************
*@2
******************************/
access_token(有效期两小时 14:15~16:15):
yDvepKEClQuHicmML8c4_PcztpijxSE54Dt5f7iUYzZ0UaOHgsSdGKq2piffS9igtdeiA7GnsYgnAwq-taiXlOQlbJTd8e3ATOOhQE0ePrV9dXB0eG2HQoD12swLctUjWQQfABAOII

/*****************************
*@3
******************************/
jsapi_ticket的获取(有效期两小时 14:15~16:15)：
'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi'

jsapi_ticket:
kgt8ON7yVITDhtdwci0qeUhByjeQGzyGw-kbYwfvrNmNi6g5GrvvAJCOUQdXbDH6sSeoZW4KYQhGrRz3TJBVTw

/*****************************
*@4
******************************/
nonceStr: 
ydy  // 必填，生成签名的随机串

 /*****************************
*@4
******************************/   
timestamp: 1497507412000


/*****************************
*@5
******************************/
时间戳生成：
var timestamp = Date.parse(new Date());
alert(timestamp);


/*****************************
*@6
******************************/
签名的生成(signature)：
参见网址：'https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign'

**************************************************************
jsapi_ticket=kgt8ON7yVITDhtdwci0qeUhByjeQGzyGw-kbYwfvrNmNi6g5GrvvAJCOUQdXbDH6sSeoZW4KYQhGrRz3TJBVTw&noncestr=ydy&timestamp=1497507412000&url=http://www.ydytech.net/scanPage

04f4aeb405aa1fdec7d948a7097328f1d10887be
**************************************************************

118.178.140.29:10000