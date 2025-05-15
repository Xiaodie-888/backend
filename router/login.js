const express = require('express');
const router = express.Router()

// const mw = function(req,res,next){
//     console.log('路由中间件')
//     next()
// }

// router.use(mw)

const loginHandler = require('../router_handler/login')

router.post('/register',loginHandler.register)
router.post('/login',loginHandler.login)

module.exports = router