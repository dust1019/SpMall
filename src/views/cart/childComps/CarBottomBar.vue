<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy-product" @click="buyProduct">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),

    // 1 价格
    totalPrice () {
      // 1 filter 过滤器 过滤为false
      // 2 reduce 汇总:价格 数量  0 是初起化值
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },

    // 2 计算
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },

    // 3 全选
    isSelectAll () {
      // 设置默认不显示
      if (this.cartList.length === 0) return false

      // 1 方法1 filter过滤
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2 方法2 find查找
      // return !this.cartList.find(item => !item.checked)

      // 3 for 循环
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick () {
      // 1 判断是否全选
      if (this.isSelectAll) { // 全部选中
        //vue forEach循环数组拿到自己想要的数据
        this.cartList.forEach(item => item.checked = false)
      } else { // 部分选中或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },

    // 2 结算
    buyProduct () {
      if (!this.isSelectAll) {
        this.$toast.show('请先购买商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
