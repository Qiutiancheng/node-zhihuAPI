const Koa = require('koa')
// Koa无法解析请求体，需要此中间件才能解析
const bodyparser = require('koa-bodyparser') 
const app = new Koa()  
const routing = require('./routes')
const port = 3000
 


// 任何中间件都需要使用use注册到app里
app.use(bodyparser())
routing(app)
app.listen(port,()=>console.log(`程序启动在 ${port} 端口...`))