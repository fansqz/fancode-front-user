<template>
  <div class="home-layout">
    <div class="home-header">
      <Header />
    </div>
    <div class="home-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './header/index.vue';
</script>

<style scoped lang="scss">
.home-layout {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.home-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: transparent;
}

.home-content {
  width: 100%;
  min-height: 100vh;
}
</style> 