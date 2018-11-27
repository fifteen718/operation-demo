<template>
    <div class="welcomePage">
        <div class="content">{{ msg }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '乐 客 管 理 后 台 - 首 站'
        }
    }
}
</script>

<style lang="less" scoped>
@import './welcome.less';
</style>
