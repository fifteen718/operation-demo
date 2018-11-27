<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    created() {
        !localStorage.operatorId && this.$router.replace('/login')
    }
}
</script>

<style lang="less">
@import './App.less';
</style>
