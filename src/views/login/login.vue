<template>
    <div class="loginPage">
        <div class="mainContent">
            <div class="lgTitle"><br>乐<br>客<br>后<br>台<br>管<br>理<br>系<br>统</div>
            <form class="lgForm">
                <div class="lgError">
                    <span v-if="errors.has('account')">{{errors.first('account')}}</span>
                    <span v-else-if="errors.has('password')">{{errors.first('password')}}</span>
                    <span v-else-if="showError">{{errorMsg}}</span>
                </div>
                <el-input class="lgInput"
                v-model="account"
                :prefix-icon="userIcon"
                @focus="userIcon = 'icon-userLight'"
                @blur="userIcon = 'icon-user'"
                placeholder="请输入登录账号"
                name="account"
                v-validate="'required'"
                data-vv-as="账号"
                ></el-input>
                <el-input class="lgInput"
                v-model="password"
                :prefix-icon="pwdIcon"
                @focus="pwdIcon = 'icon-pwdLight'"
                @blur="pwdIcon = 'icon-pwd'"
                placeholder="请输入登录密码"
                v-validate="'required'"
                name="password"
                data-vv-as="密码"
                type="password"></el-input>
                <el-button class="lgButton" type="primary" @click="login" :loading="disabled">
                    {{disabled ? '登 录 中' : '登 录'}}
                </el-button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userIcon: 'icon-user',
            pwdIcon: 'icon-pwd',
            account: '',
            password: '',
            showError: false,
            errorMsg: '',
            disabled: false
        }
    },
    methods: {
        login() {
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    let data = {
                        'account': this.account,
                        'password': this.password
                    }
                    this.disabled = true
                    this.$apis.login(data).then(res => {
                        this.disabled = false
                        if (res.code === '2000') {
                            // this.$parent.$emit('initMenu', this.account)
                            localStorage.operatorId = res.data
                            this.$router.replace('/welcome')
                        } else {
                            this.showError = true
                            this.errorMsg = res.message
                        }
                    }).catch(error => {
                        this.disabled = false
                        this.$message.error(error.message)
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './login.less';
</style>
<style lang="less">
.lgForm {
    .el-input__inner {
        background: none;
        color: #dcdfe6;
        &:focus {
            color: #409EFF;
        }
    }
}
</style>
