<template>
  <div
    :class="['sidebar-container', { 'collapsed': isCollapse }]"
  >
    <div class="container">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeIndex"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="handleSelect"
      >
        <span v-for="(item, index) in routersList" :key="index">
          <template v-if="item?.children && !item.hidden">
            <!-- 二级菜单,这里仅用children长度做判断，具体情况自行扩展 -->
            <el-submenu v-if="item?.children?.length>1" :index="item.path">
              <template #title>
                <svg-icon :icon-class="item?.meta?.icon" class="sidebar-icon" />
                <span class="title">{{ item.meta?.title }}</span>
              </template>
              <span v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <el-menu-item-group>
                  <el-menu-item :index="item.path+'/'+subItem.path">{{ subItem.meta.title }}</el-menu-item>
                </el-menu-item-group>
              </span>
            </el-submenu>
            <!--一级菜单 -->
            <template v-else>
              <span v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <el-menu-item :index="item.path+'/'+subItem.path">
                  <svg-icon :icon-class="item?.meta?.icon" class="sidebar-icon" />
                  <template #title>
                    <span>{{ subItem?.meta?.title }}</span>
                  </template>
                </el-menu-item>
              </span>
            </template>
          </template>
        </span>
      </el-menu>
      <div class="sidebar-top">
        <div class="navigate-icon" @click="toggleSideBar">
          <span v-if="!isCollapse" class="sidebar-animate-text">
            <svg-icon
              icon-class="shouqi"
              :class="{'active': isCollapse}"
            />
            <span>收起导航</span>
          </span>
          <el-tooltip v-else class="item" effect="dark" content="展开" placement="left">
            <span>
              <svg-icon
                icon-class="shouqi"
                :class="{'active': isCollapse}"
              />
            </span>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { storeToRefs } from 'pinia'
import pinia from '@/stores/index.js'
import { useStore } from '@/stores/user.js'
const { routersList, visitedViews, activeIndex } = storeToRefs(useStore(pinia))
const { proxy } = getCurrentInstance()

activeIndex.value = proxy.$route.path

const handleSelect = (key) => {
  let r = setTimeout(() => {
    if (visitedViews.value.find(i => i.path === key)) return
    const { meta, query, params } = proxy.$route || {}
    visitedViews.value.push({
      path: key,
      title: meta?.title,
      query,
      params,
    })
    clearTimeout(r)
    r = null
  }, 10)
  activeIndex.value = key
}
const isCollapse = ref(false)
const toggleSideBar = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style lang="scss" scoped>
.sidebar-container {
  width: 180px;
  transition: width 0.3s ease;
  height: calc(100vh - 56px );
  background-color: #fff;
  .sidebar-icon {
    margin-right: 10px;
    font-size: 18px;
  }
  .title {
    display: inline-block;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sidebar-menu {
    padding-bottom: 53px;
  }
  :deep(){
    .el-menu {
      border-right: none;
    }
    .el-submenu__icon-arrow {
      top: 55%;
    }
    .el-submenu .el-menu-item {
      min-width: 0;
    }
    .el-submenu__title * {
      vertical-align: middle;
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-menu--inline .is-active, .el-menu-item.is-active {
      background: #ebeef5;
      border-right: 2px solid #17F;
      color: #17F;
    }
    .el-menu--collapse {
      .title, i {
        display: none
      }
    }
  }
  .sidebar-top {
    border-top: 1px solid #EBEEF5;
    .navigate-icon {
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 12px;
      font-size: 14px;
      color: #303133;
      margin: 6px 4px 6px 4px;
      &:hover {
        background-color: #f5f7fa;
        cursor: pointer;
      }
      .sidebar-animate-text {
        display: flex;
        align-items: center;
        opacity: 0;
        transform: translateX(-100%);
        animation: slideIn ease .4s forwards;
      }
      :deep() {
        .svg-icon {
          width: 20px;
          height: 20px;
          margin-left: 0;
          margin-right: 12px;
          transition: .4s;
          color: #979797;
          font-weight: normal;
          &.active {
            transform: scaleX(-1);
          }
        }
      }
    }
  }
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
.collapsed {
  width: 64px
}
</style>