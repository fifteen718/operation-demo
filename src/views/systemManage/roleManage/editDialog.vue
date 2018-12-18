<template>
    <el-dialog title="修改分组" :visible.sync="editDialogVisible" center width="35%">
        <el-form
        class="lk-form"
        label-position="right"
        label-width="100px">
            <el-form-item label="分组名称" :class="[errors.has('roleName') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.roleName"
                name="roleName"
                data-vv-as="分组名称"
                v-validate="'required'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('roleName')">{{errors.first('roleName')}}</div>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="formData.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 认</el-button>
        </span>
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
                    data.roleId = this.formData.roleId
                    data.remark = this.formData.remark
                    data.roleName = this.formData.roleName
                    this.$apis.addOrUpdateRole(data).then(res => {
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
