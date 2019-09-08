const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {
        getList,
        getUser,
        create,
        update,
        delete:del,
        login
    } = require('../controllers/users')

// 获取用户列表
router.get('/',getList)
// 获取用户详情
router.get('/:id',getUser)
// 创建用户
router.post('/',create)
// 更改用户
router.patch('/:id',update)
// 删除用户
router.delete('/:id',del)
// 登录
router.post('/login',login)

module.exports = router