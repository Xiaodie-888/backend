const express = require('express');
const router = express.Router()


const userHandler = require('../router_handler/user')

router.post('/changeName',userHandler.changeName)
router.post('/changeAge',userHandler.changeAge)
router.post('/changeSex',userHandler.changeSex)
router.post('/changeEmail', userHandler.changeEmail) 
router.post('/changePassword', userHandler.changePassword) 
router.post('/banUser',userHandler.banUser)
//获取状态用户列表
router.post('/thawUser',userHandler.thawUser)
router.post('/getHawUserList',userHandler.getHawUserList)
//获取正常用户列表
//删除用户
router.post('/uploadAvatar',userHandler.uploadAvatar)
router.post('/returnUserList',userHandler.returnUserList)


module.exports = router