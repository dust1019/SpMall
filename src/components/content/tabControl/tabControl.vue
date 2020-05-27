<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index===currentIndex}"
      @click="itemClick(index)" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  // props 外面往里面传数据
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index;
      // 内部往外部传 tabClick自己创建的方法
      this.$emit('tabClick', index)
    }
  }

}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
}

.active span {
  padding: 2px;
  border-bottom: 3px solid red;
}
.active {
  color: red;
}
</style>