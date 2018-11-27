<template>
    <div>
        <div class="lk-toolbar">
            <el-input size="small" clearable v-model.trim="queryParams.operatorName" placeholder="姓名"></el-input>
            <el-button size="small" type="primary" @click="queryList">搜索</el-button>
            <el-button size="small" type="success" @click="addDialogVisible = true">添加管理员</el-button>
        </div>
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            border>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="account" min-width="150" label="账号"></el-table-column>
            <el-table-column prop="operatorName" min-width="150" label="姓名"></el-table-column>
            <el-table-column prop="roleNames" label="分组" min-width="300">
                <template slot-scope="scope">
                    <label
                    v-for="role in scope.row.roleNames"
                    :key="role"
                    style="margin-right: 10px;">
                        {{role}}
                    </label>
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="150">
                 <template slot-scope="scope">
                    <el-tag disable-transitions
                    :type="scope.row.operatorStatus === 1 ? 'success' : 'danger'">
                        {{scope.row.operatorStatus === 1 ? '正常' : '冻结'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button @click="freezeAccount(scope.row)" type="text">
                        {{scope.row.operatorStatus === 0 ? '解冻' : '冻结'}}
                    </el-button>
                    <el-button @click="editAccount(scope.row)" type="text">修改</el-button>
                    <el-button @click="deleteAccount(scope.row)" type="text">删除</el-button>
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
    </div>
</template>

<script>
import addDialog from './addDialog'
import editDialog from './editDialog'

export default {
    data() {
        return {
            queryParams: {
                currentPage: 1
            },
            addDialogVisible: false,
            editDialogVisible: false,
            rowData: null,
            tableData: null,
            total: null,
            tableLoading: false
        }
    },
    components: {
        addDialog,
        editDialog
    },
    created() {
        this.queryList()
    },
    methods: {
        queryList() {
            this.tableLoading = true
            this.$apis.queryAllOperatorRole(this.queryParams).then(res => {
                this.tableLoading = false
                if (res.code === '2000') {
                    this.tableData = res.data.operatorDtos
                    this.total = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.tableLoading = false
                this.$message.error(error)
            })
        },
        editAccount(row) {
            this.rowData = row
            this.editDialogVisible = true
        },
        freezeAccount(row) {
            if (row.operatorStatus === 0) {
                this.$confirm(`确认解冻${row.operatorName}?`).then(_ => {
                    let params = {}
                    params.operatorId = row.operatorId
                    params.operatorStatus = 1
                    this.$apis.updateOperatorStatus(params).then(
                        res => {
                            if (res.code === '2000') {
                                this.$message.success('解冻成功')
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
            } else {
                this.$confirm(`确认冻结${row.operatorName}?`).then(_ => {
                    let params = {}
                    params.operatorId = row.operatorId
                    params.operatorStatus = 0
                    this.$apis.updateOperatorStatus(params).then(
                        res => {
                            if (res.code === '2000') {
                                this.$message.success('冻结成功')
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
            }
        },
        deleteAccount(row) {
            this.$confirm(`确认删除${row.operatorName}?`).then(_ => {
                this.$apis.deleteOperator({ operatorId: row.operatorId }).then(
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
        }
    }
}
</script>
