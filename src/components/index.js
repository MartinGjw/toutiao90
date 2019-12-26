import layoutaside from './home/layout-aside.vue'
import layouttop from './home/layout-top.vue'
import breadcrumb from './common/bread-crumb.vue'
import coverimage from './publish/cover-image.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutaside)
    Vue.component('layout-top', layouttop)
    Vue.component('bread-crumb', breadcrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverimage)
  }
}
