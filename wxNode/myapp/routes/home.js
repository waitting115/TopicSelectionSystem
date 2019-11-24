var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;//首先创建mongoClient对象
var url = 'mongodb://localhost:27017';//配置指定的url和端口号

router.get('/', function(req, res, next) {
    //查询数据库中的questionBank集合，返回所有数据
    //1
    res.send();
  });
module.exports = router;