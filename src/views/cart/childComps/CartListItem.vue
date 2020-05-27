<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 1，给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）
          2，等同于在自组件中：
           子组件内部处理click事件然后向外发送click事件：$emit("click".fn) -->
      <check-button :is-checked='product.checked' @click.native='checkClick' />
    </div>
    <div class=" item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    checkClick () {
      this.product.checked = !this.product.checked
    }
  }

}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.item-price {
  position: absolute;
  width: 40px;
  margin-top: 30px;
  color: orangered;
}

.item-count {
  position: absolute;
  margin-top: 30px;
  right: 30px;
}
</style>