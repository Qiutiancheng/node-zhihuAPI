const Router = require('koa-router')
const router = new Router()
const { index, upload} = require('../controllers/home')

// 获取首页
router.get('/', index);
// 上传图片
router.post('/upload', upload)

module.exports = router