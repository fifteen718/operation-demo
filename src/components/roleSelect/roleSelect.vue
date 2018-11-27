<template>
    <el-select v-model="currentValue" v-loading="loading" element-loading-spinner="el-icon-loading" clearable filterable>
        <template v-if="roles">
            <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                {{ item.roleName }}
            </el-option>
        </template>
    </el-select>
</template>

<script>
export default {
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            roles: null,
            currentValue: ''
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val
        },
        currentValue: function (val) {
            this.$emit('input', val)
        }
    },
    methods: {
        queryRoles() {
            this.loading = true
            this.$apis.queryAllSysRoleName().then((res) => {
                this.loading = false
                this.roles = res.data
            }).catch((error) => {
                this.loading = false
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: error.message
                })
            })
        }
    },
    created() {
        this.queryRoles()
    }
}
</script>
