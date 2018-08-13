// 导包
const MongoClient = require('mongodb').MongoClient;

// 地址
// const url = 'mongodb://localhost:27017';
const url = 'mongodb://127.0.0.1:27017';

// 库
const dbName = 'managerDB';



module.exports = {
    // 查询的功能
    find(collectionName, obj, callback) {
        MongoClient.connect(url, function (err, client) {
            // 选择使用库
            const db = client.db(dbName);
            // 查找数据
            db.collection(collectionName).find(obj).toArray((err, result) => {
                if (err) throw err;
                // 关闭
                client.close();
                callback(result);
            })
        });
    },
    // 插入数据
    insertOne(collectionName, obj, callback) {
        MongoClient.connect(url, function (err, client) {
            // 选择使用库
            const db = client.db(dbName);
            // 查找数据
            db.collection(collectionName).insertOne(obj,(err,result)=>{
                if(err) throw err;
                // 关闭数据库
                client.close();
                callback(result.result);
            })
        });
    },
    // 提示加跳转
    tips(res,message,url){
        res.send(`<script> alert('${message}'); window.location='${url}'; </script>`);
    }
}