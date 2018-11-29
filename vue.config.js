// Vue CLI3 坑爹的地方 webpack配置需自建 vue.config.js
// 详见官方文档：https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
    devServer: {
        proxy: {
            '/web/uc': {
                target: 'http://172.16.16.245:3000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/web/uc': '/api'
                }
            }
        }
    }
}


