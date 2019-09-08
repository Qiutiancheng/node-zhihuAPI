const User = require('../models/users')

class UserCtl {
    async getList(ctx){ 
        ctx.body = await User.find()
    }
    async getUser(ctx){ 
        const user = await User.findById(ctx.params.id)
        if(!user) {
            ctx.throw(404)
        }
        ctx.body = user
    }
    async create(ctx){
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            }
        })
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    async update(ctx){
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            }
        })
        const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body)
        if(!user){
            ctx.throw(404)
        }
        ctx.body = user
    }
    async delete(ctx){
        const user = await User.findByIdAndDelete(ctx.params.id)
        if(!user){
            ctx.throw(404)
        }
        ctx.body = 204
    }
}

module.exports = new UserCtl()