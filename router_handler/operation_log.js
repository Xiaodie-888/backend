const db = require('../db/index.js')

// 操作记录
exports.operationLog = (req,res) =>{
    const {account,name,content,level,status } = req.body
    const time = new Date()
    const sql = 'insert into operation_log set ?'
    db.query(sql,{account,name,content,level,status,time},(err,result)=>{
        if (err) return res.ce(err)
        res.send({
            status:0,
            message:'操作记录成功'
        })
    })
}

// 返回操作日志列表
exports.getOperationLogList = (req,res) =>{
    const number = (req.body.pager - 1) * 10
    const sql = `select * from operation_log 
                        order by time 
                        limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 返回操作日志列表总数
exports.getOperationLogLength = (req,res) =>{
    const sql = `select * from operation_log `
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send({
			length:result.length
		})
    })
}

// 返回指定日期操作日志
exports.searchOperation = (req, res) => {
    const sql = `select * from operation_log 
                        where time 
                        like '%${req.body.time}%'
                        order by time
                        limit 10`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 清空操作日志
exports.clearOperationList = (req,res) =>{
    const sql = 'truncate table operation_log'
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send({
            status:0,
            message:'登录操作清空成功'
        })
    })
}