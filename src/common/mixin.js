// import { debouce } from './utils'
// import Scroll from 'components/common/scroll/Scroll'

// // 混入
// export const itemListenerMixin = {
//   components: {
//     Scroll
//   },
//   data () {
//     return {
//       itemImgListener: null
//     }
//   },
//   mounted () {
//     let newRefresh = debouce(this.$refs.scroll.refresh, 100)
//     this.itemImgListener = () => {
//       newRefresh()
//     }
//     this.$bus.$on('itemImgLoad', this.itemImgListener)
//     console.log('----w');
//   }
// }

// 回到顶部
import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    contentScroll (opsition) {
      // 1 实时监听返回顶部是否 为显示隐藏
      this.isShowBackTop = -(opsition.y) > 1000
    },
    backClick () {
      // 返回顶部 通过res='homescroll' 来访问 Scroll.vue scroll的属性。 在通过scrollTo(x,y,time)方法来返回顶部
      // this.$refs.homescroll.scroll.scrollTo(0, 0, 500);

      // 在Scroll.vue 里面创建方法 在这里调用
      this.$refs.detailscroll.scrollTo(0, 0, 500)
    },
  }
}