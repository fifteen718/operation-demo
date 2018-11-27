import axios from 'axios'
import baseURL from './baseUrlConfig.js'
const CancelToken = axios.CancelToken
function addCancel(config, $this, cancel) {
    if ($this) {
        config.CancelToken = new CancelToken(function executor(c) {
            $this[cancel] = c
        })
    }
}

const fetch = (router) => {
    const instance = axios.create({
        // 设置超时时间 -30秒
        timeout: 30000,
        // 请求的baseUrl
        baseURL: baseURL,
        // 请求头部信息
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 修改请求数据
        transformRequest: [function (data, headers) {
            let ret = ''
            for (let it in data) {
                // 去除空字符串的请求字段
                if (data[it] !== '' && data[it] !== undefined) {
                    if (ret !== '') ret += '&'
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                }
            }
            return ret
        }],
        // 跨域请求时允许携带凭证（cookie）
        withCredentials: process.env.NODE_ENV === 'production'
    })

    // 用户登录状态过期，路由重定向至登录界面
    instance.interceptors.response.use((res) => {
        if (res.data.code === '2001') {
            localStorage.clear()
            const route = router.history.pending || router.history.current
            if (route.path !== '/login' || route.name !== '404') {
                router.replace('/login')
            }
            return Promise.reject(res.data)
        }
        if (!res) {
            return Promise.reject(res)
        }
        return res.data
    }, (error) => {
        return Promise.reject(error)
    })

    function createAPI(url, method, data, $this, cancel) {
        let config = {
            method: method,
            url: url,
            data
        }
        addCancel(config, $this, cancel)
        return instance(config)
    }

    const apis = {
        /* 登录模块 -- start */
        // 登录接口
        login: (data, $this, cancel) => createAPI('/web/uc/login', 'post', data, $this, cancel),
        // 登出接口
        logout: (data, $this, cancel) => createAPI('/web/uc/logout', 'post', data, $this, cancel),
        // 修改密码
        resetPwd: (data, $this, cancel) => createAPI('/web/uc/resetPwd', 'post', data, $this, cancel),
        // 菜单初始化
        initMenu: (data, $this, cancel) => createAPI('/web/uc/initMenu', 'post', data, $this, cancel),
        /* 登录模块 -- end */

        /* 用户管理 -- start */
        // 查询用户信息列表
        queryUserDetail: (data, $this, cancel) => createAPI('/web/uc/queryUserDetail', 'post', data, $this, cancel),
        // tab - 基础信息
        getUserBaseInfo: (data, $this, cancel) => createAPI('/web/uc/getUserBaseInfo', 'post', data, $this, cancel),
        // tab - 资产信息
        getLkc: (data, $this, cancel) => createAPI('/web/uc/getLkc', 'post', data, $this, cancel),
        // tab - 路演信息
        queryActivityInfo: (data, $this, cancel) => createAPI('/web/activity/queryActivityInfo', 'post', data, $this, cancel),
        // tab - 投票信息
        queryActivityVoteInfo: (data, $this, cancel) => createAPI('/web/activity/queryActivityVoteInfo', 'post', data, $this, cancel),
        // 冻结解冻用户
        toggleUserStatus: (data, $this, cancel) => createAPI('/web/uc/toggleUserStatus', 'post', data, $this, cancel),
        // 设置一级分销或区域代理
        setAsMer: (data, $this, cancel) => createAPI('/web/uc/setAsMer', 'post', data, $this, cancel),
        // 根据merType查询用户信息
        listUserInfoByMerType: (data, $this, cancel) => createAPI('/web/uc/listUserInfoByMerType', 'post', data, $this, cancel),
        // 分页查询用户资产信息
        queryUserAssets: (data, $this, cancel) => createAPI('/web/uc/queryUserAssets', 'post', data, $this, cancel),
        // 用户日志查询
        queryLogInfo: (data, $this, cancel) => createAPI('/web/uc/queryLogInfo', 'post', data, $this, cancel),
        // 用户日志查询--换绑手机号
        queryChangeMobileLogo: (data, $this, cancel) => createAPI('/web/uc/queryChangeMobileLogo', 'post', data, $this, cancel),
        /* 用户管理 -- end */

        /* APP版本管理 -- start */
        // 查询APP
        queryApp: (data, $this, cancel) => createAPI('/web/app/queryApp', 'post', data, $this, cancel),
        // 添加或修改APP
        saveOrUpdateApp: (data, $this, cancel) => createAPI('/web/app/saveOrUpdateApp', 'post', data, $this, cancel),
        // 删除APP
        deleteApp: (data, $this, cancel) => createAPI('/web/app/deleteApp', 'post', data, $this, cancel),
        /* APP版本管理 -- end */

        /* 后台账号管理 -- start */
        // 查询账号
        queryAllOperatorRole: (data, $this, cancel) => createAPI('/web/sys/queryAllOperatorRole', 'post', data, $this, cancel),
        // 查询所有分组
        queryAllSysRoleName: (data, $this, cancel) => createAPI('/web/sys/queryAllSysRoleName', 'post', data, $this, cancel),
        // 添加或修改账号
        addOrUpdateOperator: (data, $this, cancel) => createAPI('/web/sys/addOrUpdateOperator', 'post', data, $this, cancel),
        // 更新账户状态（冻结/解冻）
        updateOperatorStatus: (data, $this, cancel) => createAPI('/web/sys/updateOperatorStatus', 'post', data, $this, cancel),
        // 删除账户
        deleteOperator: (data, $this, cancel) => createAPI('/web/sys/deleteOperator', 'post', data, $this, cancel),
        /* 后台账号管理 -- end */

        /* 分组权限管理 -- start */
        // 查询分组
        queryAllRole: (data, $this, cancel) => createAPI('/web/sys/queryAllRole', 'post', data, $this, cancel),
        // 添加或修改分组
        addOrUpdateRole: (data, $this, cancel) => createAPI('/web/sys/addOrUpdateRole', 'post', data, $this, cancel),
        // 删除分组
        deleteRole: (data, $this, cancel) => createAPI('/web/sys/deletedRole', 'post', data, $this, cancel),
        // 查询分组用户
        queryRoleOperator: (data, $this, cancel) => createAPI('/web/sys/queryRoleOperator', 'post', data, $this, cancel),
        // 添加分组用户
        addRoleOperator: (data, $this, cancel) => createAPI('/web/sys/addRoleOperator', 'post', data, $this, cancel),
        // 移除分组用户
        removeRoleOperator: (data, $this, cancel) => createAPI('/web/sys/removeRoleOperator', 'post', data, $this, cancel),
        // 查询分组菜单
        queryRoleMenu: (data, $this, cancel) => createAPI('/web/sys/queryRoleMenu', 'post', data, $this, cancel),
        // 配置分组菜单
        updateRoleMenu: (data, $this, cancel) => createAPI('/web/sys/updateRoleMenu', 'post', data, $this, cancel),
        /* 分组权限管理 -- end */

        /* 权限分配 -- start */
        // 修改菜单状态 有效/失效
        updateMenuStatus: (data, $this, cancel) => createAPI('/web/sys/updateMenuStatus', 'post', data, $this, cancel),
        // 删除菜单
        deleteMenu: (data, $this, cancel) => createAPI('/web/sys/deleteMenu', 'post', data, $this, cancel),
        // 添加或修改菜单
        addOrUpdateMenu: (data, $this, cancel) => createAPI('/web/sys/addOrUpdateMenu', 'post', data, $this, cancel),
        /* 权限分配 -- end */

        /* 消息管理 -- start */
        // 消息列表
        queryMsg: (data, $this, cancel) => createAPI('/web/msg/queryMsg', 'post', data, $this, cancel),
        // 删除菜单
        deleteMsg: (data, $this, cancel) => createAPI('/web/msg/deleteMsg', 'post', data, $this, cancel),
        // 查看消息
        getMsg: (data, $this, cancel) => createAPI('/web/msg/getMsg', 'post', data, $this, cancel),
        // 添加消息
        addMsg: (data, $this, cancel) => createAPI('/web/msg/addMsg', 'post', data, $this, cancel),
        /* 消息管理 -- end */

        /* 开屏页管理 -- start */
        // 开屏页展示
        queryGuide: (data, $this, cancel) => createAPI('/web/sys/queryGuideAd', 'post', data, $this, cancel),
        // 添加或编辑开屏页
        addOrUpdateSysGuideAd: (data, $this, cancel) => createAPI('/web/sys/addOrUpdateSysGuideAd', 'post', data, $this, cancel),
        // 删除开屏页
        deletedGuide: (data, $this, cancel) => createAPI('/web/sys/deletedGuide', 'post', data, $this, cancel),
        // 启用或者关闭
        resetAdStatus: (data, $this, cancel) => createAPI('/web/sys/resetAdStatus', 'post', data, $this, cancel),
        // 获取该平台类型的数量
        osTypeNumber: (data, $this, cancel) => createAPI('/web/sys/osTypeNumber', 'post', data, $this, cancel),
        // 获取图片
        getImageUploadInfo: (data, $this, cancel) => createAPI('/web/sys/getImageUploadInfo', 'post', data, $this, cancel),
        /* 开屏页管理 -- end */

        /* 行业管理 -- start */
        // 分类展示
        queryCategory: (data, $this, cancel) => createAPI('/web/sys/queryCategory', 'post', data, $this, cancel),
        // 添加分类
        addCategory: (data, $this, cancel) => createAPI('/web/sys/addCategory', 'post', data, $this, cancel),
        // 修改分类
        updateCategory: (data, $this, cancel) => createAPI('/web/sys/updateCategory', 'post', data, $this, cancel),
        // 获取所有二级行业分类
        listProfession: (data, $this, cancel) => createAPI('/web/sys/listProfession', 'post', data, $this, cancel),
        /* 行业管理 -- end */

        /* BANNER -- start */
        // 新增Banner
        saveBanner: (data, $this, cancel) => createAPI('/web/banner/saveBanner', 'post', data, $this, cancel),
        // 删除Banner
        deleteBanner: (data, $this, cancel) => createAPI('/web/banner/deleteBanner', 'post', data, $this, cancel),
        // 修改Banner
        updateBanner: (data, $this, cancel) => createAPI('/web/banner/updateBanner', 'post', data, $this, cancel),
        // 查询所有Banner
        queryAllBanner: (data, $this, cancel) => createAPI('/web/banner/queryBanner', 'post', data, $this, cancel),
        /* BANNER -- end */

        /* 路演活动管理模块 -- start */
        // 添加标签
        addTag: (data, $this, cancel) => createAPI('/web/activity/addTag', 'post', data, $this, cancel),
        // 获取视频上传临时凭证
        getVideoUploadAuth: (data, $this, cancel) => createAPI('/web/activity/getVideoUploadAuth', 'post', data, $this, cancel),
        // 查询所有活动标签
        listAllTags: (data, $this, cancel) => createAPI('/web/activity/listAllTags', 'post', data, $this, cancel),
        // 编辑标签
        updateTag: (data, $this, cancel) => createAPI('/web/activity/updateTag', 'post', data, $this, cancel),
        // 删除标签
        deleteTag: (data, $this, cancel) => createAPI('/web/activity/deleteTag', 'post', data, $this, cancel),
        // 分页查询活动标签
        queryTags: (data, $this, cancel) => createAPI('/web/activity/queryTags', 'post', data, $this, cancel),
        // 创建活动
        addActivity: (data, $this, cancel) => createAPI('/web/activity/addActivity', 'post', data, $this, cancel),
        // 查询活动详情
        getActivityDetail: (data, $this, cancel) => createAPI('/web/activity/getActivityDetail', 'post', data, $this, cancel),
        // 分页查询活动
        queryActivities: (data, $this, cancel) => createAPI('/web/activity/queryActivities', 'post', data, $this, cancel),
        // 编辑活动
        updateActivity: (data, $this, cancel) => createAPI('/web/activity/updateActivity', 'post', data, $this, cancel),
        // 删除活动
        deleteActivity: (data, $this, cancel) => createAPI('/web/activity/deleteActivity', 'post', data, $this, cancel),
        // 上下架活动
        updateActivityStatus: (data, $this, cancel) => createAPI('/web/activity/updateActivityStatus', 'post', data, $this, cancel),
        // 根据进度查询活动列表
        listActivityByProcess: (data, $this, cancel) => createAPI('/web/activity/listActivityByProcess', 'post', data, $this, cancel),
        // 添加项目
        addProject: (data, $this, cancel) => createAPI('/web/activity/addProject', 'post', data, $this, cancel),
        // 查看项目详情
        getProject: (data, $this, cancel) => createAPI('/web/activity/getProject', 'post', data, $this, cancel),
        // 分页查询项目
        queryProjects: (data, $this, cancel) => createAPI('/web/activity/queryProjects', 'post', data, $this, cancel),
        // 编辑项目
        updateProject: (data, $this, cancel) => createAPI('/web/activity/updateProject', 'post', data, $this, cancel),
        // 上下架项目
        updateProjectStatus: (data, $this, cancel) => createAPI('/web/activity/updateProjectStatus', 'post', data, $this, cancel),
        // 删除项目
        deleteProject: (data, $this, cancel) => createAPI('/web/activity/deleteProject', 'post', data, $this, cancel),
        // 查询未开始/报名中活动
        listActivityNotStartOrEnrolling: (data, $this, cancel) => createAPI('/web/activity/listActivityNotStartOrEnrolling', 'post', data, $this, cancel),
        // 编辑项目时--查看项目详情
        getForUpdating: (data, $this, cancel) => createAPI('/web/activity/getProjectForUpdating', 'post', data, $this, cancel),
        /* 路演活动管理模块 -- end */

        /* 音频模块模块 -- start */
        // 新增音频
        saveAlbum: (data, $this, cancel) => createAPI('/web/album/saveAlbum', 'post', data, $this, cancel),
        // 修改音频
        updateAlbum: (data, $this, cancel) => createAPI('/web/album/updateAlbum', 'post', data, $this, cancel),
        // 查询所有专辑标签
        queryAllAlbumTag: (data, $this, cancel) => createAPI('/web/albumTag/queryAllAlbumTag', 'post', data, $this, cancel),
        // 查询专辑标签
        getAlbumTag: (data, $this, cancel) => createAPI('/web/albumTag/getAlbumTag', 'post', data, $this, cancel),
        // 所有标签
        queryList: (data, $this, cancel) => createAPI('/web/albumTag/queryList', 'post', data, $this, cancel),
        // 查询专辑
        queryAlbum: (data, $this, cancel) => createAPI('/web/album/queryAlbum', 'post', data, $this, cancel),
        // 上下架专辑
        toggleAlbum: (data, $this, cancel) => createAPI('/web/album/toggleAlbum', 'post', data, $this, cancel),
        // 删除专辑
        deleteAlbum: (data, $this, cancel) => createAPI('/web/album/deleteAlbum', 'post', data, $this, cancel),
        // 查询专辑所包含的音频
        queryAudio: (data, $this, cancel) => createAPI('/web/album/queryAudio', 'post', data, $this, cancel),
        // 新增音频
        saveAudio: (data, $this, cancel) => createAPI('/web/audio/saveAudio', 'post', data, $this, cancel),
        // 根据id获取专辑
        getAlbum: (data, $this, cancel) => createAPI('/web/album/getAlbum', 'post', data, $this, cancel),
        // 编辑音频
        updateAudio: (data, $this, cancel) => createAPI('/web/audio/updateAudio', 'post', data, $this, cancel),
        // 新增专辑标签
        saveAlbumTag: (data, $this, cancel) => createAPI('/web/albumTag/saveAlbumTag', 'post', data, $this, cancel),
        // 删除专辑标签
        deleteAlbumTag: (data, $this, cancel) => createAPI('/web/albumTag/deleteAlbumTag', 'post', data, $this, cancel),
        // 查询音频
        queryAudioModel: (data, $this, cancel) => createAPI('/web/audio/queryAudio', 'post', data, $this, cancel),
        // 删除音频
        deleteAudio: (data, $this, cancel) => createAPI('/web/audio/deleteAudio', 'post', data, $this, cancel),
        // 上下架音频
        toggleAudio: (data, $this, cancel) => createAPI('/web/audio/toggleAudio', 'post', data, $this, cancel),
        // 获取专辑名称id
        getAlbumName: (data, $this, cancel) => createAPI('/web/audio/getAlbumName', 'post', data, $this, cancel),
        // 专辑频道列表
        listChannel: (data, $this, cancel) => createAPI('/web/channel/listChannel', 'post', data, $this, cancel),
        // 模糊查询专辑创作者
        listCreator: (data, $this, cancel) => createAPI('/web/album/listCreator', 'post', data, $this, cancel),
        /* 音频模块模块 -- end */

        /* 数据统计管理模块 -- start */
        // 按日统计
        queryDailyStatis: (data, $this, cancel) => createAPI('/web/statis/queryDailyStatis', 'post', data, $this, cancel),
        // 邀请好友数据统计
        queryInviterFriendDailyStatis: (data, $this, cancel) => createAPI('/web/statis/queryInviterFriendDailyStatis', 'post', data, $this, cancel),
        // 宝箱充值按日统计
        queryBoxPaymentDailyStatis: (data, $this, cancel) => createAPI('/web/statis/queryBoxPaymentDailyStatis', 'post', data, $this, cancel),
        // LKC发放按周统计
        queryLkcIssueDailyStatis: (data, $this, cancel) => createAPI('/web/statis/queryLkcIssueDailyStatis', 'post', data, $this, cancel),
        /* 数据统计管理模块 -- end */

        /* 数据明细管理模块 -- start */
        // 邀请好友奖励明细
        queryInviteDetail: (data, $this, cancel) => createAPI('/web/detail/queryInviteDetail', 'post', data, $this, cancel),
        // 用户购买宝箱明细
        queryTreasureBoxDetail: (data, $this, cancel) => createAPI('/web/detail/queryTreasureBoxDetail', 'post', data, $this, cancel),
        // 299会员购买明细
        queryVipDetail: (data, $this, cancel) => createAPI('/web/detail/queryVipDetail', 'post', data, $this, cancel),
        // 用户LKC账户变动明细
        queryLkcFlowDetail: (data, $this, cancel) => createAPI('/web/detail/queryLkcFlowDetail', 'post', data, $this, cancel)
        /* 数据明细管理模块 -- end */
    }
    return apis
}

export default fetch
