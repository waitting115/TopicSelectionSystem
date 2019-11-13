var http = require('http');
var Request = require('request');//需要安装
var fs = require('fs');
var url = require('url');
// var querystring = require('querystring');//用来将string转为json
var login = require('./login');
var response = require('response');//需要安装
var JSON = require('json');

var dbMsg = {//将要存入数据库的数据 
    
}
// var session_key = '';

function startserver() {
    var onRequest = function(request, response) {
        var aRes = response;
        console.log('Request recieved');
        

        var data = "";//用于保存传过来的值
        request.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            if(request.method === 'GET') {//GET
                if(request.length > 1e6) {
                    request.connection.destory();//不接收
                }
                console.log('POST接收到的数据：', data);
                let msg = JSON.parseLookup(data);//解析数据
                dbMsg.user = msg.user;//保存数据
                dbMsg.pass = msg.pass;
                console.log('dbMsg:', dbMsg);
            }
            //  else if (request.method === 'GET') {//GET
            //     var params = url.parse(request.url, true).query;
            //     console.log('GET接收到的数据: ',params);
            //     // login.wxLogin(request, response, querystring.parse(data));//先不用login.js模块
                
            //     //用接收到的信息到微信接口换取
            //     Request.get({
            //         uri: `https://api.weixin.qq.com/sns/jscode2session`,
            //         json: true,
            //         qs: {
            //             grant_type: 'authorization_code',
            //             appid: params.appid,
            //             secret: params.secret,
            //             js_code: params.code
            //         }
            //     }, (err, response, data) => {
            //         if(response.statusCode === 200) {
            //             // response.json({openid: data.openid, session_key: data.session_key});
            //             console.log('接收到openID等数据:',data);//接收到了openID和session_ley
            //             userSqlMsg.openid = data.openid;
            //             session_key = data.session_key;
            //             aRes.end('返回数据成功');//返回数据成功，但是返回的是字符串，不是json
            //         } else {
            //             console.log('[error]', err);
            //             // response.json(err);
            //         }
            //     })

            // }
        })
        // response.write('a')//向小程序返回数据
    }
    var server = http.createServer(onRequest);//创建服务器

    server.listen(2000, '127.0.0.1');//监听127.0.0.1::3000端口
    console.log('Server start on localhost port 2000');
}

module.exports.startserver = startserver;
module.exports.dbMsg = dbMsg;
