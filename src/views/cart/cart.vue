<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>

    <!-- 商品展示 -->
    <cart-list />

    <!-- 结算 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from 'views/cart/childComps/cartList'
import CartBottomBar from './childComps/CarBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法
    // 第一种方法
    // ...mapGetters(['cartLength'])
    
    // 第二种方法
    ...mapGetters(['cartLength'])
  }

}
</script>

<style scoped>
.nav-bar {
  background-color: rgb(252, 141, 178);
  color: white;
}
</style>