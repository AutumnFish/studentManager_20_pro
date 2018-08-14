// 导入express
const express = require('express');
// 导入body-parser 中间件(包)
const bodyParser = require('body-parser')
// 导入 express-session中间件(包)
const session = require('express-session')

// 引入自己的路由
// 管理员相关路由
const managerRouter = require('./route/managerRouter');
// 学员相关路由
const studentRouter = require('./route/studentRouter');

// 实例化 app
let app = express();

// 使用 bodyParse中间件 格式化 表单数据
// 自动格式化数据 在 req这个对象上 增加 .body 属性 把数据保存进去
app.use(bodyParser.urlencoded({ extended: false }))

// 相信第一次请求
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
}))

// 托管静态资源
app.use(express.static('static'));

// 使用自己写的路由容器
// 管理相关路由
app.use('/manager',managerRouter);
// 学员相关路由
app.use('/student',studentRouter);

// 开启监听
app.listen(8080,()=>{
    console.log('success');
})