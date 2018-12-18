<template>
    <el-dialog :title="'配置权限--' + roleName" :visible.sync="menuDialogVisible" center width="35%">
        <el-tree
            class="menuTree"
            :data="treeData"
            :props="treeProps"
            :default-checked-keys="treeCheckedKeys"
            ref="menuTree"
            node-key="menuId"
            show-checkbox
            default-expand-all>
        </el-tree>
        <div slot="footer">
            <el-button @click="menuDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        dialogData: {}
    },
    data() {
        return {
            menuDialogVisible: false,
            roleName: '',
            treeProps: {
                children: 'children',
                label: 'menuName'
            },
            treeCheckedKeys: [],
            treeData: []
        }
    },
    watch: {
        value(val) {
            this.menuDialogVisible = val
            if (val) {
                this.roleName = this.dialogData.roleName
                this.queryRoleMenu()
            }
        },
        menuDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        queryRoleMenu() {
            this.$apis.queryRoleMenu({ roleId: this.dialogData.roleId }).then(res => {
                if (res.code === '2000') {
                    this.treeCheckedKeys = res.data.checkedMenuIds
                    this.treeData = res.data.menuList
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.$message.error(error)
            })
        },
        submit() {
            let params = {}
            params.roleId = this.dialogData.roleId
            params.menuIds = [...this.$refs.menuTree.getCheckedKeys()]
            this.$apis.updateRoleMenu(params).then(res => {
                if (res.code === '2000') {
                    this.$message.success('配置成功')
                    this.menuDialogVisible = false
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

<style lang="less" scoped>
@import './menuDialog.less';
</style>
