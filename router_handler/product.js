// router_handler/product.js
const db = require('../db/index') // 导入数据库操作模块

// id初始为1000
let count = 1000

// 产品入库
exports.addProduct = (req, res) => {
    const {
        product_name, // 名称
        product_category, // 类别
        product_unit, // 单位
        warehouse_number, // 入库数量
        product_single_price, // 单价
        product_create_person, // 申请人
    } = req.body
    if (warehouse_number <= 0) res.ce('入库数量不能小于或等于0')
    // id自增
    const product_id = count++
    const product_create_time = new Date()
    const sql = 'insert into product set ?'
    db.query(sql, {
        product_id,
        product_name,
        product_category,
        product_unit,
        warehouse_number,
        product_single_price,
        product_create_person,
        product_create_time,
        audit_status:'在库',
    }, (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '产品入库成功'
        })
    })
}

// 获取产品列表 产品列表应该是所有，包括在审核队列中的 不通过和通过
exports.getProductList = (req, res) => {
    const number = (req.body.pager - 1) * 10
    const sql = `select * from product 
         order by product_create_time DESC limit 10 offset ${number}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 获取产品列表长度
exports.getProductLength = (req, res) => {
    const sql = `select * from product`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send({
			length:result.length
		})
    })
}


// 编辑产品
exports.editProduct = (req, res) => {
    const {
        product_name,
        product_category,
        product_unit,
        warehouse_number,
        product_single_price,
        id
    } = req.body
    const product_update_time = new Date()
    const sql =
        `update product set product_name = ?,product_category = ?,
                   product_unit = ?,warehouse_number = ?,
                   product_single_price = ? ,
                   product_update_time= ? where id = ?`
    db.query(sql, [
        product_name,
        product_category,
        product_unit,
        warehouse_number,
        product_single_price,
        product_update_time,
        id
    ], (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '编辑产品信息成功'
        })
    })
}

// 搜索产品
exports.searchProduct = (req, res) => {
    const sql = `select * from product 
                        where product_id = ?`
    db.query(sql, req.body.product_id, (err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 删除产品
exports.deleteProduct = (req, res) => {
    const sql = `delete from product where id = ?`
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '删除产品成功'
        })
    })
}

// 出库申请
exports.Outbound = (req, res) => {
    const audit_status = '审核'
    const {
        id,
        product_out_number,
        apply_person,
        apply_notes,
    } = req.body
    const apply_time = new Date()
    const sql =
        `update product set audit_status = ?,
         product_out_number=?,apply_person=?,
         apply_notes=?,apply_time= ? where id = ?`
    db.query(sql, [
        audit_status,
        product_out_number,
        apply_person,
        apply_notes,
        apply_time,
        id
    ], (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '申请出库成功'
        })
    })
}

// 获取审核列表
exports.getApplyList = (req, res) => {
    const number = (req.body.pager - 1) * 10
    const sql = `select * from product 
         where audit_status = '审核' or audit_status = '不通过'
         order by apply_time limit 10 offset ${number}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 获取审核列表长度
exports.getApplyLength = (req, res) => {
    const sql = `select * from product 
         where audit_status = '审核' or audit_status = '不通过'`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send({
			length:result.length
		})
    })
}

// 产品审核
exports.audit = (req, res) => {
    const {
        audit_status,
        id,
        product_id,
        product_name,
        product_unit,
        warehouse_number,
        product_out_number,
        product_single_price,
        audit_person,
        apply_person,
        apply_time,
        audit_notes,
    } = req.body
    const audit_time = new Date()
    // 审核不通过时，修改状态及审核信息
    if (audit_status == "不通过") {
        const sql = `update product set 
                            audit_status = '不通过',audit_person = ?,
                            audit_time = ?,audit_notes = ?, 
							apply_time= ?
                            where id = ${id}`
        db.query(sql,[audit_person,audit_time,audit_notes,apply_time] ,(err, result) => {
            if (err) return res.ce(err)
            res.send({
                status: 0,
                message: '审核不通过'
            })
        })
    }else{
        // 审核通过，将出库信息新增至出库表
        const sql = 'insert into out_product set ?'
        db.query(sql, {
            product_id,
            product_name,
            product_unit,
            product_out_number,
            product_single_price,
            audit_person,
            apply_person,
            apply_time,
            audit_time
        }, (err, result) => {
            if (err) return res.ce(err)
            // 库存=原库存-出库数量
            const newNumber = warehouse_number - product_out_number
            // 产品出库信息置为null
            const sql1 =
                `update product set warehouse_number = ${newNumber},
                 audit_status = '在库',
                 product_out_number =null,apply_person=null,
                 apply_notes =null,apply_time = null,
                 audit_person = null,audit_time = null,
                 audit_notes = null
                 where id = ${id}`
            db.query(sql1, (err, result) => {
                if (err) return res.ce(err)
                res.send({
                    status: 0,
                    message: '产品出库成功'
                })
            })
        })
    }
}

// 获取当前产品信息
exports.productInfo = (req, res) => {
    const sql = `select * from product where id = ${req.body.id}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send(result[0])
    })
}

// 撤回申请
exports.withdraw = (req, res) => {
    const sql =
        `update product set audit_status = '在库',
                 product_out_number =null,apply_person=null,
                 apply_notes =null,apply_time = null,
                 audit_person = null,audit_time = null,
                 audit_notes = null
                 where id = ${req.body.id}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '撤回申请成功'
        })
    })
}

// 再次申请
exports.againApply = (req, res) => {
    const sql =
        `update product set audit_status = '审核' 
         where id = ${req.body.id}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send({
            status: 0,
            message: '再次申请成功'
        })
    })
}

// 出库产品列表
exports.getOutboundList = (req, res) => {
    const number = (req.body.pager - 1) * 10
    const sql = `select * from out_product 
            order by audit_time limit 10 offset ${number}`
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 出库产品列表长度
exports.getOutboundLength = (req, res) => {
    const sql = `select * from out_product `
    db.query(sql, (err, result) => {
        if (err) return res.ce(err)
        res.send({
			length:result.length
		})
    })
}

// 搜索出库数据
exports.searchOutbound = (req, res) => {
    const sql = `select * from out_product 
                        where product_id = ? 
                        order by audit_time limit 10`
    db.query(sql, req.body.product_id,(err, result) => {
        if (err) return res.ce(err)
        res.send(result)
    })
}

// 清空出库列表
exports.cleanOutbound = (req,res) =>{
    const sql = 'truncate table out_product'
    db.query(sql,(err,result)=>{
        if (err) return res.ce(err)
        res.send({
            status:0,
            message:'出库表清空成功'
        })
    })
}