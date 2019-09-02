const Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{ 
    if(ctx.url === '/'){
        ctx.body = 'This is home page.'
    }
    else if(ctx.url === '/users'){
        if(ctx.method === 'GET'){
            ctx.body = 'This is users page  '
        }
        else if(ctx.method === 'POST') {
            ctx.body = 'This is page of creat user'
        }
        else {
            ctx.status = 405
        } 
    }
    else if(ctx.url.match(/\/users\/\w{12,12}/)){
        const userId = ctx.url.match(/\/users\/(\w{12,12})/)[1]
        ctx.body = `这是用户 ${userId}`
    }
    else {
        ctx.status = 404
    }
}) 

app.listen(8080)