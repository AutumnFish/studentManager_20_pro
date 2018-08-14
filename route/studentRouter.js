// 导入express
const express = require('express');
// 导入自己封装的工具函数
const helper = require('../tools/helper');
// 导入art-template
const template = require('art-template');
// 导入path
const path = require('path');
// 获取路由对象 
let router = express.Router();

// 注册自定义的中间件 监控 请求
router.use(function (req, res, next) {
    console.log(req.url);
    // 哪些页面需要判断是否登陆
    if (req.url != '/logout') {
        // 登陆判断
        if (!req.session.userName) {
            // 没有登陆
            helper.tips(res, '哥们先登录', '/manager/login');
        } else {
            // 登录了
            next();
        }
    } else {
        // 登出页面
        next();
    }

    // next();
})

// 注册路由
// 查询数据 使用模板引擎 返回渲染好的页面
router.get('/index', (req, res) => {
    console.log(req);
    // 查询的条件
    let obj = {};
    // 哪怕没有数据 query也是一个空对象
    if (req.query.search) {
        // 模糊搜索
        // 添加条件 
        // 模糊查询
        obj = {
            userName: {
                $regex: req.query.search
            }
        }
    } else {
        // 全部搜索
    }
    // 读取首页 渲染数据
    helper.find('student', obj, (result) => {
        // // 填充模板
        var html = template(path.join(__dirname, '../template/index.html'), {
            userName: req.session.userName,
            result,
            keyword: req.query.search //  有值 就是传递的值 没有值 就是 undefined
        });
        res.send(html);

        // res.send(result);
    })

})

// 注册路由 登出
// 删除session中的userName(标记变量)
router.get('/logout', (req, res) => {
    // 删除登陆的标记
    // req.session.userName =undefined;
    delete req.session.userName;
    // 打回登录页
    res.redirect('/manager/login');
})

// 直接渲染新增页
// 模板引擎 渲染新增页
router.get('/insert', (req, res) => {
    // 模板引擎渲染
    var html = template(path.join(__dirname, '../template/add.html'), {
        userName: req.session.userName
    });
    res.send(html);
})

// 新增数据的路由
// 接收数据 保存数据 跳转页面
router.post('/insert', (req, res) => {
    // res.send(req.body);

    // 保存到数据库
    helper.insertOne('student', req.body, (result) => {
        // res.send(result);
        if (result.n == 1) {
            helper.tips(res, '新增成功啦', '/student/index');
        } else {
            // 失败
        }
    })
})

// 删除的路由
// 接收数据 删除数据 返回首页
router.get('/delete/:id', (req, res) => {
    // res.send(req.params);
    let _id = req.params.id;
    helper.deleteOne('student', {
        _id: helper.ObjectId(_id)
    }, (result) => {
        // res.send(result);
        if (result.n == 1) {
            helper.tips(res, '删除成功', '/student/index');
        }
    })

})

// 编辑路由
// 进入编辑状态
router.get('/edit/:id', (req, res) => {
    // 接收id
    let _id = req.params.id;
    // 根据id查询数据
    helper.find('student', {
        _id: helper.ObjectId(_id)
    }, (result) => {
        // res.send(result);
        // 使用模板引擎 填充数据
        let html = template(path.join(__dirname, '../template/edit.html'), {
            userInfo: result[0],
            userName:req.session.userName
        })
        // 返回结果
        res.send(html);
    })
})
// 保存编辑数据
router.post('/edit', (req, res) => {
    // res.send(req.body);
    // 接收数据 浏览器看到的 _id两边的 \" 是插件自动添加的 数据中并没有
    let _id = req.body._id;
    _id = _id.replace('"','');
    _id = _id.replace('"','');
    console.log(_id);
    delete req.body._id;
    // console.log(req.body);
    // 修改数据
    helper.updateOne('student',{_id:helper.ObjectId(_id)},{$set:req.body},(result)=>{
        // res.send(result);
        if(result.n==1){
            helper.tips(res,'修改成功','/student/index');
        }
    } )
    // 根据结果
    // 提示用户
    // 去首页
})

// 暴露出去
module.exports = router;