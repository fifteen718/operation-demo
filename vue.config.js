// Vue CLI3 坑爹的地方 webpack配置需自建 vue.config.js
// 详见官方文档：https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
    // vue-router 'history'模式下 请取绝对路径 
    // baseUrl: process.env.NODE_ENV === 'production' ? '/operation-preview/' : '/'

    // vue-router 默认（'hash'）模式下 请取相对路径
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'
}
