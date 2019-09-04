// 用Node.js自带方法获取当前目录的文件，并注册路由
const fs = require('fs')
module.exports = (app)=>{
    // 同步读取（__durname）目录
    fs.readdirSync(__dirname).forEach(file=>{
        // 将index自身过滤掉，其他的注册路由
        if(file === 'index.js'){
            return
        }

        const route = require(`./${file}`)
        app.use(route.routes()).use(route.allowedMethods())
    })
}