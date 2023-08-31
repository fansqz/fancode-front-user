<template>
  <div class="header">
    <div class="header-left">
      <div
        class="return"
        @mouseover="returnTextStyle = 'color:blue'"
        @mouseleave="returnTextStyle = 'color:black'"
        :style="returnTextStyle"
        @click="changeRoute('bank')"
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
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  let $route = useRoute();
  let $router = useRouter();
  let returnTextStyle = ref();
  defineProps(['problemName']);

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params: params });
  };
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: $base-header-height;
    background-color: $base-header-background;
    border-bottom: 1px solid $border-color;
    .header-left {
      position: absolute;
      height: 100%;
      width: 50%;
      left: 0%;
      display: flex;
      .return {
        width: 80px;
        height: $base-header-height;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: rgb(0, 0, 0);
      }
      .problem-name {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .header-right {
      position: absolute;
      height: 100%;
      width: 50%;
      right: 0%;
    }
  }
</style>
