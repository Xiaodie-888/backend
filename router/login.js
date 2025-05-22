// router/login.js
const express = require('express')
const router = express.Router() // 使用路由

// 导入login的路由处理模块
const loginHandler = require('../router_handler/login')

router.post('/login', loginHandler.login) // 对应登录功能处理函数
router.post('/register', loginHandler.register) // 对应注册功能处理函数
router.post('/returnMenuList', loginHandler.returnMenuList) // 返回路由
// 向外暴露路由
module.exports = router