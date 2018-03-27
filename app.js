const express = require('express')

const bodyParser = require('body-parser')

const router = require('./router')

const app = express()

// 0.配置摸版引擎
// 1. 开放静态资源
// 2.渲染页面
// 3.下载第三方包
// bootstrap@3.3.7
// jquery

app.use('/public', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))

// 配置body-parser 解析表单 post 请求体
// 只有配置了该插件，就可以在请求处理函数中使用req.body 来访问请求体数据了
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

// 配置使用art-template 摸版引擎
app.engine('html',require('express-art-template'))

app.use(router)

app.listen(3000, () => console.log('running 3000...'))