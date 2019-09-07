// 临时的内存数据库
const db = [{name:'李雷'}]

class UserCtl {
    getList(ctx){
        a.b
        ctx.body = db
    }
    getUser(ctx){
        if(ctx.params.id * 1 >= db.length){
            ctx.throw(412)
        }
        ctx.body = db[ctx.params.id*1]
    }
    create(ctx){
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            },
            age: {
                type: 'number',
                required: false
            }
        })
        db.push(ctx.request.body)
        ctx.body = ctx.request.body
    }
    update(ctx){
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            },
            age: {
                type: 'number',
                required: false
            }
        })
        db[ctx.params.id*1] = ctx.request.body
        ctx.body = 204
    }
    delete(ctx){
        if(ctx.params.id * 1 >= db.length){
            ctx.throw(412)
        }
        db.splice(ctx.params.id*1,1)
        ctx.body = 204
    }
}

module.exports = new UserCtl()