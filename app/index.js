const Koa = require('koa')
// Koa无法解析请求体，需要此中间件才能解析
const bodyparser = require('koa-bodyparser') 
// 第三方错误处理中间件
const error = require('koa-json-error')
// 第三方校验中间件
const parameter = require('koa-parameter')
// 链接mongoDB
const mongoose = require('mongoose')
const {connectionStr} = require('./config')
const routing = require('./routes')
const app = new Koa()  

const port = 3000
// 链接mongoDB
 mongoose.connect(connectionStr,{ useNewUrlParser: true },()=>console.log('mongoDB 链接成功!'))
 mongoose.connection.on('error',console.error)

app.use(error({
    // 生产环境才现实错误的堆栈信息
    postFormat:(e,{ stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest: {stack, ...rest}
}));
// 任何中间件都需要使用use注册到app里
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(port,()=>console.log(`程序启动在 ${port} 端口...`))