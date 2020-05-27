<template>
  <!-- 轮播图 -->
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入 轮播图代码
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad () {
      // 只需要发送一个高度的值就行了 不用发送4次
      if (!this.isLoad) {
        this.$emit('SwiperImaLoad')
        this.isLoad = true
      }
    }
  }

}
</script>

<style>
</style>