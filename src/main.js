import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import App from './App'
import routers from './router'
import { loadFromlLocal } from './common/js/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'assets/themes.less'

Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.jpg'),
  attempt: 1
})
// 滑动优化
const scrollBehavior = (to, from, savedPosition) => {
  if(savedPosition) {
    return savedPosition
  }else {
    let position = {}
    if(to.hash) {
      position.selector = to.hash
    }
    if(to.mached.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}
const router = new VueRouter({
  mode: 'history',
  'linkActiveClass': 'active',
  routes,
  acrollBehavior
})
const routerApp = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
if(!loadFromLocal('music', 'index', false)) {
  router.push('/index/find')
}
export default routerApp
