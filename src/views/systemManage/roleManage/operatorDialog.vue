<template>
    <el-dialog :title="'配置用户--' + roleName" :visible.sync="operatorDialogVisible" center width="60%">
        <el-row>
            <el-col :span="9">
                <el-table
                    :data="outTableData"
                    v-loading="outTableLoading"
                    element-loading-text="拼命加载中"
                    @selection-change="outTableSelChange"
                    max-height="450"
                    size="small"
                    border>
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="operatorName" label="未分配用户"></el-table-column>
                </el-table>
                <el-pagination
                    @current-change="queryOutTable"
                    :current-page.sync="queryOutParams.currentPage"
                    :page-size="20"
                    :total="outTableTotal"
                    layout="->, total, prev, pager, next">
                </el-pagination>
            </el-col>
            <el-col :span="6" class="centerBtns">
                <div>
                    <el-button type="success" :disabled="addBtnDisabled" @click="addRoleOperator"> 添 加 &gt; &gt; </el-button>
                </div>
                <div>
                    <el-button type="danger" :disabled="removeBtnDisabled" @click="removeRoleOperator"> &lt; &lt; 移 除 </el-button>
                </div>
            </el-col>
            <el-col :span="9">
                <el-table
                    :data="inTableData"
                    v-loading="inTableLoading"
                    element-loading-text="拼命加载中"
                    @selection-change="inTableSelChange"
                    max-height="450"
                    size="small"
                    border>
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="operatorName" label="已分配用户"></el-table-column>
                </el-table>
                <el-pagination
                    @current-change="queryInTable"
                    :current-page.sync="queryInParams.currentPage"
                    :page-size="20"
                    :total="inTableTotal"
                    layout="->, total, prev, pager, next">
                </el-pagination>
            </el-col>
        </el-row>
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
            operatorDialogVisible: false,
            outTableData: null,
            outTableLoading: false,
            outTableTotal: null,
            queryOutParams: {
                currentPage: 1,
                status: 0
            },
            inTableData: null,
            inTableLoading: false,
            inTableTotal: null,
            queryInParams: {
                currentPage: 1,
                status: 1
            },
            addBtnDisabled: true,
            removeBtnDisabled: true,
            addArray: [],
            removeArray: [],
            roleName: ''
        }
    },
    watch: {
        value(val) {
            this.operatorDialogVisible = val
            if (val) {
                this.roleName = this.dialogData.roleName
                this.queryOutParams.roleId = this.dialogData.roleId
                this.queryInParams.roleId = this.dialogData.roleId
                this.queryOutTable()
                this.queryInTable()
            }
        },
        operatorDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        queryOutTable() {
            this.outTableLoading = true
            this.$apis.queryRoleOperator(this.queryOutParams).then(res => {
                this.outTableLoading = false
                if (res.code === '2000') {
                    this.outTableData = res.data.sysOperatorDtos
                    this.outTableTotal = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.outTableLoading = false
                this.$message.error(error)
            })
        },
        queryInTable() {
            this.inTableLoading = true
            this.$apis.queryRoleOperator(this.queryInParams).then(res => {
                this.inTableLoading = false
                if (res.code === '2000') {
                    this.inTableData = res.data.sysOperatorDtos
                    this.inTableTotal = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.inTableLoading = false
                this.$message.error(error)
            })
        },
        outTableSelChange(val) {
            if (val.length > 0) {
                this.addBtnDisabled = false
            } else {
                this.addBtnDisabled = true
            }
            this.addArray = val
        },
        inTableSelChange(val) {
            if (val.length > 0) {
                this.removeBtnDisabled = false
            } else {
                this.removeBtnDisabled = true
            }
            this.removeArray = val
        },
        addRoleOperator() {
            let addParams = {}
            addParams.roleId = this.dialogData.roleId
            addParams.operatorId = this.addArray.map(item => item.operatorId)
            this.$apis.addRoleOperator(addParams).then(res => {
                if (res.code === '2000') {
                    this.queryOutTable()
                    this.queryInTable()
                    this.$parent.queryList()
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.$message.error(error)
            })
        },
        removeRoleOperator() {
            let removeParams = {}
            removeParams.roleId = this.dialogData.roleId
            removeParams.operatorId = this.removeArray.map(item => item.operatorId)
            this.$apis.removeRoleOperator(removeParams).then(res => {
                if (res.code === '2000') {
                    this.queryOutTable()
                    this.queryInTable()
                    this.$parent.queryList()
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
@import './operatorDialog.less';
</style>
