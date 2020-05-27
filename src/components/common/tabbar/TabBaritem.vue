<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/01.jpg" alt="">
    <div>首页</div> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TabBaritem',

  // 获取所点击的路径
  props: { path: String },
  data () {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) != -1
    }
  },

  // 点击跳转页面
  methods: {
    itemClick () {
      this.$router.replace(this.path)

    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>