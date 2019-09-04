const Koa = require('koa')
// Koa无法解析请求体，需要此中间件才能解析
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
// 添加 /users 的路由前缀
const usersRouter = new Router({prefix:'/users'})
const db = [{name:'李雷'}]

router.get('/', (ctx) => {
    ctx.body = "这是主页"
});
 
usersRouter.get('/',(ctx)=>{
    // 发送响应头
    // ctx.set('Allow','GET,POST')
    ctx.body = db
})

usersRouter.get('/:id',(ctx)=>{
    ctx.body = db[ctx.params.id*1]
})

usersRouter.post('/',(ctx)=>{
    db.push(ctx.request.body)
    ctx.body = 204
})

usersRouter.put('/:id',(ctx)=>{
    db[ctx.params.id*1] = ctx.request.body
    ctx.body = 204
})

usersRouter.delete('/:id',(ctx)=>{ 
    db.splice(ctx.params.id*1,1)
    ctx.body = 204
})

// 任何中间件都需要使用use注册到app里
app.use(bodyparser())
app.use(router.routes())
app.use(usersRouter.routes())
// 返回允许的http方法如果请求方法符合koa-router所支持的方法但是路由目前不存在此方法，会自动提示405
app.use(usersRouter.allowedMethods())
app.listen(3000)