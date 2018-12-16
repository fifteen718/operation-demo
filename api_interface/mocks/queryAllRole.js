/**
 * 查询分组
 * @url /web/sys/queryAllRole
 */
module.exports = function() {
    return {
        code: "2000",
        message: "成功",
        "data": {
            "roleDtos": [
                {
                    "roleId": 10321419441361,
                    "roleName": "研发",
                    "remark": "测试用信息研发组",
                    "sysOperatorDtos": [
                        {
                            "operatorId": 1032141943175622658,
                            "operatorName": "小王"
                        },
                        {
                            "operatorId": 1032141988272779266,
                            "operatorName": "大王"
                        }
                    ]
                },
                {
                    "roleId": 10321419441322,
                    "roleName": "客服",
                    "remark": "客服组测试",
                    "sysOperatorDtos": [
                        {
                            "operatorId": 10321419431,
                            "operatorName": "小王1"
                        },
                        {
                            "operatorId": 10321419432,
                            "operatorName": "小王2"
                        },
                        {
                            "operatorId": 10321419433,
                            "operatorName": "小王3"
                        },
                        {
                            "operatorId": 10321419434,
                            "operatorName": "小王4"
                        },
                        {
                            "operatorId": 10321419435,
                            "operatorName": "大王5"
                        },
                        {
                            "operatorId": 10321419436,
                            "operatorName": "大王6"
                        }
                    ]
                },
                {
                    "roleId": 10321419441362,
                    "roleName": "运营",
                    "remark": "测试用备注信息",
                    "sysOperatorDtos": [
                        {
                            "operatorId": 1032169970106261506,
                            "operatorName": "张三"
                        },
                        {
                            "operatorId": 1032170661310783490,
                            "operatorName": "李四"
                        },
                        {
                            "operatorId": 10321910041,
                            "operatorName": "王五"
                        },
                        {
                            "operatorId": 103219100442,
                            "operatorName": "王刘"
                        },
                        {
                            "operatorId": 1032191004423,
                            "operatorName": "王期"
                        },
                        {
                            "operatorId": 10321910044234,
                            "operatorName": "王吧五"
                        },
                        {
                            "operatorId": 103219100442345,
                            "operatorName": "王就"
                        },
                        {
                            "operatorId": 1032191004423456,
                            "operatorName": "王是五"
                        },
                        {
                            "operatorId": 10321910044234547,
                            "operatorName": "王十一五"
                        },
                        {
                            "operatorId": 1032191004428,
                            "operatorName": "王十二五"
                        },
                        {
                            "operatorId": 10321910049,
                            "operatorName": "王是啊"
                        },
                        {
                            "operatorId": 10321910044210,
                            "operatorName": "申诉五"
                        },
                        {
                            "operatorId": 103219100442311,
                            "operatorName": "四是"
                        },
                        {
                            "operatorId": 10321910044234512,
                            "operatorName": "噢噢"
                        },
                        {
                            "operatorId": 10321910044213,
                            "operatorName": "已五"
                        },
                        {
                            "operatorId": 103219100442314,
                            "operatorName": "四的"
                        }
                    ]
                }
            ],
            "total": 2
        }
    }
}
  