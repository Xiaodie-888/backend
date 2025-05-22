const db = require('../db/index.js')
const joi = require('joi')
// 导入bcrypt加密中间件
const bcrypt = require('bcrypt')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../jwt_config/index.js')

const userSchema = joi.object({
	account: joi.string().min(6).max(12).required(),
	password: joi
		.string()
		.pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)
		.min(6).max(12).required(),
});

/**
 * 用户信息注册
 * @route POST /api/users/register
 * @group Login - Operations about Login
 * @param {int} account.query.required - 用户名
 * @param {string} password.query.required - 密码
 * @returns {object} 200 - 注册成功的用户信息
 * @returns {Error} default - 注册失败的错误信息
 */


exports.register = (req, res) => {
	// req是前端传过来的数据,也就是request,res是返回给前端的数据,也就是response
	const result = userSchema.validate(req.body);
	if (result.error) return res.ce('输入的账号或密码有误')
	// 定义一个select语句
	const sql = 'select * from users where account = ?'
	// 调用数据库的query方法，传入sql语句、条件参数、回调函数
	db.query(sql, req.body.account, (err, results) => {
		if (err) return res.ce(err)
		if (results.length > 0) return res.ce('账号已存在')
		const hash = bcrypt.hashSync(req.body.password, 10)
		// 插入语句
		const sql1 = 'insert into users set ?'
		// 创建时间
		const create_time = new Date()
		db.query(sql1, {
			account: req.body.account,
			password: hash,
			create_time,
			// 初始未冻结状态为0
			status: 0,
		}, (err, results) => {
			// affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
			if (results.affectedRows !== 1) return res.ce('注册失败')
			res.send({
				status: 0,
				message: '注册账号成功'
			})
		})
	})
}



exports.login = (req, res) => {
	// res.send('登录成功！')
	const result = userSchema.validate(req.body);
	if (result.error) return res.ce('输入的账号或密码有误')
	const sql = 'select * from users where account = ?'
	db.query(sql, req.body.account, (err, results) => {
		if (err) return res.ce(err)
		if (results.length !== 1) return res.ce('登录失败')
		// 校验密码是否正确
		const compareResult = bcrypt.compareSync(req.body.password, results[0].password)
		if (compareResult == 0) return res.ce('登录失败')
		// 生成token等逻辑
		// 第三步 对账号是否冻结做判定
		if (results[0].status == 1) return res.ce('账号被冻结')
		// 第四步 生成返回给前端的token
		// 剔除加密后的密码,头像,创建时间,更新时间
		const user = {
			...results[0],
			password: '',
			imageUrl: '',
			create_time: '',
			update_time: '',
		}
		// 设置token的有效时长 有效期为7个小时
		const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
			expiresIn: '7h'
		})
		res.send({
			results: results[0],
			status: 0,
			message: '登录成功',
			token: 'Bearer ' + tokenStr,
		})
	})
}

const superAdminRouter = [{
		name: 'set',
		path: '/set',
		component: 'set/index'
	},
	{
		name: 'user',
		path: '/user',
		component: 'user/index'
	}, {
		name: 'login_log',
		path: '/login_log',
		component: 'login_log/index'
	}, {
		name: 'operation_log',
		path: '/operation_log',
		component: 'operation_log/index'
	}, {
		name: 'product',
		path: '/product',
		component: 'product/index'
	}, {
		name: 'audit',
		path: '/audit',
		component: 'product/audit'
	}, {
		name: 'outbound',
		path: '/outbound',
		component: 'product/outbound'
	},
	{
		name: 'statistics',
		path: '/statistics',
		component: 'statistics/index'
	}
]

const userAdminRouter = [{
		name: 'set',
		path: '/set',
		component: 'set/index'
	},
	{
		name: 'user',
		path: '/user',
		component: 'user/index'
	}
]

const productAdminRouter = [{
		name: 'set',
		path: '/set',
		component: 'set/index'
	},
	{
		name: 'product',
		path: '/product',
		component: 'product/index'
	}, {
		name: 'audit',
		path: '/audit',
		component: 'product/audit'
	}, {
		name: 'outbound',
		path: '/outbound',
		component: 'product/outbound'
	},
]




exports.returnMenuList = (req, res) => {
	const sql = 'select department from users where id = ?'
	db.query(sql, req.body.id, (err, result) => {
		if (err) return res.ce(err)
		let menu = []
		if (result[0].department == '超级管理员') {
			menu = superAdminRouter
		}
		if (result[0].department == '人事部') {
			menu = userAdminRouter
		}
		if (result[0].department == '产品部') {
			menu = productAdminRouter
		}
		res.send(menu)
	})
}