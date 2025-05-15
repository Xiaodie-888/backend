const mysql = require('mysql');

const db = mysql.createPool({  //老创建mysql事例
    host:'localhost',
    user:'gbms',
    password:'123456',
    database:'gbms'
})

module.exports = db;