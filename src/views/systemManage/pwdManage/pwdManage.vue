<template>
    <el-form
        label-position="right"
        label-width="100px"
        class="lk-form"
        :model="formData">
        <el-form-item label="原密码" :class="[errors.has('oldPwd') ? 'is-error' : '', 'is-required']">
            <el-input
                v-model="formData.oldPwd"
                placeholder="请输入原密码"
                auto-complete="off"
                name="oldPwd"
                data-vv-as="密码"
                v-validate="'required|noSpace|noCN|minMax:6,18'">
            </el-input>
            <div class="el-form-item__error" v-if="errors.has('oldPwd')">{{errors.first('oldPwd')}}</div>
        </el-form-item>
        <el-form-item label="新密码" :class="[errors.has('newPwd') ? 'is-error' : '', 'is-required']">
            <el-input
                type="password"
                v-model="formData.newPwd"
                placeholder="请输入新密码"
                auto-complete="off"
                name="newPwd"
                data-vv-as="密码"
                v-validate="'required|noSpace|noCN|minMax:6,18'"></el-input>
            <div class="el-form-item__error" v-if="errors.has('newPwd')">{{errors.first('newPwd')}}</div>
        </el-form-item>
        <el-form-item label="确认新密码" :class="[errors.has('checkPwd') ? 'is-error' : '', 'is-required']">
            <el-input
                type="password"
                v-model="formData.checkPwd"
                placeholder="请再次输入新密码"
                auto-complete="off"
                name="checkPwd"
                data-vv-as="密码"
                v-validate="'required|noSpace|noCN|minMax:6,18'"></el-input>
            <div class="el-form-item__error" v-if="errors.has('checkPwd')">{{errors.first('checkPwd')}}</div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">确认</el-button>
            <el-button @click="resetForm">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        submitForm() {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    if (this.formData.newPwd !== this.formData.checkPwd) {
                        this.$message.error('新密码输入不一致')
                        return
                    }
                    let params = {}
                    params.oldPwd = this.formData.oldPwd
                    params.newPwd = this.formData.newPwd
                    this.$apis.resetPwd(params).then(
                        res => {
                            if (res.code === '2000') {
                                this.$message.success('修改成功')
                                this.resetForm()
                            } else {
                                this.$message.error(res.message)
                            }
                        }
                    ).catch(
                        error => {
                            this.$message.error(error)
                        }
                    )
                }
            })
        },
        resetForm() {
            this.errors.clear()
            this.formData = {}
        }
    }
}
</script>
