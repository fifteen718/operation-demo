<template>
    <el-dialog title="修改管理账号" :visible.sync="editDialogVisible" center>
        <el-form
        class="lk-form"
        label-position="right"
        label-width="100px">
            <el-form-item label="账号">
                <el-input
                :disabled="true"
                v-model="formData.account">
                </el-input>
            </el-form-item>
            <el-form-item label="姓名" :class="[errors.has('operatorName') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.operatorName"
                name="operatorName"
                data-vv-as="姓名"
                v-validate="'required|minMax:1,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('operatorName')">{{errors.first('operatorName')}}</div>
            </el-form-item>
            <el-form-item label="新密码" :class="[errors.has('password') ? 'is-error' : '']">
                <el-input
                v-model="formData.password"
                name="password"
                data-vv-as="密码"
                v-validate="'noSpace|noCN|minMax:6,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('password')">{{errors.first('password')}}</div>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="submit">确 认</el-button>
            <el-button @click="editDialogVisible = false">取 消</el-button>
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
            formData: {},
            editDialogVisible: false
        }
    },
    watch: {
        value(val) {
            this.editDialogVisible = val
            this.errors.clear()
            this.formData = { ...this.dialogData }
        },
        editDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    let data = {}
                    data.operatorId = this.formData.operatorId
                    data.operatorName = this.formData.operatorName
                    data.password = this.formData.password
                    this.$apis.addOrUpdateOperator(data).then(res => {
                        if (res.code === '2000') {
                            this.$message.success('修改成功')
                            this.editDialogVisible = false
                            this.$parent.queryList()
                        } else {
                            this.$message.error(res.message)
                        }
                    }).catch(error => {
                        this.$message.error(error)
                    })
                }
            })
        }
    }
}
</script>
