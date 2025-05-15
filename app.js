const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello express');
});

app.use((req,res,next)=>{
    res.ce = (err,status =1)=>{
        res.send({
            status,
            message:err instanceof Error? err.message:err,
        })
    }
    next()
})

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false })); // 解析传统表单数据（application/x-www-form-urlencoded）
app.use(express.json()); // 解析JSON格式数据（如AJAX提交的复杂表单）


const loginRouter = require('./router/login')
app.use('/api',loginRouter)
const userRouter = require('./router/user')
app.use('/user',userRouter)

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
});

// const http = require('http'); // 导入http模块
// const hostname = '127.0.0.1';
// const port = '3000'; // 端口号
// const server = http.createServer((req,res) => { // 创建http服务器实例
//     res.statusCode = 200; //响应状态码
//     res.setHeader('Content-Type','text/plain');  //设置响应头
//     res.end('Hello\n');//返回的数据
// })
//指定监听的端口和ip地址
// server.listen(port,hostname,()=>{
//     console.log(`服务器运行在http://${hostname}:${port}/`)
// })