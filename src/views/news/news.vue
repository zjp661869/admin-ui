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
            账号名称<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <el-tabs v-model="tagValue">
        <el-tab-pane label="已发布" name="published">
          <issueTable />
        </el-tab-pane>
        <el-tab-pane label="草稿" name="draft">
          <issueTable />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/user.js'
import issueTable from './component/issueTable.vue'
const store = useStore()
// import { useStrore } from '@/stores/news.js'
// const pinia = useStrore();
// pinia.setUser(111);
// console.log('🚀🚀🚀🚀🚀 ~~~~~~~~ pinia:', pinia.userMes)
const tagValue = ref('published')
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
.content {
  height: calc(100vh - 56px);
  background: #F0F2F5;
  padding: 24px 28px;
}
:deep() {
  .el-tabs {
    border-radius: 8px;
    background: #fff;
    .el-tabs__nav-wrap {
      padding: 0 16px;
    }
    .el-tabs__content {
      padding: 0 16px 16px 16px;
    }
  }
}
</style>