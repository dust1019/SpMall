//导入方法重构
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'

export default {
  // 1 创建一个函数来接收传过来商品的信息 再将商品push给state
  addCart (context, payload) {
    // 1.1 item 之前加入购物车的商品 与 payload 现在加入购物车商品 的iid 进行比较
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品 find()查找函数
      // 如果为真 count +1
      // 如果为假 count +1  随便加入 state.cartList.push(payload)

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 1.2 判断oldProduct
      if (oldProduct) {
        // 数目加1
        // let oldProduct = state.cartList[index]
        // oldProduct.count += 1

        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        // 商品加1

        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}