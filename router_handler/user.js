const joi = require('joi')
const db = require('../db/index.js')
const bcrypt = require('bcrypt')

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