const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const multer = require('multer')
const upload = multer({ dest:'public/upload'})

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
app.use(upload.any())
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false })); // 解析传统表单数据（application/x-www-form-urlencoded）
app.use(express.json()); // 解析JSON格式数据（如AJAX提交的复杂表单）


const loginRouter = require('./router/login')
app.use('/api',loginRouter)
const userRouter = require('./router/user')
app.use('/user',userRouter)

const fs = require('fs')
//异步写入
// fs.writeFile('./test.txt','我是通过异步写入的',err =>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('异步写入成功')
// })
//同步写入
// try{
//     fs.writeFileSync('test.txt','我是通过同步写入的')
// }catch(e){
//     console.log(e)
// }
//追加同步写入
// try{
//     fs.appendFileSync('test.txt','\n我是追加写入的同步方式')
// }catch(e){
//     console.log(e)
// }
//追加异步写入
// fs.appendFile('./test.txt','我是追加写入异步方式',err =>{
//     if(err) throw err
//     console.log('\n异步追加写入成功')
// })
// 流式写入
// let ws = fs.createWriteStream('./test.txt');
// ws.write('床前明月光\r\n');
// ws.write('疑是地上霜\r\n');
// ws.end();

//移动文件
// fs.rename('test.txt','./public/test.txt',(err)=>{
//     if(err) throw err
//     console.log('文件移动成功')
// })

//文件重命名
// fs.renameSync('./public/test.txt','./public/测试.txt')

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