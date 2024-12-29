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

    <!--浮动窗口-->
    <Feedback />
  </div>
</template>

<script setup lang="ts">
  import Header from './header/index.vue';
  import Feedback from './feedback/index.vue';
</script>

<scoped scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-main {
    position: relative;
    top: $base-header-height;
    width: 100%;
    height: calc(100vh - $base-header-height);
    box-sizing: border-box;
  }
}
</scoped>
