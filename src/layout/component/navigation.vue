<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div>
        <img src="@/assets/logo.png" style="height: 56px" alt="无了">
      </div>
      <div>
        <el-dropdown @command="logOut">
          <span class="el-dropdown-link">
            用户名称<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '@/stores/user.js'
const store = useStore()
const logOut = () => {
  console.log('退出登录')
  store.clearUser()
}
</script>
<style lang="scss" scoped>
.header {
  height: 56px;
  background: #002D68;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown-link {
    color: #fff;
    margin-right: 24px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>