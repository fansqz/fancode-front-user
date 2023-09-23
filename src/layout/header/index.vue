<template>
  <div class="header">
    <div class="header_left">
      <Logo class="logo"></Logo>
      <div
        :class="{ nav_item: true, active_item: isActiveNavItem('bank') }"
        @click="changeRoute('bank')"
      >
        题库
      </div>
      <div
        :class="{ nav_item: true, active_item: isActiveNavItem('contest') }"
        @click="changeRoute('contest')"
      >
        竞赛
      </div>
    </div>
    <div class="header_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Logo from './logo.vue';
  import Setting from './setting.vue';
  import { useRouter, useRoute } from 'vue-router';
  let $router = useRouter();
  let $route = useRoute();

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params });
  };
  const isActiveNavItem = (routeName: string) => {
    console.log($route.name);
    console.log($route.name === routeName);
    return $route.name === routeName;
  };
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    top: 0px;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    box-sizing: border-box;
    border-bottom: 1px solid $base-border-color;
    .header_left {
      position: absolute;
      height: 100%;
      width: 70%;
      left: 0%;
      display: flex;
      .logo {
        width: 200px;
        height: $base-header-height;
      }
      .nav_item {
        width: 80px;
        height: $base-header-height;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: rgb(33, 201, 89);
      }
      .active_item {
        box-sizing: border-box;
        font-weight: 600;
        border-bottom: 2px solid #666666;
      }
    }
    .header_right {
      position: absolute;
      height: 100%;
      width: 30%;
      right: 0%;
    }
  }
</style>
