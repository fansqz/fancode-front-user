<template>
  <i :class="'iconfont icon-debug-step-over'" @click="nextDebug"></i>
</template>

<script setup lang="ts">
  import { reqNext } from '@/api/debug/index.ts';
  import useDebugStore from '@/store/modules/debug';

  const debugStore = useDebugStore();

  const nextDebug = async () => {
    // todo: 监控响应
    reqNext(debugStore.key);
  };
</script>
