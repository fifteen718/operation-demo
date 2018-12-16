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
            <el-select size="small" v-model="queryParams.userStatus" placeholder="账号状态" clearable>
                <el-option label="冻结中" :value="0"></el-option>
                <el-option label="正常" :value="1"></el-option>
            </el-select>
            <el-select size="small" v-model="queryParams.merType" placeholder="账号类型" clearable>
                <el-option label="普通用户" :value="1"></el-option>
                <el-option label="一级分销" :value="2"></el-option>
                <el-option label="区域代理" :value="3"></el-option>
            </el-select>
            <el-button size="small" type="primary" @click="queryList" :disabled="errors.has('uid') || errors.has('mobile')">搜索</el-button>
            <div class="el-input__error" v-if="errors.has('uid') || errors.has('mobile')">{{errors.first('uid') || errors.first('mobile')}}</div>
        </div>
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            height="100%"
            border>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="uid" label="ID"></el-table-column>
            <el-table-column prop="registerTime" width="180" label="注册时间" :formatter="$dateFormatter"></el-table-column>
            <el-table-column prop="userName" label="名字"></el-table-column>
            <el-table-column prop="gender" label="性别" :formatter="$genderFormatter"></el-table-column>
            <el-table-column prop="city" label="地区"></el-table-column>
            <el-table-column prop="registerType" label="注册方式" :formatter="$registerTypeFormatter"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="merType" label="账户类型" :formatter="$merTypeFormatter"></el-table-column>
            <el-table-column prop="level" label="用户段位" :formatter="$levelFormatter"></el-table-column>
            <el-table-column prop="isVip" label="299会员" :formatter="$isVipFormatter"></el-table-column>
            <el-table-column prop="power" label="算力值"></el-table-column>
            <el-table-column label="状态">
                 <template slot-scope="scope">
                    <el-tag disable-transitions
                    :type="scope.row.userStatus === 1 ? 'success' : 'danger'">
                        {{scope.row.userStatus === 1 ? '正常' : '冻结'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button @click="seeDetail(scope.row)" type="text">详情</el-button>
                    <el-button @click="freezeAccount(scope.row)" type="text">
                        {{scope.row.userStatus === 0 ? '解冻' : '冻结'}}
                    </el-button>
                    <template v-if="scope.row.merType === 1">
                        <el-button type="text" @click="setFirst(scope.row)">设为一级</el-button>
                        <el-button type="text" @click="setArea(scope.row)">设为区域</el-button>
                    </template>
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
        <detail-dialog v-model="detailDialogVisible" :dialogData='rowData'></detail-dialog>
        <first-dialog v-model="firstDialogVisible" :dialogData='rowData'></first-dialog>
    </div>
</template>

<script>
import detailDialog from './detailDialog'
import firstDialog from './firstDialog'

export default {
    data() {
        return {
            queryParams: {
                uid: '',
                mobile: '',
                userName: '',
                currentPage: 1
            },
            detailDialogVisible: false,
            firstDialogVisible: false,
            rowData: null,
            tableData: null,
            total: null,
            tableLoading: false,
            focusInput: 0
        }
    },
    components: {
        detailDialog,
        firstDialog
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
            this.$apis.queryUserDetail(this.queryParams).then(res => {
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
        seeDetail(row) {
            this.rowData = row
            this.detailDialogVisible = true
        },
        freezeAccount(row) {
            if (row.userStatus === 0) {
                this.$confirm(`确认解冻${row.userName}?`).then(_ => {
                    let params = {}
                    params.uid = row.uid
                    params.userStatus = 1
                    this.$apis.toggleUserStatus(params).then(
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
                this.$confirm(`确认冻结${row.userName}?`).then(_ => {
                    let params = {}
                    params.uid = row.uid
                    params.userStatus = 0
                    this.$apis.toggleUserStatus(params).then(
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
        setArea(row) {
            this.$confirm(`确认将${row.userName}设为区域代理?`).then(_ => {
                let params = {}
                params.uid = row.uid
                params.merType = 3
                params.channel = 0
                this.$apis.setAsMer(params).then(
                    res => {
                        if (res.code === '2000') {
                            this.$message.success('设置成功')
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
        setFirst(row) {
            this.firstDialogVisible = true
            this.rowData = row
        }
    }
}
</script>
