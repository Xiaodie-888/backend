// router/product.js
const express = require('express')
const router = express.Router() // 使用路由

// 导入product的路由处理模块
const productHandler = require('../router_handler/product')


router.post('/addProduct', productHandler.addProduct) // 产品申请入库
router.post('/getProductList', productHandler.getProductList) // 获取产品列表
router.post('/getProductLength', productHandler.getProductLength) // 获取产品列表长度
router.post('/editProduct', productHandler.editProduct) // 编辑产品
router.post('/searchProduct', productHandler.searchProduct) // 搜索产品
router.post('/deleteProduct', productHandler.deleteProduct) // 删除产品
router.post('/Outbound', productHandler.Outbound) // 出库申请
router.post('/getApplyList', productHandler.getApplyList) // 获取审核列表
router.post('/getApplyLength', productHandler.getApplyLength) // 获取审核列表长度
router.post('/audit', productHandler.audit) // 产品审核
router.post('/withdraw', productHandler.withdraw) // 撤回申请
router.post('/againApply', productHandler.againApply) // 再次申请
router.post('/getOutboundList', productHandler.getOutboundList) // 出库产品列表
router.post('/searchOutbound', productHandler.searchOutbound) // 搜索出库数据
router.post('/cleanOutbound', productHandler.cleanOutbound) // 清空出库列表
router.post('/productInfo', productHandler.productInfo) // 获取当前产品信息
// 向外暴露路由
module.exports = router