<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div v-for="(item,index) in titles" class="titles-item" :class="{ative:index===currentIndex}"
        @click="titleClick(index)" :key="index">
        {{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      // 1 点击换颜色
      this.currentIndex = index

      // 2 点击跳转到相应的界面
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style>
.titles {
  display: flex;
}

.titles-item {
  flex: 1;
}

.ative {
  color: red;
}

.back img {
  margin-top: 10px;
}
</style>