// 导入express
const express = require('express');

// 实例化 app
let app = express();

// 托管静态资源
app.use(express.static('static'));

// 开启监听
app.listen(8080,()=>{
    console.log('success');
})