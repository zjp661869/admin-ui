
import { defineStore } from 'pinia'
// import { login } from '@/api/newsApi.js'
import { locset, locget } from '@/api/storage'
import { routes } from '@/router/index'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('@/views/**/*.vue')
export const useStore = defineStore('user', {
  state: () => ({
    user: {
      user: locget('user')?.user || false, // 标识
      menuList: locget('user')?.menuList || [] // 动态路由
    },
    refresh: true,
    routersList: [], // 路由总和
    visitedViews: [], // tage路由
    activeIndex: ''// tage标识
  }),
  actions: {
    // 登录接口
    setUser(value) {
      return new Promise((resolve, reject) => {
        this.user.user = true
        this.user.menuList = [] // 设置动态路由
        this.routersList = routes.concat(this.user.menuList)
        locset('user', { ...value, ...this.user })
        resolve()
        // 登录接口接入
        // login(value).then(res => {
        //   localStorage.setItem('user', { ...res, user: true })
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 动态路由处理
    formatRouter() {
      return new Promise((resolve, reject) => {
        this.user?.menuList.forEach(i => {
          i.component = Layout
          if (i.children) {
            i.children.forEach(v => {
              v.component = modules[`/src/views${v.component}`]
            })
          }
        })
        this.routersList = routes.concat(this.user.menuList)
        resolve()
      })
    },
    // 退出登录
    clearUser() {
      localStorage.clear()
      sessionStorage.clear()
      this.user.user = false
      window.location.reload()
    }
  }
})