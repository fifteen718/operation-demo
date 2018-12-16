<template>
    <div>
        <div class="lk-toolbar">
            <el-button size="small" type="success" @click="addApp(null)">新增APP</el-button>
        </div>
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            height="100%"
            border>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="ctime" min-width="150" label="创建时间" :formatter="$dateFormatter"></el-table-column>
            <el-table-column prop="appName" min-width="150" label="名称"></el-table-column>
            <el-table-column prop="osType" min-width="150" label="平台" :formatter="$osTypeFormatter"></el-table-column>
            <el-table-column prop="version" min-width="150" label="版本号"></el-table-column>
            <el-table-column prop="pkgPath" min-width="150" label="源地址"></el-table-column>
            <el-table-column prop="remark" min-width="150" label="版本描述"></el-table-column>
            <el-table-column prop="size" min-width="150" label="包大小(M)"></el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button @click="addApp(scope.row)" type="text">编辑</el-button>
                    <el-button @click="deleteApp(scope.row)" type="text">删除</el-button>
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
        <add-dialog v-model="addDialogVisible" :dialogData='rowData'></add-dialog>
    </div>
</template>

<script>
import addDialog from './addDialog'

export default {
    data() {
        return {
            queryParams: {
                currentPage: 1
            },
            addDialogVisible: false,
            rowData: null,
            tableData: null,
            total: null,
            tableLoading: false
        }
    },
    components: {
        addDialog
    },
    created() {
        this.queryList()
    },
    methods: {
        queryList() {
            this.tableLoading = true
            this.$apis.queryApp(this.queryParams).then(res => {
                this.tableLoading = false
                if (res.code === '2000') {
                    this.tableData = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            }).catch(error => {
                this.tableLoading = false
                this.$message.error(error)
            })
        },
        addApp(row) {
            this.rowData = row
            this.addDialogVisible = true
        },
        deleteApp(row) {
            this.$confirm(`确认删除${row.appName}?`).then(_ => {
                this.$apis.deleteApp({ appId: row.appId }).then(
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
