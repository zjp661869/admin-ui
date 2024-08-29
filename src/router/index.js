import Vue from 'vue'
import Router from 'vue-router'
import pinia from '@/stores/index.js'
import { useStore } from '@/stores/user.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const store = useStore(pinia)

const routes = [
  { path: "/", redirect: '/news', name: 'home' },
  { path: "/login", name: 'login', component: () => import("@/views/login/login.vue") },
  // { path: "/news", name: 'news', component: () => import("@/views/news/news.vue") },
]

Vue.use(Router)
const R = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

R.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.user.user) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
  NProgress.done()
})
R.afterEach(() => {
  NProgress.done()
})
export default R
