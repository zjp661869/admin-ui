<template>
  <div>
    <navigation />
    <div class="layout">
      <sidebar class="sidebar" />
      <app-main class="app-main" />
    </div>
  </div>
</template>
<script setup>
import navigation from '@/layout/component/navigation.vue'
import sidebar from '@/layout/component/sidebar.vue'
import appMain from '@/layout/component/appMain.vue'
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
}
.app-main {
  flex: 1;
}
</style>