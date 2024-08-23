import { createPinia, defineStore } from "pinia"
const pinia = createPinia()
export const useStore = defineStore('user', {
  state: () => ({
    test: '测试'
  }),
  actions: {
    async loginUser(value) {
      console.log('🚀🚀🚀🚀🚀 ~~~~~~~~ setUser ~~~~~~~~ value:', value)
      // await this.user.user = value
      // return new Promise((resolve, reject) => {
      //   codeLogin(params).then(res => {
      //     commit(types.LOGIN, res)
      //     resolve(res)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },
  }
})
export default pinia