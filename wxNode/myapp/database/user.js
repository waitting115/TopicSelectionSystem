var mongoClient = require('mongodb').MongoClient;//首先创建mongoClient对象
var url = 'mongodb://localhost:27017';//配置指定的url和端口号

let findMsg = ''

function database (connection, handle, obj) {
    //connection: user goods
    //handle : 'create'  'insert' 'find' 'update' 'delete' 'sort' 'drop'
    //obj: myinsert findobj whereStrUpdate updateStr whereStrDelete mysort
    //创建连接
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        // console.log('数据库已创建');
        var dbase = db.db("topicSelection");//名为runoob 的数据库

        if(handle === 'create') {
            //创建集合
            // var collectionName = obj.collectionName;
            dbase.createCollection(connection, function (err, res) {
                if (err) throw err;
                console.log('集合已创建');
                console.log(res.namespace)
            })
        } else if ( handle === 'insert') {
            //插入数据
            // var myinsert = [
            //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
            //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
            //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
            // ];
            var myinsert = obj.myinsert;
            dbase.collection(connection).insertMany(myinsert, function (err, res) {
                if (err) throw err;
                console.log('文档插入成功');
                console.log('插入文档数量为：', res.insertedCount);
            })
        } else if (handle === 'find') {
            //查询数据
            // var findobj = {"name":'菜鸟教程'};//{}为查询全部  即*
            var findobj = obj.findobj;
            dbase.collection(connection).find(findobj).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                findMsg = res;
            })
        } else if (handle === 'update') {//默认更新多条数据
            //更新数据(updateOne,updateMany)
            // var whereStr = {"name": '菜鸟教程'};//条件
            // var updateStr = {$set: {"url" : "https://www.runoob.com"}};
            var whereStrUpdate = obj.whereStrUpdate;
            var updateStr = obj.updateStr;
            dbase.collection(connection).updateMany(whereStrUpdate, updateStr, function(err, res) {
                if (err) throw err;
                console.log('更新文档成功');
                console.log(res.result.nModified + '条文档被更新');
            })
        } else if (handle === 'delete') {
            //删除数据
            // var whereStrDelete = { "name" : "菜鸟教程"};
            var whereStrDelete = obj.whereStrDelete;
            dbase.collection(connection).deleteMany(whereStrDelete, function(err, res) {
                if (err) throw err;
                console.log('删除数据成功');
                console.log(res.result.n + '条文档被删除');
            })
        } else if (handle === 'sort') {
            //排序
            // var mysort = { type: 1};//按type 1升序；-1降序
            var mysort = obj.mysort;
            dbase.collection(connection).find().skip(2).limit(2).sort(mysort).toArray(function (err, res) {//skip(2)跳过前面两条数据；limit(2)指定返回2条
                if (err) throw err;
                console.log(res);
            })
        } else if (handle === 'drop') {
            //删除集合
            dbase.collection(connection).drop(function (err, deletOK) {//执行成功返回true，失败返回false
                if(err) throw err;
                if(deletOK) console.log('集合已删除');
            })
        }
    });
}

module.exports.database = database;
module.exports.findMsg = findMsg;