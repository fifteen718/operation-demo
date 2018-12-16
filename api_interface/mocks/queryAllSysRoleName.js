/**
 * 查询所有角色
 * @url /web/sys/queryAllSysRoleName
 */
module.exports = function() {
    return {
        code: "2000",
        message: "成功",
        "data": [{
            "roleId": 1032141944136118274,
            "roleName": "运营",
            "remark": "tyj",
            "deleted": 0,
            "ctime": 1534916790405,
            "utime": 1535522471879
        },
        {
            "roleId": 1032169971003842561,
            "roleName": "研发",
            "remark": "ljl",
            "deleted": 0,
            "ctime": 1534923472531,
            "utime": 1534923472531
        },
        {
            "roleId": 1034103826430492673,
            "roleName": "测试",
            "remark": "我是角色备注",
            "deleted": 0,
            "ctime": 1535384539597,
            "utime": 1535384539597
        }]
    }
}
  