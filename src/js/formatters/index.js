import moment from 'moment'
const formatters = {}

// 日期过滤
formatters.dateFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    } else {
        return '--'
    }
}

formatters.dateYmdFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return moment(Number(cellValue)).format('YYYY-MM-DD')
    } else {
        return '--'
    }
}

// 百分比格式化
formatters.rateFormatter = (row, column, cellValue, index) => {
    if (cellValue === 0) {
        return '0'
    } else {
        return (cellValue * 100).toFixed(2) + '%'
    }
}

// 表格空数据
formatters.emptyFormatter = (row, column, cellValue, index) => {
    if (cellValue || cellValue === 0) {
        return cellValue
    } else {
        return '--'
    }
}

// 金额后面增加两位
formatters.goldFormatter = (row, column, cellValue, index) => {
    if (cellValue) {
        return parseFloat(cellValue).toFixed(2)
    } else {
        return '0.00'
    }
}

// 日志类型
formatters.logTypeFormatter = (row, column, cellValue, index) => {
    let newVal = '--'
    switch (cellValue) {
    case 1:
        newVal = '登录'
        break
    case 2:
        newVal = '注册'
        break
    case 3:
        newVal = '修改登录密码'
        break
    case 4:
        newVal = '绑定手机'
        break
    case 5:
        newVal = '换绑手机'
        break
    case 6:
        newVal = '修改交易密码'
        break
    case 7:
        newVal = '重置密码'
        break
    default:
        newVal = '--'
        break
    }
    return newVal
}

// 注册来源
formatters.registerTypeFormatter = (row, column, cellValue, index) => {
    let newVal = '--'
    switch (cellValue) {
    case 1:
        newVal = 'uid'
        break
    case 2:
        newVal = '手机'
        break
    case 3:
        newVal = '微信'
        break
    default:
        newVal = '--'
        break
    }
    return newVal
}

// 是否vip
formatters.isVipFormatter = (row, column, cellValue, index) => {
    // true 是；false 否
    return cellValue ? '是' : '否'
}

// 账号类型
formatters.merTypeFormatter = (row, column, cellValue, index) => {
    let newVal = '--'
    switch (cellValue) {
    case 1:
        newVal = '普通用户'
        break
    case 2:
        newVal = '一级分销'
        break
    case 3:
        newVal = '区域代理'
        break
    default:
        newVal = '--'
        break
    }
    return newVal
}

// 性别
formatters.genderFormatter = (row, column, cellValue, index) => {
    // 1 女；0 男
    return cellValue ? '女' : '男'
}

// 平台类型
formatters.osTypeFormatter = (row, column, cellValue, index) => {
    // 1 iOS；2 Android
    return cellValue === 1 ? 'iOS' : 'Android'
}

// 用户状态
formatters.userStatusFormatter = (row, column, cellValue, index) => {
    // 1 正常；0 冻结
    return cellValue ? '正常' : '冻结'
}

// 用户段位 1.青铜 2.白银 3.黄金 4.铂金 5.钻石 6.至尊
formatters.levelFormatter = (row, column, cellValue, index) => {
    let newVal = '--'
    switch (cellValue) {
    case 1:
        newVal = '青铜'
        break
    case 2:
        newVal = '白银'
        break
    case 3:
        newVal = '黄金'
        break
    case 4:
        newVal = '铂金'
        break
    case 5:
        newVal = '钻石'
        break
    case 6:
        newVal = '至尊'
        break
    default:
        newVal = '--'
        break
    }
    return newVal
}

export default formatters
