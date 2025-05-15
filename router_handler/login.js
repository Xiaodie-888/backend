const joi = require('joi')
const db = require('../db/index.js')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const jwtconfig = require('../jwt_config/index.js')

const userSchema = joi.object({
    account:joi.string().min(6).max(12).required(),
    password: joi
        .string()
        .pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)
        .required(), // 必填字段
});

//注册接口
exports.register = (req,res) =>{
    const result = userSchema.validate(req.body);
    if(result.error) return res.ce('输入的账号或密码有误')
    const sql = 'select * from users where account =?'
    db.query(sql,req.body.account,(err,results) => {
        if(err) return res.ce(err)
        if(results.length>0) return res.ce('账号已存在')
        const hash = bcrypt.hashSync(req.body.password,10)
        const sql1 = 'insert into users set ?'
        const create_time = new Date()
        db.query(sql1,
            {account:req.body.account,password:hash,create_time:create_time,status:0},
            (err,result)=>{
                if (result.affectedRows !==1 ) return res.ce('注册失败')
                res.send({
                    status:0,
                    message:'注册账号成功'
                 })
            })
    })
}
//登录接口
exports.login = (req,res) =>{
    const result = userSchema.validate(req.body);
    if(result.error) return res.ce('输入的账号或密码有误')
    const sql = 'select * from users where account =?'
    db.query(sql,req.body.account,(err,results)=>{
        if (err) return res.ce(err)
        //没有查询到用户输入的账号
        if (results.length !==1) return res.ce('登录失败')
        const compareResult = bcrypt.compareSync(req.body.password,results[0].password)
        if (compareResult ==0 ) return res.ce('登录失败')
        if (results[0].status ==1) return res.ce('账号被冻结')
        results[0].password =""
        const user = {
            account:req.body.account,
            password:req.body.password
        }
        const tokenStr = jwt.sign(user,jwtconfig.jwtSecretkey,{
            expiresIn:'7h'
        })
    res.send({
        results:results[0],
        status:0,
        message:'登录成功',
        token:'Bearer ' + tokenStr
    })
    })
}