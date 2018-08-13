// 导入express 第三方
const express = require('express');
// 导入验证码模块 第三方
var svgCaptcha = require('svg-captcha');
// 获取路由对象
let router = express.Router();
// 自己抽取的helper工具
const helper = require('../tools/helper');

// 内置模块 
const path = require('path');

// 登陆路由  匹配到 /managr/login
router.get('/login', (req, res) => {
    // 直接返回静态页面即可
    res.sendFile(path.join(__dirname, '../template/login.html'));
})

// 登陆路由 数据提交
router.post('/login',(req,res)=>{
    // session数据
    // 获取数据 表单数据
    let userName = req.body.userName;
    let userPass = req.body.userPass;
    let vCode = req.body.vCode;

    // 判断验证码
    if(vCode==req.session.captcha){
        // res.send('正确')
        // 再去验证用户名密码
        helper.find('admin',{userName,userPass},(result)=>{
            // res.send(result);
            if(result.length!=0){
                // 去首页
                res.redirect('/student/index');
            }else{
            helper.tips(res,'用户名或者密码错误 😁😁😁😁😁😁','/manager/login');
                
            }
        })
    }else{
        // res.send('错误');
        // 直接提示用户
        helper.tips(res,'验证码错误,哥们你是机器人吗 🐷','/manager/login');
    }
})

// 注册路由 直接访问 匹配到 /manager/register
router.get('/register', (req, res) => {
    // 直接返回静态页面即可
    res.sendFile(path.join(__dirname, '../template/register.html'));
})

// 登录页 提交数据
router.post('/register', (req, res) => {
    //    res.send(req.body);
    // 接收数据
    let userName = req.body.userName;
    let userPass = req.body.userPass;
    // 查询数据
    helper.find('admin', {
        userName
    }, (result) => {
        // res.send(result);
        if (result.length == 0) {
            // 可以注册
            helper.insertOne('admin', {
                userName,
                userPass
            }, (result) => {
                // 结果提示
                if (result.n == 1) {
                    // 去登录页
                   helper.tips(res,'注册成功','/manager/login');
                }
            })
        } else {
            // 已被注册
            // alert一下
            helper.tips(res,'已被注册','/manager/register');

        }
    })
})

// 获取验证码的接口
router.get('/vcode', function (req, res) {
    // 使用第三方生成验证码
    var captcha = svgCaptcha.create();
    // 把验证码的信息保存到 session中 方便后续的匹配
    req.session.captcha = captcha.text;
    // console.log(captcha.text);
    // 设置类型
    res.type('svg');
    // 返回生成的验证码图片
	res.status(200).send(captcha.data);
});


// 暴露出去
module.exports = router;