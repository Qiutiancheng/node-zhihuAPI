const jsonwebtoken = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {
        getList,
        getUser,
        create,
        update,
        delete:del,
        login,
        checkOwner
    } = require('../controllers/users')
// 密钥
const { secret } = require('../config')
// 认证
const auth = async(ctx, next)=>{
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ','')
    try {
        const user = jsonwebtoken.verify(token,secret)  
        ctx.state.user = user
    } catch (error) {
        ctx.throw(401, error.message)
    }
    await next()
}

// 获取用户列表
router.get('/', getList)
// 获取用户详情
router.get('/:id', getUser)
// 创建用户
router.post('/', create)
// 更改用户，认证并授权
router.patch('/:id', auth, checkOwner, update)
// 删除用户，认证并授权
router.delete('/:id', auth, checkOwner, del)
// 登录
router.post('/login', login)

module.exports = router