import Vue from 'vue'
import Router from 'vue-router'
import pinia from '@/stores/index.js'
import { useStore } from '@/stores/user.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
const store = useStore(pinia)

export const routes = [
  { path: "/", redirect: '/home', name: 'index' },
  { path: "/login", name: 'login', component: () => import("@/views/login/login.vue") },
  {
    path: '',
    component: Layout,
    meta: { icon: 'yanzhengma' },
    children: [{
      path: 'home',
      component: () => import("@/views/home/home.vue"),
      name: 'home',
      meta: { title: '我是一级导航' },
    }]
  },
  {
    path: '/TTTT',
    component: Layout,
    meta: { title: '我是二级导航', icon: 'yonghuming' },
    children: [
      {
        path: 'test1111',
        component: () => import("@/views/test.vue"),
        name: 'test1111',
        meta: { title: '测试1111' },
      },
      {
        path: 'test2222',
        component: () => import("@/views/test1.vue"),
        name: 'test2222',
        meta: { title: '测试2222' },
      }]
  },
]
Vue.use(Router)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
const whiteList = ['/login'] // 白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.user.user) {
    if (to.path === '/login') {
      next('/')
    } else if (store.refresh) {
      await store.formatRouter()
      for (const x of store.user.menuList) {
        router.addRoute(x)
      }
      store.refresh = false
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else if (to.path !== '/login') {
    next('/login')
    NProgress.done()
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
