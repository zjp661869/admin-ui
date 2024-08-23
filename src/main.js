import Vue from 'vue'
import './style.scss'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
import { createPinia, PiniaVuePlugin } from 'pinia'
console.log('🤡🤡')
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(Element)
Vue.component('svg-icon', SvgIcon)
new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')