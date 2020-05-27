<template>
  <!-- ref 如果是绑定在组件中的，那么通过this.$refs.名称 获得的是一个组件的对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  // 创建实时监听事件
  props: {
    probeType: {
      // 默认数字为0 
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },

  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType  0 或者 1 就是不滚动
      // probeType 2 表示手指离开之后不监听滚动事件
      // probeType  3 表示手指离开之后继续监听滚动事件
      // probeType: 3,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    })

    // 监听实时滚动位置
    // 用的是时候 只要在想监听的组件里面添加  :probeType='3'
    this.scroll.on('scroll', (opsition) => {
      //  把opsition 传出去 创建一个方法(可以自己定义)来接收
      this.$emit('scroll', opsition);
    })

    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      // 把 pullingUp 传出去
      this.$emit('pullingUp');
    })


  },
  methods: {
    scrollTo (x, y, time) {
      // 先获取scroll 可以传入默认参数 ,调用csrollTo() 方法
      // && 逻辑语 前面this.scroll执行完成了才执行后面的
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 监听加载数据
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp();
    },

    //  监听图片是否加载完成
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>