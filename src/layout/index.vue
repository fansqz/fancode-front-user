<template>
  <div class="layout_container">
    <!--顶部tabbar-->
    <div class="layout_header">
      <Header></Header>
    </div>

    <!--展示栏-->
    <div class="layout_main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './header/index.vue';
</script>

<scoped scoped lang="scss">
.layout_container {
  position: relative;
  width: 100vw;
  height: 100vh;
  .layout_header {
    box-sizing: border-box;
    position: flex;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    top: 0;
    border-bottom: 1px solid $border-color;
  }
}
</scoped>
