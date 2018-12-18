const config = {
    // 如需使用yapi的mock数据 请将打开以下注释
    // 'localhost': {
    //     baseUrl: 'http://yapi.youximao.cn/mock/33/'
    // },
    'admin.dev.leke.com': {
        baseUrl: 'http://oms.dev.leke.com/'
    },
    'admin.test.leke.com': {
        baseUrl: 'http://oms.test.leke.com/'
    },
    'admin.leke.com': {
        baseUrl: 'https://oms.leke.com/'
    }
}

const configParams = config[location.hostname]

if (configParams) {
    window.baseUrl = configParams.baseUrl
}

const baseUrl = window.baseUrl

export default baseUrl
