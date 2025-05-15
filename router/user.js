const express = require('express');
const router = express.Router()


const userHandler = require('../router_handler/user')

router.post('/changeName',userHandler.changeName)
router.post('/changeAge',userHandler.changeAge)
router.post('/changeSex',userHandler.changeSex)
router.post('/banUser',userHandler.banUser)
router.post('/thawUser',userHandler.thawUser)
router.post('/getHawUserList',userHandler.getHawUserList)



module.exports = router