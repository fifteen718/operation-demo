import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fetch from './js/fetch'
import formatters from './js/formatters'
import veeValidate from './js/veeValidate'
import './assets/iconfont.css' // 自定义的icon

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 全局使用 element-ui
Vue.use(elementUi)

// 全局使用 vee-validate
Vue.use(veeValidate, {
    locale: 'zh_CN',
    fieldsBagName: 'errorBag',
    events: 'blur|input'
})

// vue原型挂载 - 请求接口函数
Vue.prototype.$apis = fetch(router)

// vue原型挂载 - 时间格式化插件
Vue.prototype.$moment = moment

// vue原型挂载 - 初始化平台信息，默认配置为【喵盟】
Vue.prototype.$brandInfo = {
    brandId: 1,
    brandName: '乐客'
}

// vue原型挂载 - 表格数据格式化函数
const formatKeys = Object.keys(formatters)
formatKeys.forEach((item) => {
    Vue.prototype[`$${item}`] = formatters[item]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
