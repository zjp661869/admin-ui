
import { defineStore } from 'pinia'
// import { login } from '@/api/newsApi.js'
export const useStore = defineStore('user', {
  state: () => ({
    user: {
      user: localStorage.getItem('user') || false
    },
  }),
  actions: {
    setUser(value) {
      return new Promise((resolve, reject) => {
        this.user.user = value
        localStorage.setItem('user', { ...value, user: true })
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
    clearUser() {
      localStorage.clear()
      sessionStorage.clear()
      this.user.user = false
      window.location.reload()
    }
  }
})