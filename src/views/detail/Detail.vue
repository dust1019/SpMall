<template>
  <!-- 详情页 -->
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav" /><!-- 导航栏 -->
    
    <scroll class="content" ref="detailscroll" @scroll='contentScroll' :probe-type='3'>
      <detail-swiper :top-images="topImages" /><!-- 轮播图 -->
      <detail-Base-info :goods='goods' /> <!-- 获取商品信息 -->
      <detail-shop-info :shop='shop' /><!-- 获取店铺信息 -->
      <detail-goods-info :detail-info='detailInfo' @imagesLoad='imagesLoad' /> <!-- 获取商品图片信息 -->
      <detail-param-info ref="param" :param-info='paramInfo' /> <!-- 获取商品的基本信息 -->
      <coment-info ref="coment" :coment-info='comentInfo' /><!-- 获取商品的评价 -->
      <goods-list ref="commend" :goods='getRecommend' /><!-- 获取推荐数据 -->
    </scroll>

    <!-- 返回顶部 组件不能直接监听点击 要加上 native 修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart='addToCart' /> <!-- 底部导航栏 -->

    <!-- <toast :message='message' :show="show" /> 显示商品添加 -->
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import ComentInfo from './childComps/comentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

// 网络请求
import { getDetail, Goods, Shop, GoodsParam, GoodsComment, getRecommend } from 'network/detail'

import { debouce } from 'common/utils' // 导入工具类
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    ComentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      comentInfo: {},
      getRecommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // 返回顶部默认为false
      isShowBackTop: false,
      // message: '',
      // show: false

    }
  },
  created () {
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 1 根据iid请求详情数据 请求推荐数据
    getDetail(this.iid).then(res => {
      // 2 获取顶部商品的信息
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 3 获取商品的详情信息
      this.goods = new Goods(data.columns, data.itemInfo, data.shopInfo.services)

      // 4 获取店铺的详情信息
      this.shop = new Shop(data.shopInfo)

      // 5 获取商品图片详情信息
      this.detailInfo = data.detailInfo

      // 6 获取商品的尺寸
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7 获取商品的评价信息
      this.comentInfo = data.rate.list[0]


      // 8 点击跳转到相应的页面
      // this.$nextTick 第一次调用的时候为undefined 第二次会等页面渲染后在调用后面的函数
      // 值不对的时候 一般都是图片问题
      // this.$nextTick(() => {
      //   this.themeTopYs = []

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.coment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.commend.$el.offsetTop)
      //   console.log(this.themeTopYs);

      // })

    }),
      // 2 请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.getRecommend = res.data.list
      }),

      // 3 点击 标题 滚动相应的主题
      // 给getThemeTopY赋值
      // 调用防抖函数 防止调用多次 
      this.getThemeTopY = debouce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.coment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commend.$el.offsetTop)
        // Number.MAX_VALUE js中能代表最大的数字
        this.themeTopYs.push(Number.MAX_VALUE)
      })
  },
  methods: {
    // 0 使用 mapActions 来映射
    ...mapActions(['addCart']),


    // 1 监听图片加载完成
    imagesLoad () {
      this.$refs.detailscroll.refresh()

      // 2 点击跳转到相应的界面
      this.getThemeTopY()
    },

    // 3 点击 标题 滚动相应的主题
    titleClick (index) {
      // console.log(index);
      this.$refs.detailscroll.scrollTo(0, -this.themeTopYs[index], 500)
    },


    // 4 内容滚动 显示正确的标题  
    contentScroll (position) {
      // 1 获取 opsition.y的值赋值到 opsitionY
      const positionY = -(position.y)

      // 2 判断 opsitionY 与 主题的值进行对比
      // [0, 3144, 4612, 4811，Number.MAX_VALUE]
      // 判断 opsitionY 在 0 和 3144 之间，index=0
      // 判断 opsitionY 在 3144 和 4612 之间 ，index=1
      // 判断 opsitionY 在4612 和 4811 之间 ，index=2
      // 判断 opsitionY 在 4811 和 Number.MAX_VALUE 之间 ，index=3
      let length = this.themeTopYs.length
      // length-1 因为Number.MAX_VALUE没有必要遍历 只是用来进行一下对比
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && opsitionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

    },
    // 4 回到顶部
    backClick () {
      // 返回顶部 通过res='homescroll' 来访问 Scroll.vue scroll的属性。 在通过scrollTo(x,y,time)方法来返回顶部
      // this.$refs.homescroll.scroll.scrollTo(0, 0, 500);

      // 在Scroll.vue 里面创建方法 在这里调用
      this.$refs.detailscroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
      // 实时监听返回顶部是否 为显示隐藏
      this.isShowBackTop = -(position.y) > 1000
    },

    // 5 点击加入购物车
    addToCart () {
      // 1 获取购物车需要展现的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2 将 product 传到 vuex 
      // this.$store.commit('addCart', product)

      //  方法1 使用 Promise映射
      // this.$store.dispatch('addCart', product).then((res) => {
      //   // 3 使用Promise res 返回来判断是否添加了新的商品
      //   console.log(res);

      // })

      // 使用 ...mapActions(['addCart']), 映射
      this.addCart(product).then(res => {
        // console.log(res);
        // 监听是否加入购物车 显示提示

        // 方法1
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 2000);

        // 方法2
        this.$toast.show(res, 2000)
      })


    }
  }

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  /* height: calculate(100% - 44px); */
}
</style>