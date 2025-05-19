const express = require('express');
const router = express.Router()


const userHandler = require('../router_handler/user')

router.post('/changeName', userHandler.changeName) // 修改昵称
router.post('/changeAge', userHandler.changeAge) // 修改年龄
router.post('/changeSex', userHandler.changeSex) // 修改性别
router.post('/changeEmail', userHandler.changeEmail) // 修改邮箱
router.post('/changePassword', userHandler.changePassword) // 修改密码
router.post('/banUser', userHandler.banUser) // 冻结用户
router.post('/thawUser', userHandler.thawUser) // 解冻用户
router.post('/getStatusUserList', userHandler.getStatusUserList) // 获取状态用户列表
router.post('/getUserListForPage', userHandler.getUserListForPage) // 获取指定页码的用户列表
router.post('/getUserLength', userHandler.getUserLength) // 获取用户长度
router.post('/deleteUser', userHandler.deleteUser) // 删除用户
router.post('/uploadAvatar', userHandler.uploadAvatar) // 上传头像
router.post('/bindAccount', userHandler.bindAccount) // 绑定账户
router.post('/changeLevel', userHandler.changeLevel) // 修改用户部门或职位
router.post('/getUserByDepartment', userHandler.getUserByDepartment) // 获取指定部门的用户列表
router.post('/getUserInfo', userHandler.getUserInfo) // 获取用户信息 搜索
router.post('/UserLengthForDepartment', userHandler.UserLengthForDepartment) // 返回指定部门总人数
router.post('/UserLengthForStatus', userHandler.UserLengthForStatus) // 返回指定状态总人数


module.exports = router