<template>      
  <i
    :class="{
      'iconfont icon-caozuo-tiaoshi ing': isDebug == true,
      'iconfont icon-caozuo-tiaoshi not-ing': isDebug == false,
    }"
    @click="startDebug"
    ></i>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import useCodingStore from '@/store/modules/coding';
import { reqStart, reqListenDebugEvent } from "@/api/debug/index.ts";
import { storeToRefs } from 'pinia';
import useDebugStore from '@/store/modules/debug';
import { listenDebugEvent } from './debug-event-listen.ts';

const codingStore = useCodingStore();
const debugStore = useDebugStore();
const { language, code } = storeToRefs(codingStore);
let { isDebug, key } = storeToRefs(debugStore);
const startDebug = async () => {
  // 启动调试
  let result = await reqStart(code.value, language.value, debugStore.debugData.breakpoints);
  if (result.code == 200) {
    // 启动调试成功
    isDebug.value = true;
    key.value = result.data;
    // 启动监控管道
    let eventSource = reqListenDebugEvent(key.value);
    listenDebugEvent(eventSource);
  } else {
    ElMessage({
      showClose: true,
      message: result.message,
      type: 'error',
    });
  }
};
</script>

<style scoped lang="scss">
.ing{
  color: #f56c6c;
  transition: color 0.2s;
}
.not-ing{
  color: grey;
  transition: color 0.2s;
}
</style>
