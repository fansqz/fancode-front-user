<template>
  <i :class="'iconfont icon-continue'" @click="continueDebug"></i>
</template>

<script setup lang="ts">
  import { reqContinue } from '@/api/debug/index.ts';
  import useDebugStore from '@/store/modules/debug';

  const debugStore = useDebugStore();

  const continueDebug = async () => {
    // todo: 监控响应
    reqContinue(debugStore.key);
  };
</script>
