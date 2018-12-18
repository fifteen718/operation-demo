<template>
    <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" center>
        <el-form
        class="lk-form"
        label-position="right"
        label-width="100px">
            <el-form-item label="应用名称" :class="[errors.has('appName') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.appName"
                name="appName"
                data-vv-as="应用名称"
                v-validate="'required|minMax:1,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('appName')">{{errors.first('appName')}}</div>
            </el-form-item>
            <el-form-item label="版本号" :class="[errors.has('version') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.version"
                name="version"
                data-vv-as="版本号"
                v-validate="'required|noCN|minMax:1,18'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('version')">{{errors.first('version')}}</div>
            </el-form-item>
            <el-form-item label="平台类型" :class="[errors.has('osType') ? 'is-error' : '', 'is-required']">
                <el-select
                v-model="formData.osType"
                placeholder="请选择平台类型"
                data-vv-as="平台类型"
                v-validate="'required'">
                    <el-option label="iOS" :value="1"></el-option>
                    <el-option label="Android" :value="2"></el-option>
                </el-select>
                <div class="el-form-item__error" v-if="errors.has('osType')">{{errors.first('osType')}}</div>
            </el-form-item>
            <el-form-item label="源地址" :class="[errors.has('pkgPath') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.pkgPath"
                name="pkgPath"
                data-vv-as="源地址"
                v-validate="'required'">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('pkgPath')">{{errors.first('pkgPath')}}</div>
            </el-form-item>
            <el-form-item label="包体大小" :class="[errors.has('size') ? 'is-error' : '', 'is-required']">
                <el-input
                type="number"
                v-model="formData.size"
                name="size"
                data-vv-as="包体大小"
                v-validate="'required'">
                </el-input>
                M
                <div class="el-form-item__error" v-if="errors.has('size')">{{errors.first('size')}}</div>
            </el-form-item>
            <el-form-item label="升级描述" :class="[errors.has('remark') ? 'is-error' : '', 'is-required']">
                <el-input
                v-model="formData.remark"
                name="remark"
                data-vv-as="升级描述"
                v-validate="'required'"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入升级描述，如：1、聊天功能优化；2、新增红包功能；3、任务系统改造。">
                </el-input>
                <div class="el-form-item__error" v-if="errors.has('remark')">{{errors.first('remark')}}</div>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureHandler">确 认</el-button>
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
            dialogTitle: '新增APP版本升级',
            addDialogVisible: false
        }
    },
    watch: {
        value(val) {
            this.addDialogVisible = val
            if (val) {
                console.log('val is')
                console.log(val)
                if (this.dialogData) {
                    this.dialogTitle = '修改APP版本升级'
                    this.formData = { ...this.dialogData }
                } else {
                    this.dialogTitle = '新增APP版本升级'
                    this.formData = {}
                }
                this.errors.clear()
            }
        },
        addDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        sureHandler() {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    let data = {}
                    data.appId = this.formData.appId || ''
                    data.appName = this.formData.appName
                    data.version = this.formData.version
                    data.osType = this.formData.osType
                    data.pkgPath = this.formData.pkgPath
                    data.size = this.formData.size
                    data.remark = this.formData.remark
                    this.$apis.saveOrUpdateApp(data).then(res => {
                        if (res.code === '2000') {
                            this.$message.success(data.appId ? '修改成功' : '添加成功')
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
