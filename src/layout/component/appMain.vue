<template>
  <div>
    <tageview />
    <div class="app">
      <div class="app-content">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script setup>
import tageview from './tageview.vue'
</script>

<style lang="scss" scoped>
$_width: calc(100% - 34px);
.app {
  padding: 8px;
  height: $_width;
  background-color: #f1f3f5;;
}
.app-content {
  padding: 16px;
  height: 100%;
  background-color: #fff;
}
</style>