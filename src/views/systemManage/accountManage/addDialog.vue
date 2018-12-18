<template>
    <el-dialog title="新增管理账号" :visible.sync="addDialogVisible" center>
        <el-form
        class="lk-form"
        label-position="right"
        label-width="100px">
            <el-form-item label="账号" :class="[errors.has('account') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.account"
                name="account"
                data-vv-as="账号"
                v-validate="'required|noSpace|noCN|minMax:5,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('account')">{{errors.first('account')}}</div>
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
            <el-form-item label="密码" :class="[errors.has('password') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.password"
                name="password"
                data-vv-as="密码"
                v-validate="'required|noSpace|noCN|minMax:6,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('password')">{{errors.first('password')}}</div>
            </el-form-item>
            <el-form-item label="选择分组" :class="[errors.has('roleId') ? 'is-error' : '', 'is-required']">
                <role-select
                v-model="formData.roleId"
                name="roleId"
                data-vv-as="分组"
                v-validate="'required'">
                </role-select>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="submit">确 认</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import roleSelect from '@/components/roleSelect'
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {},
            addDialogVisible: false
        }
    },
    components: {
        roleSelect
    },
    watch: {
        value(val) {
            this.addDialogVisible = val
            this.errors.clear()
            this.formData = {}
        },
        addDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    let data = {}
                    data.roleId = this.formData.roleId
                    data.operatorName = this.formData.operatorName
                    data.account = this.formData.account
                    data.password = this.formData.password
                    this.$apis.addOrUpdateOperator(data).then(res => {
                        if (res.code === '2000') {
                            this.$message.success('添加成功')
                            this.addDialogVisible = false
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
