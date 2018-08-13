# studentManager_20
学员管理 基于 express mongoDB bootstrap

## 包
1. express 让我们能够通过浏览器访问 托管静态资源
    cnpm install express --save


## 项目基本结构

```
    node_modules ->第三方包
    static ->静态文件
    template ->模板文件
    route ->路由
    .gitignore ->忽略文件
    app.js ->入口文件
    package.json ->项目配置文件
    README.md ->github的项目说明
```

## 步骤记录

1. github托管
    github建库 选择 忽略 node的文件
    git clone 到本地
    npm init -y 初始化为项目

2. 资源导入
    bootstrap

3. 静态布局实现
    使用bootstrap
        表单,表格,栅格,面板,列表组

4.  登陆&注册页显示
    1. 在managerRouter中增加路由 get
        直接读取文件返回即可
    2. 登录页的 注册按钮 建立路径关联 跳转到注册页

5. 用户注册
    设置注册页的表单的action method属性在路由中增加post提交数据地址
    1. 数据接收 
    ```javascript
        let tem ='';
        req.on('data',(chunk)=>{
            tem+=chunk;
        })
        req.on('end',()=>{
            // 数据接收完毕
            console.log(tem);
            res.send(tem);
        })
    ```

    2. 使用中间件进行数据解析
6. 验证码
    npm 找到验证码的第三方包
    整合到  managerRouter中
    增加一个路由 专门 用来生成验证码
    login.html 中的 验证码图片的src属性 设置这个地址
    
    点击更换验证码
        点击事件 重新赋值src属性 拼接上了 ?时间戳
    session保存验证码
        装包 express-session
        使用中间件
            删除不必要的配置设置
        就可以在 req.session 进行数据的操作了


