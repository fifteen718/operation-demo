import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'welcome'
        },
        {
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "about" */ './views/404')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/login')
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import(/* webpackChunkName: "about" */ './views/layout'),
            children: [{
                path: '/welcome',
                name: 'welcome',
                component: resolve => require(['@/views/welcome'], resolve)
            }, {
                path: '/userDetail',
                name: 'userDetail',
                component: resolve => require(['@/views/userManage/userDetail'], resolve),
                meta: {
                    preTitle: '用户管理',
                    title: '用户管理'
                }
            }, {
                path: '/userLog',
                name: 'userLog',
                component: resolve => require(['@/views/userManage/userLog'], resolve),
                meta: {
                    preTitle: '用户管理',
                    title: '用户日志查询'
                }
            }, {
                path: '/userAssets',
                name: 'userAssets',
                component: resolve => require(['@/views/userManage/userAssets'], resolve),
                meta: {
                    preTitle: '用户管理',
                    title: '用户资产查询'
                }
            }, {
                path: '/appManage',
                name: 'appManage',
                component: resolve => require(['@/views/systemManage/appManage'], resolve),
                meta: {
                    preTitle: '系统管理',
                    title: 'APP版本管理'
                }
            }, {
                path: '/accountManage',
                name: 'accountManage',
                component: resolve => require(['@/views/systemManage/accountManage'], resolve),
                meta: {
                    preTitle: '系统管理',
                    title: '后台账号管理'
                }
            }, {
                path: '/roleManage',
                name: 'roleManage',
                component: resolve => require(['@/views/systemManage/roleManage'], resolve),
                meta: {
                    preTitle: '系统管理',
                    title: '分组权限管理'
                }
            }, {
                path: '/menusManage',
                name: 'menusManage',
                component: resolve => require(['@/views/systemManage/menusManage'], resolve),
                meta: {
                    preTitle: '系统管理',
                    title: '权限分配'
                }
            }, {
                path: '/pwdManage',
                name: 'pwdManage',
                component: resolve => require(['@/views/systemManage/pwdManage'], resolve),
                meta: {
                    preTitle: '系统管理',
                    title: '修改密码'
                }
            }]
        }
    ]
})
