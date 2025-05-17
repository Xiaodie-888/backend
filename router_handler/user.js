const joi = require('joi')
const db = require('../db/index.js')
const bcrypt = require('bcrypt')
const fs = require('fs')

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


// 获取正常用户列表
exports.getHawUserList = (req, res) => {
    const sql = 'select * from users where status = 0 '
    db.query(sql, (err, result) => {
        if (err) return res.ce(err);
        result.forEach((e) => {
            e.password = '' // 密码置为空字符串
        });
        res.send(result);
    });
}

// 上传头像
exports.uploadAvatar = (req, res) => {
	// res.send(req.files[0])
	let oldName = req.files[0].filename
	let newName = `${req.body.account}_` + req.files[0].originalname
	fs.renameSync('public/upload/'+ oldName,'public/upload/'+ newName)
	const sql = 'update users set image_url = ? where account =?'
	db.query(sql,[`http://127.0.0.1:3000/upload/${newName}`,req.body.account],(err,result)=>{
		if (err) return res.ce(err)
		res.send({
			status:0,
			message:'修改头像成功'
		})
	})
}

//实现分页(获取所有用户的数量)
exports.returnUserList = (req,res)=>{
	const number = (req.body.pager -1) * 2
	const sql = `select * from users
	where status = 0 order by id limit 2 offset ${number}`
	db.query(sql,(err,result)=>{
		if(err) return res.ce(err)
		res.send(result)
	})
}