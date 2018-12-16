/**
 * 初始化菜单栏
 * @url /web/uc/initMenu
 */
module.exports = function() {
    return {
        code: "2000",
        message: "成功",
        data: {
            "menus": [
                {
                    "children": [
                        {
                            "disabled": false,
                            "menuId": 1042981032974569500,
                            "menuName": "用户资产查询",
                            "menuPath": "userAssets",
                            "parentMenuId": 1042980791026143200
                        },
                        {
                            "disabled": false,
                            "menuId": 1042980989479637000,
                            "menuName": "用户日志查询",
                            "menuPath": "userLog",
                            "parentMenuId": 1042980791026143200
                        },
                        {
                            "disabled": false,
                            "menuId": 1042980918683979800,
                            "menuName": "用户管理",
                            "menuPath": "userDetail",
                            "parentMenuId": 1042980791026143200
                        }
                    ],
                    "disabled": false,
                    "menuIcon": "el-icon-setting",
                    "menuId": 1042980791026143200,
                    "menuName": "用户管理",
                    "menuPath": "userDetail",
                    "parentMenuId": 0
                },
                {
                    "children": [
                        {
                            "disabled": false,
                            "menuId": 1036138629233262600,
                            "menuName": "分组权限管理",
                            "menuPath": "roleManage",
                            "menuRemark": "我是权限备注",
                            "parentMenuId": 1032146087424770000
                        },
                        {
                            "disabled": false,
                            "menuIcon": "",
                            "menuId": 1032146280702492300,
                            "menuName": "APP版本管理",
                            "menuPath": "appManage",
                            "menuRemark": "“我是备注”",
                            "parentMenuId": 1032146087424770000
                        },
                        {
                            "disabled": false,
                            "menuIcon": "",
                            "menuId": 1032146280702492700,
                            "menuName": "后台帐号管理",
                            "menuPath": "accountManage",
                            "menuRemark": "“我是备注”",
                            "parentMenuId": 1032146087424770000
                        },
                        {
                            "disabled": false,
                            "menuIcon": "",
                            "menuId": 3432876543456432000,
                            "menuName": "权限分配",
                            "menuPath": "menusManage",
                            "menuRemark": "我是权限备注",
                            "parentMenuId": 1032146087424770000
                        },
                        {
                            "disabled": false,
                            "menuId": 34567650980909,
                            "menuName": "修改密码",
                            "menuPath": "pwdManage",
                            "menuRemark": "",
                            "parentMenuId": 1032146087424770000
                        }
                    ],
                    "disabled": false,
                    "menuIcon": "el-icon-setting",
                    "menuId": 1032146087424770000,
                    "menuName": "系统管理",
                    "menuPath": "a",
                    "menuRemark": "",
                    "parentMenuId": 0
                }
            ],
            "userInfo": {
                "userAccount": "admin",
                "userName": "超级管理员"
            }
        }
    }
}
  