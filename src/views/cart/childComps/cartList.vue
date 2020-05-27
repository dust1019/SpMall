<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product='item' />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'cartList',
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    // 1 添加新数据的时候刷新一下
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px -40px);
}
.content {
  height: 100%;
}
</style>