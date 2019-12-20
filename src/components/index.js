import layoutaside from './home/layout-aside.vue'
import layouttop from './home/layout-top.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutaside)
    Vue.component('layout-top', layouttop)
  }
}
