<template>      
  <i
    :class="'iconfont icon-Indeterminate'"
    @click="terminateDebug"
    ></i>
</template>

<script setup lang="ts">
import { reqTerminate } from "@/api/debug/index.ts";
import useDebugStore from '@/store/modules/debug';

const debugStore = useDebugStore();

const terminateDebug =  async () => {
  // todo: 监控响应
  reqTerminate(debugStore.key);
};
</script>