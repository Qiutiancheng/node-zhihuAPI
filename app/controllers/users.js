// 临时的内存数据库
const db = [{name:'李雷'}]

class UserCtl {
    getList(ctx){
        ctx.body = db
    }
    getUser(ctx){
        ctx.body = db[ctx.params.id*1]
    }
    create(ctx){
        db.push(ctx.request.body)
        ctx.body = 204
    }
    update(ctx){
        db[ctx.params.id*1] = ctx.request.body
        ctx.body = 204
    }
    delete(ctx){
        db.splice(ctx.params.id*1,1)
        ctx.body = 204
    }
}

module.exports = new UserCtl()