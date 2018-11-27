<template>
    <div>
        <div class="lk-toolbar">
            <el-button size="small" type="success" @click="addDialogVisible = true">添加分组</el-button>
        </div>
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            border>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="roleName" min-width="100" label="分组名称"></el-table-column>
            <el-table-column prop="remark" min-width="150" label="备注信息"></el-table-column>
            <el-table-column min-width="150" label="操作">
                <template slot-scope="scope">
                    <el-button @click="setRoleOperator(scope.row)" type="text">配置用户</el-button>
                    <el-button @click="setRoleMenu(scope.row)" type="text">配置权限</el-button>
                    <el-button @click="editRole(scope.row)" type="text">修改</el-button>
                    <el-button @click="deleteRole(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="queryList"
            :current-page.sync="queryParams.currentPage"
            :page-size="20"
            :total="total"
            layout="->, total, prev, pager, next, jumper">
        </el-pagination>
        <add-dialog v-model="addDialogVisible"></add-dialog>
        <edit-dialog v-model="editDialogVisible" :dialogData='rowData'></edit-dialog>
        <operator-dialog v-model="operatorDialogVisible" :dialogData='rowData'></operator-dialog>
        <menu-dialog v-model="menuDialogVisible" :dialogData='rowData'></menu-dialog>
    </div>
</template>

<script>
import addDialog from './addDialog'
import editDialog from './editDialog'
import operatorDialog from './operatorDialog'
import menuDialog from './menuDialog'

export default {
    data() {
        return {
            tableData: null,
            tableLoading: false,
            queryParams: {
                currentPage: 1
            },
            total: null,
            addDialogVisible: false,
            editDialogVisible: false,
            operatorDialogVisible: false,
            menuDialogVisible: false,
            rowData: null
        }
    },
    components: {
        addDialog,
        editDialog,
        operatorDialog,
        menuDialog
    },
    created() {
        this.queryList()
    },
    methods: {
        queryList() {
            this.tableLoading = true
            this.$apis.queryAllRole(this.queryParams).then(res => {
                this.tableLoading = false
                if (res.code === '2000') {
                    this.tableData = res.data.roleDtos
                    this.total = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.tableLoading = false
                this.$message.error(error)
            })
        },
        setRoleOperator(row) {
            this.operatorDialogVisible = true
            this.rowData = row
        },
        editRole(row) {
            this.rowData = row
            this.editDialogVisible = true
        },
        deleteRole(row) {
            this.$confirm(`确认删除${row.roleName}?`).then(_ => {
                this.$apis.deleteRole({ roleId: row.roleId }).then(
                    res => {
                        if (res.code === '2000') {
                            this.$message.success('删除成功')
                            this.queryList()
                        } else {
                            this.$message.error(res.message)
                        }
                    }
                ).catch(
                    error => {
                        this.$message.error(error)
                    }
                )
            }).catch(_ => {})
        },
        setRoleMenu(row) {
            this.rowData = row
            this.menuDialogVisible = true
        }
    }
}
</script>
