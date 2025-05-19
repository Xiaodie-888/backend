// 操作日志模块
const express = require('express')
const router = express.Router()
// 导入操作日志路由处理模块
const operationHandler = require('../router_handler/operation_log.js')

router.post('/operationLog', operationHandler.operationLog) // 操作记录
router.post('/getOperationLogList', operationHandler.getOperationLogList) // 返回操作记录
router.post('/getOperationLogLength', operationHandler.getOperationLogLength) // 返回操作日志列表总数
router.post('/searchOperation', operationHandler.searchOperation) // 返回指定日期操作日志
router.post('/clearOperationList', operationHandler.clearOperationList) // 清空操作日志

module.exports = router