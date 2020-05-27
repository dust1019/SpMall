import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

// 1 导入封装好的组件
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 给$bus 赋值实例
Vue.prototype.$bus = new Vue()
// 解决300毫秒的延迟
FastClick.attach(document.body)
// 2 安装
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
