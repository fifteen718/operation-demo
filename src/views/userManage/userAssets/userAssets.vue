<template>
    <div>
        <div class="lk-toolbar">
            <el-input
                size="small"
                :disabled="queryParams.mobile !== '' || queryParams.userName !== ''"
                :style="'width:' + (focusInput === 1 ? '169px;' : '100px;')"
                @focus="focusInput = 1"
                v-model.trim="queryParams.uid"
                placeholder="用户ID"
                clearable
                name="uid"
                data-vv-as="用户ID"
                v-validate="'numeric'"
                :class="[errors.has('uid') ? 'is-error-input' : '']">
            </el-input>
            <el-input
                size="small"
                :disabled="queryParams.uid !== '' || queryParams.userName !== ''"
                :style="'width:' + (focusInput === 2 ? '169px;' : '100px;')"
                @focus="focusInput = 2"
                v-model.trim="queryParams.mobile"
                placeholder="手机号"
                clearable
                name="mobile"
                data-vv-as="手机号"
                v-validate="'mobile'"
                :class="[errors.has('mobile') ? 'is-error-input' : '']">
            </el-input>
            <el-input
                size="small"
                :disabled="queryParams.mobile !== '' || queryParams.uid !== ''"
                :style="'width:' + (focusInput === 3 ? '169px;' : '100px;')"
                @focus="focusInput = 3"
                v-model.trim="queryParams.userName"
                placeholder="用户昵称"
                clearable>
            </el-input>
            <el-button size="small" type="primary" @click="queryList" :disabled="errors.has('uid') || errors.has('mobile')">搜索</el-button>
            <div class="el-input__error" v-if="errors.has('uid') || errors.has('mobile')">{{errors.first('uid') || errors.first('mobile')}}</div>
        </div>
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            @sort-change="sortEvent"
            border>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="uid" label="ID"></el-table-column>
            <el-table-column prop="userName" label="名字"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column label="状态">
                 <template slot-scope="scope">
                    <el-tag disable-transitions
                    :type="scope.row.userStatus === 1 ? 'success' : 'danger'">
                        {{scope.row.userStatus === 1 ? '正常' : '冻结'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="lkcBalance" label="LKC余额" sortable="custom" ></el-table-column>
            <el-table-column prop="consumeAmount" label="消费总金额" sortable="custom" ></el-table-column>
        </el-table>
        <el-pagination
            @current-change="queryList"
            :current-page.sync="queryParams.currentPage"
            :page-size="20"
            :total="total"
            layout="->, total, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryParams: {
                uid: '',
                mobile: '',
                userName: '',
                sortName: 'lkcBalance',
                sortType: 'desc',
                currentPage: 1
            },
            detailDialogVisible: false,
            editDialogVisible: false,
            rowData: null,
            tableData: null,
            total: null,
            tableLoading: false,
            focusInput: 0
        }
    },
    created() {
        this.queryList()
    },
    methods: {
        queryList() {
            // if (!this.queryParams.uid && !this.queryParams.mobile && !this.queryParams.userName) {
            //     this.$message.error('请输入用户ID或手机号或用户昵称')
            //     return
            // }
            this.tableLoading = true
            this.$apis.queryUserAssets(this.queryParams).then(res => {
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
        sortEvent({ prop, order }) {
            this.queryParams.sortName = prop
            this.queryParams.sortType = order === 'ascending' ? 'ASC' : 'DESC'
            this.queryList()
        }
    }
}
</script>
