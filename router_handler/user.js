const db = require('../db/index.js')
const joi = require('joi')
const bcrypt = require('bcryptjs')
const fs = require('fs') // 导入fs模块

exports.changeName = (req, res) => {
	const {
		id,
		name
	} = req.body
	const verifyResult = joi
		.string().pattern(/^[\u4e00-\u9fa5]{2,4}$/)
		.required().validate(name)
	if (verifyResult.error) return res.ce('输入的昵称有误')
	const update_time = new Date()
	const sql = 'update users set name = ?,update_time = ? where id = ?'
	db.query(sql, [name, update_time, id], (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '修改昵称成功'
		})
	})
}

exports.changeAge = (req, res) => {
	const {
		id,
		age
	} = req.body
	const verifyResult = joi
		.number().min(16).max(60).required().validate(age)
	if (verifyResult.error) return res.ce('输入的年龄有误')
	const update_time = new Date()
	const sql = 'update users set age = ?,update_time = ? where id = ?'
	db.query(sql, [age, update_time, id], (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '修改年龄成功'
		})
	})
}

exports.changeSex = (req, res) => {
	const {
		id,
		sex
	} = req.body
	const update_time = new Date()
	const sql = 'update users set sex = ?,update_time = ? where id = ?'
	db.query(sql, [sex, update_time, id], (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '修改性别成功'
		})
	})
}

exports.changeEmail = (req, res) => {
	const {
		id,
		email
	} = req.body
	const verifyResult = joi
		.string()
		.pattern(/^([a-zA-Z0-9_\.\-])+\@([a-zA-Z0-9\-])+\.[a-zA-Z]{2,6}$/)
		.required().validate(email)
	if (verifyResult.error) return res.ce('输入的邮箱格式有误')
	const sql = 'select * from users where email = ?'
	db.query(sql, email, (err, result) => {
		if (err) return res.ce(err)
		if (result.length > 0) return res.ce('邮箱已存在')
		const update_time = new Date()
		const sql1 = 'update users set email = ?,update_time = ? where id = ?'
		db.query(sql1, [email, update_time, id], (err, result) => {
			if (err) return res.ce('修改邮箱失败')
			res.send({
				status: 0,
				message: '修改邮箱成功'
			})
		})
	})
}

exports.changePassword = (req, res) => {
	// 接收 id 新旧密码
	const {
		id,
		oldPassword,
		newPassword
	} = req.body
	const sql = 'select password from users where id = ?'
	db.query(sql, id, (err, result) => {
		if (err) return res.ce(err)
		// 验证旧密码
		const compareResult = bcrypt.compareSync(oldPassword, result[0].password)
		if (compareResult == 0) return res.ce('旧密码错误')
		// 校验新密码
		const verifyResult = joi
			.string()
			.pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)
			.min(6).max(12).required().validate(newPassword)
		if (verifyResult.error) return res.ce('输入的密码格式有误')
		// 加密新密码
		const hash = bcrypt.hashSync(newPassword, 10)
		const update_time = new Date()
		// 更新
		const sql1 = 'update users set password = ?,update_time = ? where id = ?'
		db.query(sql1, [hash, update_time, id], (err, result) => {
			if (err) return res.ce(err)
			res.send({
				status: 0,
				message: '修改密码成功'
			})
		})
	})
}

// 冻结用户 通过id 把status 置为 1
exports.banUser = (req, res) => {
	const sql = `update users set status = 1 where id = ${req.body.id}`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '冻结成功'
		})
	})
}

// 解冻用户 通过id 把status 置为 0
exports.thawUser = (req, res) => {
	const sql = `update users set status = 0 where id = ${req.body.id}`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '解冻成功'
		})
	})
}


// 获取状态用户列表
exports.getStatusUserList = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from users 
                        where status = ${req.body.status}
                        order by create_time limit 10 offset ${number}`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		result.forEach((e) => {
			e.password = ''
		})
		res.send(result)
	})
}

// 获取指定页码的用户列表
exports.getUserListForPage = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const sql = `select * from users
                        order by create_time limit 10 offset ${number}`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		result.forEach((e) => {
			e.password = ''
		})
		res.send(result)
	})
}

// 获取所有用户数量
exports.getUserLength = (req, res) => {
	const sql = `select * from users`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		res.send({
			length: result.length
		})
	})
}

// 删除用户
exports.deleteUser = (req, res) => {
	const sql = `select image_url from users where id = ${req.body.id} `
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		if(result[0].image_url!==null){
			image_url = result[0].image_url?.slice(29)
			fs.unlink(`./public/upload/${image_url}`, (err) => {
				if (err) return res.ce(err)
			})
		}
		const sql1 = `delete from users where id = ${req.body.id}`
		db.query(sql1, req.body.id, (err, result) => {
			if (err) return res.ce(err)
			res.send({
				status: 0,
				message: '删除用户成功'
			})
		})
	})
}

// id初始为1000
let image_id = 1000
// 上传头像
exports.uploadAvatar = (req, res) => {
	let oldName = req.files[0].filename
	image_id++
	// 添加唯一id作为前缀
	let newName = `${image_id}` + req.files[0].originalname
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	res.send({
		status: 0,
		url: `http://127.0.0.1:3007/upload/${newName}`
	})
}

// 绑定账号
exports.bindAccount = (req, res) => {
	const {
		account,
		url
	} = req.body
	const sql = 'update users set image_url = ? where account = ?'
	db.query(sql, [url, account], (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '修改成功'
		})
	})
}

// 修改用户部门或职位
exports.changeLevel = (req, res) => {
	const update_time = new Date()
	let sql = null
	let content = null
	if (req.body.department) {
		content = req.body.department
		sql = `update users set 
                            department = ?,
                            update_time = ? where id = ${req.body.id}`
	}
	if (req.body.position) {
		content = req.body.position
		sql = `update users set
                            position = ?,
                            update_time = ? where id = ${req.body.id}`
	}
	db.query(sql, [content, update_time], (err, result) => {
		if (err) return res.ce(err)
		res.send({
			status: 0,
			message: '修改角色成功'
		})
	})
}

// 获取指定部门的用户列表
exports.getUserByDepartment = (req, res) => {
	const number = (req.body.pager - 1) * 10
	const department = req.body.department
	sql = `select * from users 
                where department = ? and status = 0 
                order by create_time limit 10 offset ${number}`
	db.query(sql, department, (err, result) => {
		if (err) return res.ce(err)
		result.forEach((e) => {
			e.password = ''
		})
		res.send(result)
	})
}

// 返回指定部门总人数
exports.UserLengthForDepartment = (req, res) => {
	sql = `select * from users 
                where department = ? and status = 0 `
	db.query(sql, req.body.department, (err, result) => {
		if (err) return res.ce(err)
		res.send({
			length:result.length
		})
	})
}

// 返回指定状态总人数
exports.UserLengthForStatus = (req, res) => {
	sql = `select * from users 
                where status = ?`
	db.query(sql, req.body.status, (err, result) => {
		if (err) return res.ce(err)
		res.send({
			length:result.length
		})
	})
}

// 获取用户信息
exports.getUserInfo = (req, res) => {
	const sql = `select * from users where account = ${req.body.account}`
	db.query(sql, (err, result) => {
		if (err) return res.ce(err)
		result[0].password = ''
		res.send(result[0])
	})
}

