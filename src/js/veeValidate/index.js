import veeValidate from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'

// 配置表单验证
// 修改 veeValidate.Validator 来配置中文化提示
const { Validator } = veeValidate
Validator.addLocale(zh)

// 引入校验
/*
内置的校验规则如下：
after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
alpha - 只包含英文字符
alpha_dash - 可以包含英文、数字、下划线、破折号
alpha_num - 可以包含英文和数字
before:{target} - 和after相反
between:{min},{max} - 在min和max之间的数字
confirmed:{target} - 必须和target一样
date_between:{min,max} - 日期在min和max之间
date_format:{format} - 合法的format格式化日期
decimal:{decimals?} - 数字，而且是decimals进制
digits:{length} - 长度为length的数字
dimensions:{width},{height} - 符合宽高规定的图片
email - 不解释
ext:[extensions] - 后缀名
image - 图片
in:[list] - 包含在数组list内的值
ip - ipv4地址
max:{length} - 最大长度为length的字符
mimes:[list] - 文件类型
min - max相反
mot_in - in相反
numeric - 只允许数字
regex:{pattern} - 值必须符合正则pattern
required - 不解释
size:{kb} - 文件大小不超过
url:{domain?} - (指定域名的)url
*/
// 修改默认错误提示
const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => `${field}不能为空`,
            between: (field, data) => `${field}必须在${data[0]}~${data[1]}之间`,
            confirmed: (field, data) => `${field}必须与${data[0]}相匹配`,
            max: (field, data) => `${field}最大长度不能超过${data[0]}`,
            min: (field, data) => `${field}最小长度不能小于${data[0]}`,
            digits: (field, data) => `${field}必须为数字，且长度必须等于${data[0]}`,
            min_value: (field, data) => `${field}数值不能小于${data[0]}`,
            max_value: (field, data) => `${field}数值不能大于${data[0]}`,
            not_in: (field, data) => `${field}不能为${data.join(',')}`
        }
    }
}
Validator.updateDictionary(dictionary)
// 字符长度校验
Validator.extend('minMax', {
    messages: {
        zh_CN: (field, data) => `${field}长度必须在${data[0]}~${data[1]}之间`
    },
    validate: (value, data) => {
        return value.length >= parseInt(data[0]) && value.length <= parseInt(data[1])
    }
})

// 非中文字符校验
Validator.extend('noCN', {
    messages: {
        zh_CN: field => field + '不能包含中文字符'
    },
    validate: value => {
        return !/[\u4e00-\u9fa5]/.test(value)
    }
})

// 非双字节字符(包括汉字在内)
Validator.extend('noDoubleByte', {
    messages: {
        zh_CN: field => field + '不能包含汉字或中文标点符号'
    },
    validate: value => {
        /* eslint-disable no-control-regex */
        return !/[^\x00-\xff]/.test(value)
    }
})

// 根据,切割数量不能超过10
Validator.extend('limitByComma', {
    messages: {
        zh_CN: field => field + '数量不能超过100个'
    },
    validate: value => {
        return value.split(',').length < 101
    }
})

// 不能包含空格校验
Validator.extend('noSpace', {
    messages: {
        zh_CN: field => field + '不能包含空格'
    },
    validate: value => {
        return /^\S*$/.test(value)
    }
})

// 多个qq号校验
Validator.extend('qqs', {
    messages: {
        zh_CN: () => '请输入正确的qq号码，多个qq号使用英文符号隔开'
    },
    validate: value => {
        return /^[1-9]([0-9]{4,10})+(,[1-9]([0-9]{4,10}))*$/.test(value)
    }
})

// 手机号码校验
Validator.extend('mobile', {
    messages: {
        zh_CN: field => field + '格式不正确'
    },
    validate: value => {
        return value.length === 11 && /^(1\d{10})$/.test(value)
    }
})

// 特殊手机号码校验
Validator.extend('mobileSpecial', {
    messages: {
        zh_CN: field => field + '格式不正确'
    },
    validate: value => {
        return value.length === 11 && /^(1\d{10})$/.test(value)
    }
})

// 多个手机号校验
Validator.extend('mobiles', {
    messages: {
        zh_CN: () => '请输入正确的电话号码，多个电话号码使用英文符号隔开'
    },
    validate: value => {
        return /^(\d{4,11})+(,\d{4,11})*$/.test(value)
    }
})

// 数据长度校验
Validator.extend('maxArray', {
    messages: {
        zh_CN: (field, data) => '最多' + data[0] + '个' + field
    },
    validate: (value, data) => {
        return JSON.parse(value).length <= data[0]
    }
})

// 富文本限制字数
Validator.extend('editorWords', {
    messages: {
        zh_CN: () => '字数不超过1000'
    },
    validate: value => {
        value = value + ''
        const removeHtml = /<\/?.+?\/?>/g
        const translateEnglish = /[a-z]+[-']?[a-z]*/ig
        value = value.replace(removeHtml, '')
        value = value.replace(translateEnglish, '1')
        return value.length <= 1000
    }
})

// 正整数校验
Validator.extend('isInter', {
    messages: {
        zh_CN: (field, data) => `${field}必须为正整数`
    },
    validate: (value) => {
        return /^[1-9]*[1-9][0-9]*$/.test(value) || value === '0'
    }
})

// 一位小数或正整数校验
Validator.extend('isInterOrDecimalOne', {
    messages: {
        zh_CN: (field, data) => `${field}必须为最多一位小数的数字`
    },
    validate: (value) => {
        return /^\d+(\.\d{1})?$/.test(value)
    }
})

export default veeValidate