const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
// 添加 /users 的路由前缀
const usersRouter = new Router({prefix:'/users'})
// 鉴权（demo）
const auth = async (ctx,next)=>{
    if(ctx.url !== '/users'){
        ctx.throw(401)
    }
    await next()
    
}

router.get('/', (ctx) => {
    ctx.body = '这是主页'
});

// 会在响应前执行auth鉴权
usersRouter.get('/',auth,(ctx)=>{
    ctx.body = '这是用户列表'
})

usersRouter.post('/',auth,(ctx)=>{
    ctx.body = '创建用户' 
})

usersRouter.get('/:id',auth,(ctx)=>{
    const {id} = ctx.params
    ctx.body = `这是用户：${id}`
})

// 任何中间件都需要使用use注册到app里
app.use(router.routes())
app.use(usersRouter.routes())
// 返回允许的http方法；如果请求方法符合koa-router所支持的方法但是路由目前不存在此方法，会自动提示405
app.use(usersRouter.allowedMethods())
app.listen(8080)