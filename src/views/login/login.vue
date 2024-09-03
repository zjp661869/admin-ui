<template>
  <div>
    <!-- 登录页表单内容---start -->
    <div class="login-container">
      <div class="pic-area">
        <img src="@/assets/img-left.png" alt="">
      </div>
      <div class="login-area">
        <!-- pc登录页头部---end -->
        <div class="login-top-sty-phone" />
        <el-form
          ref="loginFormRef"
          class="login-form"
          :model="loginForm"
          :rules="loginRules"
        >
          <div class="title-container login-animat1 login-bounce">
            <div class="login-title">
              <div class="title" style="display: inline-block">登录</div>
            </div>
          </div>
          <!-- 用户名---start -->
          <el-form-item prop="account" class="login-transform2 login-animat2 login-bounce">
            <el-input
              v-model="loginForm.account"
              v-trim="'all'"
              name="account"
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
              clearable
              autocomplete
            >
              <template #prefix>
                <span>
                  <svg-icon icon-class="yonghuming" class="login-icon" />
                  <el-divider direction="vertical" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <!-- 用户名---end -->

          <!-- 密码---start -->
          <el-form-item prop="password" class="login-transform3 login-animat3 login-bounce">
            <el-input
              v-model.trim="loginForm.password"
              name="password"
              :type="passwordType"
              placeholder="请输入密码"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <span>
                  <svg-icon icon-class="mima" class="login-icon" />
                  <el-divider direction="vertical" />
                </span>
              </template>
            </el-input>
            <span class="show-pwd" @click="showPwd">
              <el-tooltip class="item" effect="dark" :content="passwordType?'显示密码':'隐藏密码'" placement="top">
                <i class="iconfont" :class="passwordType?'icon-dengluye_guanbixianshimima':'icon-dengluye_xianshimima'" />
              </el-tooltip>
            </span>
          </el-form-item>
          <!-- 密码---end -->

          <!-- 验证码---start -->
          <el-form-item prop="captcha" class="login-transform4 login-animat4 login-bounce">
            <el-input
              v-model="loginForm.captcha"
              v-trim="'all'"
              name="captcha"
              auto-complete="off"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <span>
                  <svg-icon icon-class="yanzhengma" class="login-icon" />
                  <el-divider direction="vertical" />
                </span>
              </template>
            </el-input>
            <img class="captcha" :src="captchaImg" alt="g了" @click="changeCaptcha">
          </el-form-item>
          <!-- 验证码---end -->

          <el-button
            type="primary"
            :loading="loading"
            class="login-but login-transform5 login-animat5 login-bounce"
            @click="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
      <div class="footer">Copyright©广州九四智能科技有限公司</div>
    </div>
    <!-- 登录页表单内容---end -->
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import trim from '@/directive/trim.js'
import pinia from '@/stores/index.js'
import { useStore } from '@/stores/user.js'

const store = useStore(pinia)

const { proxy } = getCurrentInstance()
const loginForm = ref({
  account: '',
  password: '',
  captcha: ''
})
const loginRules = ref({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const passwordType = ref('password')
const captchaImg = ref('')
const loading = ref(false)
const vTrim = trim
const loginFormRef = ref('')

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}

const changeCaptcha = () => {
  // captchaImg.value = CAPTCHA + '?' + Math.random()
}
const handleLogin = async() => {
  loginFormRef.value.validate(async(valid) => {
    if (!valid) return
    store.setUser(loginForm).then(() => {
      proxy.$router.push('home').catch(() => {}) // 官方文档3.1.0
    })
  })
}
</script>
<style src="./login.scss" lang="scss" scoped></style>