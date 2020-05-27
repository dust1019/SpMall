import { request } from './request'

// 获取详情页的轮播图
export function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 获取推荐数据
export function getRecommend () {
  return request({
    url: 'recommend'
  })
}

// 获取详情商品信息
export class Goods {
  // 使用构造函数来接收数据
  constructor(columns, itemInfo, services) {
    this.services = services,
      this.columns = columns,
      this.title = itemInfo.title,
      this.desc = itemInfo.desc,
      this.newPrice = itemInfo.price,
      this.oldPrice = itemInfo.oldPrice,
      this.discount = itemInfo.discountDesc,
      this.realPrice = itemInfo.lowNowPrice

  }
}

// 获取店铺的基本信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 获取商品图片信息
export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值(某些商品有值，某些商品没有值)
    this.image = info.images ? info.images[0] : ""
    this.infos = info.set
    this.sizes = rule.tables
  }
}
