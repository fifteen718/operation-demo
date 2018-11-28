// Vue CLI3 坑爹的地方 webpack配置需自建 vue.config.js
// 详见官方文档：https://cli.vuejs.org/zh/config/#vue-config-js

// mock code
const initMenu = require('./mock/web/uc/initMenu.json')
// const express = require('express')
// const app = express()
// const routes = express.Router()
// app.use('/web', routes)

module.exports = {
    devServer: {
        before(app) {
            // 如果是get请求，那么将post改为get即可
            app.post('/web/uc/initMenu',(req, res) => {
                res.json(initMenu)
            })
        }
    }
}


