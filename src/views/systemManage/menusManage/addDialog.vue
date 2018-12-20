<template>
    <el-dialog :title="title" :visible.sync="addDialogVisible" center>
        <el-form
        class="lk-form"
        label-position="right"
        label-width="100px">
            <el-form-item label="权限名">
                <el-input v-model="formData.menuName"></el-input>
            </el-form-item>
            <el-form-item label="权限路径">
                <el-input v-model="formData.menuPath"></el-input>
            </el-form-item>
            <el-form-item label="权限状态">
                <el-switch
                v-model="formData.menuStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
                <span style="margin-left: 10px; color: #409EFF">{{formData.menuStatus === true ? "有效" : "无效"}}</span>
            </el-form-item>
            <el-form-item label="权限图标">
                <el-select v-model="formData.menuIcon" placeholder="请选择">
                    <el-option
                    v-for="item in menuIcons"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    <span style="float: left; margin-top: 10px" :class="item.value"></span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限备注">
                <el-input v-model="formData.menuRemark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="submit">确 认</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        dialogData: {
            default: null
        }
    },
    data() {
        return {
            formData: {
                menuStatus: true
            },
            title: '',
            addDialogVisible: false,
            menuIcons: [{
                value: 'el-icon-setting',
                name: '设置'
            }, {
                value: 'el-icon-message',
                name: '消息'
            }, {
                value: 'el-icon-tickets',
                name: '记录'
            }, {
                value: 'el-icon-service',
                name: '客服'
            }, {
                value: 'el-icon-goods',
                name: '购物袋'
            }, {
                value: 'el-icon-star-off',
                name: '五角星'
            }, {
                value: 'el-icon-date',
                name: '日历'
            }, {
                value: 'el-icon-bell',
                name: '铃铛'
            }, {
                value: 'el-icon-view',
                name: '视野'
            }, {
                value: 'el-icon-location-outline',
                name: '定位'
            }, {
                value: 'el-icon-picture-outline',
                name: '图片'
            }]
        }
    },
    watch: {
        value(val) {
            this.addDialogVisible = val
            if (val) {
                if (this.dialogData.editable) {
                    // 修改权限
                    this.title = '修改权限'
                    this.formData = {
                        menuName: this.dialogData.menuName,
                        menuPath: this.dialogData.menuPath,
                        menuStatus: !this.dialogData.disabled,
                        menuIcon: this.dialogData.menuIcon,
                        menuRemark: this.dialogData.menuRemark
                    }
                } else {
                    // 添加权限
                    this.title = '添加权限'
                    this.formData = {
                        menuStatus: true
                    }
                }
                this.num = this.dialogData.num
            }
        },
        addDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        submit() {
            let params = { ...this.formData }
            if (this.dialogData.editable) {
                // 修改权限
                params.menuId = this.dialogData.menuId
                params.parentMenuId = this.dialogData.parentMenuId
            } else {
                // 添加权限
                params.menuId = 0
                params.parentMenuId = this.dialogData.menuId || 0
            }
            params.menuStatus = params.menuStatus ? 1 : 0
            params.menuType = params.parentMenuId ? 2 : 1
            this.$apis.addOrUpdateMenu(params).then(res => {
                if (res.code === '2000') {
                    this.addDialogVisible = false
                    this.$parent.queryMenu()
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.$message.error(error)
            })
        }
    }
}
</script>
