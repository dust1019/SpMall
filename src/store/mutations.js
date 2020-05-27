//导入方法重构
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'


export default {
  // mutations 的唯一目的就是修改state的状态
  // mutations 中的每个方法尽可能完成的时候比较单一

  // 1 商品的重复数量+1
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },

  // 2 商品不重复就添加到 cartLIst
  [ADD_TO_CART] (state, payload) {
    // 设置商品默认不显示
    payload.checked = true
    state.cartList.push(payload)

  }
}