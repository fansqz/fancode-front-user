<template>
  <div class="header">
    <div class="header-left">
      <div
        class="return"
        @mouseover="returnTextStyle = 'color:blue'"
        @mouseleave="returnTextStyle = 'color:black'"
        :style="returnTextStyle"
        @click="changeRoute('home')"
      >
        <i class="iconfont icon-left"></i>
        <pre>返回</pre>
      </div>
      <div class="problem-name">
        {{ problemName }}
      </div>
    </div>
    <div class="header-right"> </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  let $route = useRoute()
  let $router = useRouter()
  let returnTextStyle = ref()
  defineProps(['problemName'])

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return
    }
    $router.push({ name: routeName, params: params })
  }
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    border-bottom: 1px solid $base-border-color;

    .header-left {
      position: absolute;
      left: 0%;
      display: flex;
      width: 50%;
      height: 100%;

      .return {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: $base-header-height;
        color: rgb(0 0 0);
        cursor: pointer;
        user-select: none;
      }

      .problem-name {
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
      }
    }

    .header-right {
      position: absolute;
      right: 0%;
      width: 50%;
      height: 100%;
    }
  }
</style>
