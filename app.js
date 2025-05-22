// app.js
const express = require('express')
const app = express()
const path = require('path');
// 导入cors并挂载
const cors = require('cors')
app.use(cors())
// 导入multer和设置文件存储位置
const multer = require('multer');
const upload = multer({dest:'./public/upload'})
app.use(upload.any()) // 挂载upload为全局中间件

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('./public')) // 静态托管
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.use(express.urlencoded({ //解析URL编码
  extended: false
}))
app.use(express.json()) // 处理JSON格式的数据

app.use((req, res, next) => {
  res.ce = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

const loginRouter = require('./router/login')
app.use('/api', loginRouter)
const userRouter = require('./router/user')
app.use('/user', userRouter)
const productRouter = require('./router/product')
app.use('/product', productRouter)
const loginLogRouter = require('./router/login_log.js')
app.use('/log', loginLogRouter)
const operationRouter = require('./router/operation_log.js')
app.use('/operation', operationRouter)



// 绑定和侦听指定的主机和端口
app.listen(3007, () => {
  console.log('http://127.0.0.1:3007')
})

