<template>
  <div id="app">
    <!-- 取消离开的时候销毁  exclude 是不缓存吧-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from 'components/content/MainTabBar'
export default {
  name: 'app',
  components: {
    MainTabBar,
    app
  }
}
</script>
<style>
@import "assets/css/base.css";
</style>
