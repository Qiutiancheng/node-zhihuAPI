const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const {secret} = require('../config')

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
            },
            password: {
                type: 'string',
                required: true
            }
        })
        const { name } = ctx.request.body
        const repeateUser = await User.findOne({name})
        if(repeateUser){
            ctx.throw(409,'用户已存在')
        }
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    async update(ctx){
        ctx.verifyParams({
            name: {
                type: 'string',
                required: false
            },
            password: {
                type: 'string',
                required: false
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
    async login(ctx){
        ctx.verifyParams({
            name:{
                type: 'string',
                required: true
            },
            password:{
                type: 'string',
                required: true
            }
        })
        const user = await User.findOne(ctx.request.body)
        if(!user){
            ctx.throw(401,'用户名或密码不正确')
        }
        const {_id,name} = user
        // 生成Token，过期时间为1天
        const token = jsonwebtoken.sign({_id,name},secret,{expiresIn: '1d'})
        ctx.body = {token}
    }
}

module.exports = new UserCtl()