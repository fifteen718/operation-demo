# operation-demo
> 后台管理系统模板

## 功能简述
1. 主界面包含: 登录页面；首页；用户管理(用户资产查询、用户日志查询、用户管理)；系统管理（分组权限管理、APP版本管理、后台账号管理、权限分配、修改密码）。
2. 主功能包含: 本地mock数据；登录跳转；导航栏菜单伸缩；表单校验中文提示；列表查询的常用布局；弹窗的父子组件传值；树组件、嵌套列表的使用。

## 项目结构

```
.
├── README.md  ------------------------ 说明文件
├── package.json  --------------------- 项目配置
├── vue.config.js  -------------------- webpack配置入口
├── public  --------------------------- 入口文件
├──   ├── favicon.ico  ---------------- 网页图标
├──   └── index.html  ----------------- 入口页面
└── src  ------------------------------ 源码目录
    ├── assets  ----------------------- 项目资源文件目录（图片、字体等）
    ├── components  ------------------- 业务模块集合目录（组件）
    ├── js ---------------------------- 全局变量
    ├──  ├── fetch  ------------------- 请求配置 (axios ajax配置管理文件)
    ├──  ├── formatters  -------------- 数据格式化配置
    ├──  └── veeValidate -------------- 表单校验配置
    ├── views  ------------------------ 页面集合目录
    ├── App.less  --------------------- 主样式
    ├── App.vue  ---------------------- 主组件
    ├── main.js  ---------------------- 项目级入口配置文件
    └── router.js  -------------------- 路由配置
```

## 环境准备
``` bash
# 推荐使用yarn管理依赖
npm i yarn -g
yarn config set registry htts://registry.npm.taobao.org

# 安装依赖
yarn install

# 启动本地代理
yarn api

# 启动本地调试
yarn dev

# 启动本地代理并调试
yarn api_dev

# eslint格式校验
yarn lint

# 打包压缩
yarn build

```

## 所需技术栈

* [vue-cli](https://cli.vuejs.org/zh/) 项目脚手架
* [vue](https://cn.vuejs.org/) js框架
* [element-ui](http://element-cn.eleme.io/#/zh-CN) UI框架
* [vue-router](https://router.vuejs.org/zh/) 路由管理器
* [vee-validate](https://baianat.github.io/vee-validate/) 表单校验工具
* [less](http://lesscss.cn/) CSS预处理语言
* [eslint](https://eslint.org/) 代码规范的检查工具
* [yarn](https://yarn.bootcss.com/) 依赖管理工具
* [webpack](https://webpack.docschina.org/concepts/) 模块打包工具

## 友情提示
1. 如果`vee-validate`在项目运行时报错，请重新安装旧版本，操作如下：

`npm uninstall vee-validate` 或 `yarn remove vee-validate`

`npm install vee-validate@2.0.0-rc.25` 或 `yarn add vee-validate@2.0.0-rc.25`

2. 路由模式变更
router.js -> 路由切换history模式去URL中的#号，`mode: 'history'`
vue.config.js -> 注释掉`baseUrl: process.env.NODE_ENV === 'production' ? './' : '/'`即可
