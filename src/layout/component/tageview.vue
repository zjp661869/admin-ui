<template>
  <div class="tageview">
    <router-link
      v-for="(tag,index) in visitedViews"
      ref="tag"
      :key="tag.path+index"
      class="tags-view-item"
      :class="{ 'active': tag.path === $route.path, 'no': visitedViews?.length === 1 }"
      :to="{path:tag.path,query:tag.query,params:tag.params}"
    >
      <span @click="handlePath(tag.path)">{{ tag.title }}</span>
      <span class="el-icon-close" @click.prevent.stop="handlecloseTag(tag)" />
    </router-link>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import pinia from '@/stores/index.js'
import { useStore } from '@/stores/user.js'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const { visitedViews, activeIndex } = storeToRefs(useStore(pinia))
const { path, meta: { title }, query, params } = proxy.$route || {}
visitedViews.value.push({
  path,
  title,
  query,
  params,
})
const handlePath = (path) => {
  activeIndex.value = path
}
const handlecloseTag = (tag) => {
  visitedViews.value = visitedViews.value.filter(i => i.path !== tag.path)
  const { path, query, params, title } = visitedViews.value.at(-1)
  activeIndex.value = path
  proxy.$router.push({
    path,
    title,
    query,
    params,
  })
}
</script>
<style lang="scss" scoped>
.tageview {
  height: 34px;
  width: 100%;
  padding: 0 8px;
}
.tags-view-item {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  border-radius:3px;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  text-decoration: none;
  .el-icon-close {
    width: 16px;
    height: 16px;
    margin-left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
    &:before {
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: rgba(17, 119, 255, .2);
    }
  }
  &:first-of-type {
    margin-left: 0;
  }
  &.active {
    background-color: rgba(17,119,255,0.1);
    color: #1177FF;
    border-color: #1177ff;
  }
}
.no {
  cursor: not-allowed;
  .el-icon-close{
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>