const config = {
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
