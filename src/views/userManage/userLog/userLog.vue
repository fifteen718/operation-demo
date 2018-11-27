<template>
    <div>
        <div class="lk-toolbar">
            <el-input
                size="small"
                :disabled="queryParams.mobile !== ''"
                :style="'width:' + (focusInput === 1 ? '169px;' : '100px;')"
                @focus="focusInput = 1"
                v-model.trim="queryParams.uid"
                placeholder="用户ID"
                clearable
                name="uid"
                data-vv-as="用户ID"
                v-validate="'numeric'"
                :class="[errors.has('uid') ? 'is-error-input' : '']">>
            </el-input>
            <el-input
                size="small"
                :disabled="queryParams.uid !== ''"
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
            <el-select size="small" v-model="queryParams.logType" placeholder="请选择日志类型" clearable>
                 <el-option
                    v-for="item in logTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" type="primary" @click="queryList" :disabled="errors.has('uid') || errors.has('mobile')">搜索</el-button>
            <div class="el-input__error" v-if="errors.has('uid') || errors.has('mobile')">{{errors.first('uid') || errors.first('mobile')}}</div>
        </div>
        <template v-if="showTable">
            <el-table
                :data="tableData"
                v-loading="tableLoading"
                element-loading-text="拼命加载中"
                border>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="ctime" label="操作时间" :formatter="$dateFormatter"></el-table-column>
                <el-table-column prop="uid" label="ID"></el-table-column>
                <el-table-column prop="ip" label="IP"></el-table-column>
                <el-table-column prop="logType" label="日志类型" :formatter="$logTypeFormatter"></el-table-column>
                <el-table-column v-if="queryLogType === 2" :key="queryLogType" label="注册方式">
                    <template slot-scope="scope">
                        {{scope.row.registerType === 2 ? `手机（${scope.row.mobile}）` : $registerTypeFormatter(null, null, scope.row.registerType)}}
                    </template>
                </el-table-column>
                <el-table-column v-if="queryLogType === 1" prop="mobile" label="手机号"></el-table-column>
                <el-table-column v-if="queryLogType === 4" prop="mobile" label="绑定手机号"></el-table-column>
                <template v-if="queryLogType === 5">
                    <el-table-column prop="mobileBefore" label="换绑前手机"></el-table-column>
                    <el-table-column prop="mobileAfter" label="换绑后手机"></el-table-column>
                </template>
                <template v-if="queryLogType !== 2">
                    <el-table-column prop="osVersion" label="设备型号"></el-table-column>
                    <el-table-column prop="deviceModel" label="设备系统"></el-table-column>
                </template>
            </el-table>
            <el-pagination
                @current-change="queryList"
                :current-page.sync="queryParams.currentPage"
                :page-size="20"
                :total="total"
                layout="->, total, prev, pager, next, jumper">
            </el-pagination>
        </template>
    </div>
</template>

<script>

export default {
    data() {
        return {
            queryParams: {
                uid: '',
                mobile: '',
                logType: null,
                currentPage: 1
            },
            logTypeOptions: [
                { value: 1, label: '登录日志' },
                { value: 2, label: '注册日志' },
                { value: 3, label: '修改密码' },
                { value: 4, label: '绑定手机' },
                { value: 5, label: '换绑手机' },
                { value: 6, label: '修改交易密码' },
                { value: 7, label: '重置密码' }
            ],
            detailDialogVisible: false,
            editDialogVisible: false,
            rowData: null,
            tableData: null,
            total: null,
            tableLoading: false,
            focusInput: 0,
            showTable: false,
            queryLogType: null
        }
    },
    methods: {
        queryList() {
            if (!this.queryParams.uid && !this.queryParams.mobile) {
                this.$message.error('请输入用户ID或手机号')
                return
            }
            if (!this.queryParams.logType) {
                this.$message.error('请选择日志类型')
                this.showTable = false
                return
            }
            this.queryLogType = this.queryParams.logType
            this.showTable = true
            this.tableLoading = true
            if (this.queryLogType === 5) {
                this.$apis.queryChangeMobileLogo(this.queryParams).then(res => {
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
            } else {
                this.$apis.queryLogInfo(this.queryParams).then(res => {
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
            }
        }
    }
}
</script>
