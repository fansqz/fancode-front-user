<template>
  <div class="layout-container">
    <!--顶部tabbar-->
    <div class="layout-header">
      <Header></Header>
    </div>

    <!--展示栏-->
    <div class="layout-main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './header/index.vue';
</script>

<scoped scoped lang="scss">
.layout-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  .layout-main {
    position: relative;
    top: $base-header-height;
    width: 100%;
  }
}
</scoped>
