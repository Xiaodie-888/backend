// 登录日志模块
const express = require('express')
const router = express.Router()
// 导入登录日志路由处理模块
const loginLogHandler = require('../router_handler/login_log.js')

router.post('/loginLog', loginLogHandler.loginLog) // 登录记录
router.post('/getLoginLogList', loginLogHandler.getLoginLogList) // 获取登录记录
router.post('/getLoginLogLength', loginLogHandler.getLoginLogLength) // 获取登录记录总数
router.post('/searchLoginLogList', loginLogHandler.searchLoginLogList) // 搜索最近十条登录记录
router.post('/clearLoginLogList', loginLogHandler.clearLoginLogList) // 清空登录日志
router.post('/getDayAndNumber', loginLogHandler.getDayAndNumber) // 清空登录日志
module.exports = router