<template>
    <el-dialog :visible.sync="firstDialogVisible" width="300px">
        <p style="margin-bottom:20px;">确认将{{userName}}设为一级分销?</p>
        <el-select v-model="channel" v-loading="loading" element-loading-spinner="el-icon-loading" clearable filterable placeholder="请选择上级区域" size="small">
            <el-option v-for="item in users" :key="item.uid" :label="item.userName" :value="item.uid">
                {{ item.userName }}
            </el-option>
        </el-select>
        <span slot="footer">
            <el-button @click="firstDialogVisible = false" size="small">取 消</el-button>
            <el-button @click="sureHandler" type="primary" size="small">确 认</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        value: false,
        dialogData: {}
    },
    data() {
        return {
            loading: false,
            firstDialogVisible: false,
            userName: '',
            channel: '',
            users: []
        }
    },
    watch: {
        value(val) {
            this.firstDialogVisible = val
            if (val) {
                this.userName = this.dialogData.userName
                this.channel = ''
                this.listUsers()
            }
        },
        firstDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        sureHandler() {
            if (!this.channel) {
                this.$message.error('请选择上级区域')
                return
            }
            let params = {}
            params.uid = this.dialogData.uid
            params.merType = 2
            params.channel = this.channel
            this.$apis.setAsMer(params).then(
                res => {
                    if (res.code === '2000') {
                        this.$message.success('设置成功')
                        this.firstDialogVisible = false
                        this.$parent.queryList()
                    } else {
                        this.$message.error(res.message)
                    }
                }
            ).catch(
                error => {
                    this.$message.error(error)
                }
            )
        },
        listUsers() {
            this.loading = true
            this.$apis.listUserInfoByMerType({ merType: 3 }).then((res) => {
                this.loading = false
                this.users = res.data
            }).catch((error) => {
                this.loading = false
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: error.message
                })
            })
        }
    }
}
</script>
