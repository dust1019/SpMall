<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (message, duration) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 18px;
  border-radius: 5px;
  z-index: 999;
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>