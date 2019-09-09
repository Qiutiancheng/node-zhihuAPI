const Koa = require('koa')
// Koa无法解析请求体，需要此中间件才能解析
const koaBody = require('koa-body') 
// 第三方生成图片链接中间件
const koaStatic = require('koa-static')
// 第三方错误处理中间件
const error = require('koa-json-error')
// 第三方校验中间件
const parameter = require('koa-parameter')
// 第三方mongoDB云数据库
const mongoose = require('mongoose')
// node自带的路径模块
const path = require('path')
const {connectionStr} = require('./config')
const routing = require('./routes')
const app = new Koa()  

const port = 3000
// 链接mongoDB
mongoose.connect(connectionStr,{ useNewUrlParser: true },()=>console.log('mongoDB 链接成功!'))
mongoose.connection.on('error',console.error)

// 设置图片保存位置
app.use(koaStatic(path.join(__dirname,'public')))   
app.use(error({
    // 生产环境才现实错误的堆栈信息
    postFormat:(e,{ stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest: {stack, ...rest}
}));
// 任何中间件都需要使用use注册到app里
app.use(koaBody({
    // 允许上传文件
    multipart: true,
    formidable: {
        // 上传的文件路径
        uploadDir: path.join(__dirname,'/public/uploads'),
        // 保留文件后面的扩展名
        keepExtensions: true
    }
}))
app.use(parameter(app))
routing(app)

app.listen(port,()=>console.log(`程序启动在 ${port} 端口...`))