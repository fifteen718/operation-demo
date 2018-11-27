<template>
    <div>
        <div class="lk-toolbar">
            <el-button size="small" type="success" @click="addMenu">添加权限</el-button>
        </div>
        <el-table :data="listData" border :row-class-name="tableRowClassName">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.children" border :show-header="false" :row-class-name="tableRowClassName">
                        <el-table-column prop="menuName" label="子菜单"></el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <template v-if="scope.row.disabled">
                                    <el-button @click="toggleOpen(scope.row)" type="text">激活</el-button>
                                </template>
                                <template v-else>
                                    <el-button @click="toggleOpen(scope.row)" type="text">失效</el-button>
                                </template>
                                <el-button @click="addMenu(scope.row, true)" type="text">修改</el-button>
                                <el-button @click="deleteMenu(scope.row)" type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="menuName" label="权限列表"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <template v-if="scope.row.disabled">
                        <el-button @click="toggleOpen(scope.row)" type="text">激活</el-button>
                    </template>
                    <template v-else>
                        <el-button @click="toggleOpen(scope.row)" type="text">失效</el-button>
                    </template>
                    <el-button @click="addMenu(scope.row, true)" type="text">修改</el-button>
                    <el-button @click="addMenu(scope.row, false)" type="text">添加</el-button>
                    <el-button @click="deleteMenu(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-dialog v-model="addDialogVisible" :dialogData="menuData"></add-dialog>
    </div>
</template>

<script>
import addDialog from './addDialog'

export default {
    data() {
        return {
            addDialogVisible: false,
            listData: [],
            menuData: null
        }
    },
    components: {
        addDialog
    },
    created() {
        this.queryMenu()
    },
    methods: {
        queryMenu() {
            this.$apis.queryRoleMenu().then(res => {
                if (res.code === '2000') {
                    this.listData = res.data.menuList
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.$message.error(error)
            })
        },
        addMenu(row, editable) {
            this.menuData = row
            this.menuData.editable = editable
            this.addDialogVisible = true
        },
        toggleOpen(row) {
            this.$confirm(row.disabled ? '确认设为有效？' : '确认设为失效？').then(_ => {
                let params = {}
                params.menuId = row.menuId
                params.menuStatus = row.disabled ? 1 : 0
                this.$apis.updateMenuStatus(params).then(res => {
                    if (res.code === '2000') {
                        this.queryMenu()
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(error => {
                    this.$message.error(error)
                })
            }).catch(_ => {})
        },
        deleteMenu(row) {
            this.$confirm(`确认删除${row.menuName}?`).then(_ => {
                this.$apis.deleteMenu({ menuId: row.menuId }).then(res => {
                    if (res.code === '2000') {
                        this.queryMenu()
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(error => {
                    this.$message.error(error)
                })
            }).catch(_ => {})
        },
        tableRowClassName({ row, rowIndex }) {
            if (row.disabled) {
                return 'disabled-row'
            } else {
                return ''
            }
        }
    }
}
</script>

<style lang="less">
@import './menusManage.less';
</style>
