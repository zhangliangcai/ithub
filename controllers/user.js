const connection = require('./db-helper.js')

const moment = require('moment')

exports.showSignin = (req, res) => {
    res.render('signin.html')
}

exports.signin = (req, res) => {
    res.send('signin')
}

exports.showSignup = (req, res) => {
    res.render('signup.html')
}

exports.signup = (req, res) => {
    // 1.接收获取客户端提交的表单数据
    // npm i body-parser 配置插件用来解析获取表单post请求体数据
    const body = (req.body)
    // 2.数据验证
    // 普通数据校验，例如数据有没有，格式是否正确
    // 业务数据校验，例如校验用户名是否被占用
    // 这里校验邮箱和昵称是否被占用

    // 校验邮箱是否被占用
    connection.query(
        'SELECT * FROM `users` WHERE `email`=?',
        [body.email],
        (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if (results[0]) {
                return res.send({
                    code:1,
                    message: '邮箱已被占用'
                })
            }
            // 校验昵称是否被占用
            connection.query(
                'SELECT * FROM `users` WHERE `nickname`=?',
                [body.nickname],
                (err, results) => {
                    if (err) {
                        return res.send({
                            code: 500,
                            message: err.message
                        })
                    }
                    if (results[0]) {
                        return res.send({
                            code:2,
                            message: '昵称已被占用'
                        })
                    }
                    // 邮箱和昵称都校验没有问题了，可以注册了
                    // 3.当数据验证都通过之后，在数据库写入一条新的用户数据

                    // 添加更新时间
                    // moment是一个专门处理时间的jacascript库
                    // moment() 用来获取当前时间
                    // format()方法用来格式化输出
                    body.createdAt = moment().format('YY-MM-DD HH:mm:ss')

                    const sqlStr = 'INSERT INTO `users` SET ?'

                    connection.query(sqlStr, body, (err, results) => {
                        if (err) {
                            // 服务器异常，通知客户端
                           return res.send({
                                code: 500,
                                message: err.message
                            }) 
                        }

                        // 4.发送成功的响应数据，告诉客户端注册成功了
                        res.send({
                            code:200,
                            message:'ok'
                        })
                        // 用户注册成功之后需要跳转到首页
                        // 1.服务端重定向（只对同步请求有效）
                        // res.send('注册成功')
                        // 2.让客户自己跳
                        // res.redirect('/')
                    })
                }
            )
        }
    )


}

exports.signout = (req, res) => {
    res.send('signout')
}
