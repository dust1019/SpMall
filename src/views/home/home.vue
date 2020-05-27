<template>
  <div id="home">
    <!-- 购物街导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControlOne" v-show="isTbaFinxed"
      class="isTabControlShow" />

    <scroll class=" content" ref="homescroll" :probe-type="3" @scroll='contentScroll' :pull-up-load="true"
      @pullingUp='loadMore'>

      <home-swiper :banners="banners" @SwiperImaLoad='SwiperImaLoad' /> <!-- 轮播图 -->
      <recommend-view :recommends="recommends" /> <!-- 十点抢购 -->
      <feature-view /> <!-- 今日热门 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControlTwo" />
      <!-- 流行 新潮 精选 -->
      <goods-list :goods='showGoods' /> <!-- 商品列表 -->

    </scroll>

    <!-- 返回顶部 组件不能直接监听点击 要加上 native 修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'  // 导入home轮播图
import RecommendView from './childComps/RecommendView'  // 导入十点抢购
import FeatureView from './childComps/FeatureView'  // 今日热门


// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/tabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// 方法
import { getHomeMultidata, getHomeGoods } from 'network/home' // 导入home网络请求 
import { debouce } from 'common/utils' // 导入工具类
// 滚动事件
import BScroll from 'better-scroll'


export default {
  name: 'home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  // 储存请求的数据
  data () {
    return {
      // 1 获取轮播图 列表等
      banners: [],
      recommends: [],
      // 2 请求流行 新款 精选 三个数据
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      // 设置默认打开的页面
      currentType: 'pop',
      // 返回顶部默认为false
      isShowBackTop: false,
      // 设置tabControl默认为0
      taboffsetTop: 0,
      // 设置tabControl默认为不置顶
      isTbaFinxed: false,
      saveY: 0
    }
  },


  // 计算属性
  computed: {
    // 1
    showGoods () {
      return this.goods[this.currentType].list;
    }
  },
  // 2 离开时记录状态和位置
  // 活跃的记录当前的状态或者位置
  activated () {
    this.$refs.homescroll.scrollTo(0, this.saveY, 0)
    this.$refs.homescroll.refresh()
  },
  // 不活跃的时候保存活跃时候的状态或者位置
  deactivated () {
    this.saveY = this.$refs.homescroll.getScrollY()
  },

  // 生命周期函数
  created () {
    // 1 调用methods getHomeMultidata 方法
    this.getHomeMultidata();
    // 2 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted () {
    // 1 引用防抖动函数 图片加载完成的事件监听
    const refresh = debouce(this.$refs.homescroll.refresh, 100)
    // 监听itme中的图片是否加载完成
    this.$bus.$on('imgItemLoad', () => {
      // 图片加载完成之后 重新计算高度
      // this.$refs.homescroll.refresh()
      // 调用防抖动函数
      refresh()
    })
  },

  // 创建方法来获取数据 然后返回给生命周期函数 在生命周期函数里面调用
  methods: {

    // 事件监听的方法
    // tab-control 选项的监听
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      // 记录两个tabControl所点击的tabControl.vue的index
      this.$refs.tabControlOne.currentIndex = index
      this.$refs.tabControlTwo.currentIndex = index
    },
    backClick () {
      // 返回顶部 通过res='homescroll' 来访问 Scroll.vue scroll的属性。 在通过scrollTo(x,y,time)方法来返回顶部
      // this.$refs.homescroll.scroll.scrollTo(0, 0, 500);

      // 在Scroll.vue 里面创建方法 在这里调用
      this.$refs.homescroll.scrollTo(0, 0, 500)
    },
    contentScroll (opsition) {
      // 1 实时监听返回顶部是否 为显示隐藏
      this.isShowBackTop = -(opsition.y) > 1000

      // 2 实时监听tabControl是否置顶(position:fixed)
      this.isTbaFinxed = -(opsition.y) > this.taboffsetTop
    },
    // 获取上拉加载数据
    loadMore () {
      // currentType 记录了点击了谁 在getHomeGoods方法 给当前的页面加上1
      this.getHomeGoods(this.currentType)
    },
    // 获取tabControl的offsetTop的高度
    // 所以的组件都有一个属性$el 用于获取组件中的元素
    SwiperImaLoad () {
      this.taboffsetTop = this.$refs.tabControlTwo.$el.offsetTop;
    },

    // 网络请求相关的方法
    getHomeMultidata () {
      // 请求多个数据 请求的函数.then()
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    // type 第一个指的是 pop new sell 
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 定义变量来接收获取的页面 返回到goods方法里面来进行保存 下次访问直接获取之前预览的页面
        // 获取三个数据 依次保存在goods的list里面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 页面加载完后调用finishPullUp方法  下拉（pullingDown）、上拉（pullingUp
        this.$refs.homescroll.finishPullUp()
      })
    },

  },
}
</script>

<style scoped>
/* scoped 其他页面相同样式名字的不会冲突 */
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff60a2;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* .tab-coutrol {
  position: sticky;
  top: 44px;
  background-color: white;
  z-index: 9;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.isTabControlShow {
  position: relative;
  z-index: 9;
  background-color: white;
}

/* 
.content {
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>