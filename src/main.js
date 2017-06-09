import Vue from 'vue'
import store from './vuex/store'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import App from './App'
import routes from './router'
import { loadFromLocal } from './common/js/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'

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
    if(to.matched.some(m => m.meta.scrollToTop)) {
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
  scrollBehavior
})
const routerApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
if(!loadFromLocal('music', 'index', false)) {
  router.push('/index/find')
}
export default routerApp
