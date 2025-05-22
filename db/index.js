// db/index.js
// 导入mysql数据库
const mysql = require('mysql')
// 创建与数据库的连接
const db = mysql.createPool({
    host:'localhost', // 服务器地址
    user:'gbms', // 用户
    password:'123456', // 密码
    database:'gbms' // 数据库名
})
// 对外暴露数据库
module.exports = db

