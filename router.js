// 0. 加载 express
const express = require('express')
// 1. 调用 express.Router() 创建一个路由实列
const router = express.Router()
// 2. 配置路由规则
router.get('/', (req,res) => {
    res.send('index page')
})
// 3. 导出路由对象
module.exports = router 
// 4. 在app.js 中通过app.use(路由对象)挂载使之生效