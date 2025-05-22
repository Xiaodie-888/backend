const db = require('../db/index') // 导入数据库操作模块
const moment = require('moment')
// 登录记录
exports.loginLog = (req,res) =>{
    const {account,name,email } = req.body
    const login_time = new Date()
    const sql = 'insert into login_log set ?'
    db.query(sql,{account,name,email,login_time},(err,result)=>{
        if (err) return res.ce(err)
        res.send({
            status:0,
            message:'记录登录信息成功'
        })
    })
}

// 返回登录日志列表
exports.getLoginLogList = (req,res) =>{
    const number = (req.body.pager - 1) * 10
    const sql = `select * from login_log 
                        order by login_time 
                        limit 10 offset ${number}`
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 返回登录日志总数
exports.getLoginLogLength = (req,res) =>{
    const sql = `select * from login_log`
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send({
			length:result.length
		})
    })
}

// 搜索最近十条登录记录
exports.searchLoginLogList = (req,res) =>{
    const sql = `select * from login_log 
                        where account = ? 
                        ORDER BY login_time limit 10`
    db.query(sql,req.body.account,(err,result)=>{
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 清空登录日志
exports.clearLoginLogList = (req,res) =>{
    const sql = 'truncate table login_log'
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send({
            status:0,
            message:'登录日志清空成功'
        })
    })
}

// 返回每天登录人数
exports.getDayAndNumber = (req,res) =>{
	// 获取最近七天日期
	const getDay = () =>{
		let day =new Date()
		let week = []
		for(let i = 0;i<7;i++){
			// day.getDate() 返回当前的一天 比如 2023年9月24日 会返回 24 为了获取前七天的数据 这边就-1
			day.setDate(day.getDate() - 1)
			// 2023/9/23 → 2023-9-23 2023-09-23 
			// moment.js
			week.push(day.toISOString().slice(0, 10))
		}
		return week
	}
	// 获取每天登录的人数
	const getNumber = login_time =>{
		return new Promise(resolve=>{
			const sql = `select * from login_log 
			where login_time like '%${login_time}%'`
			db.query(sql,login_time,(err,result)=>{
				resolve(result.length)
			})
		})
	}
	
	async function getAll() {
		let week = getDay()
		let number = []
		for(let i = 0;i<week.length;i++){
			number[i] = await getNumber(week[i])
		}
		res.send({
			number:number,
			week:week
		})
	}
	getAll()
}