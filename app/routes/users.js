const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {
        getList,
        getUser,
        create,
        update,
        delete:del,
        login,
        checkOwner,
        checkUserIsExist,
        listFollowing,
        listFollowers,
        follow,
        unFollow
    } = require('../controllers/users')
// 密钥
const { secret } = require('../config')
// 认证
const auth = jwt({secret})

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
// 我关注的
router.get('/:id/following', listFollowing)
// 关注我的
router.get('/:id/followers', listFollowers)
// 关注某人
router.put('/following/:id', auth, checkUserIsExist, follow) 
// 取消关注
router.delete('/following/:id', auth, checkUserIsExist, unFollow)

module.exports = router