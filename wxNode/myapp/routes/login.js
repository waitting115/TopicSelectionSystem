var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;//首先创建mongoClient对象
var url = 'mongodb://localhost:27017';//配置指定的url和端口号
// var database = require('../database/user');

router.get('/', function (req,result,next) {//！！！/
    //接收用户输入信息-->调用数据库-->对比信息-->返回结果
    // console.log(req.query);
    // let user = req.query.user;//str
    // let password = req.query.password;//str
    let findobj = {'user': req.query.user,'password': req.query.password};

    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if(err) throw err;
        var dbase = db.db('topicSelection');
        dbase.collection('user').find(findobj).toArray(function(err, res) {
            if(err) throw err;
            console.log(res);
            if(res.length === 0) {//没找到
                result.send(false)
            } else {//找到了
                result.send(true)
            }
        })
    })
//     let obj = {
//         findobj: {'user': user, 'password': password}
//     }
//     console.log(obj.findobj)
//  // var findobj = {"name":'菜鸟教程'};//{}为查询全部  即*
//     database.database('user','find',obj)
//     console.log(database.findMsg);
//     if(database.findMsg === undefined){
//         res.send(false)
//     } else {
//         res.send(true)
//     }
})

module.exports = router;

