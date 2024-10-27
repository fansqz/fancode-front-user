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
  import {
    reqCreateDebugSession,
    reqStart,
    reqListenDebugEvent,
    reqCloseDebugSession,
  } from '@/api/debug/index.ts';
  import { storeToRefs } from 'pinia';
  import useDebugStore from '@/store/modules/debug';
  import { listenDebugEvent } from '@/api/debug/debug-event-listen.ts';

  const codingStore = useCodingStore();
  const debugStore = useDebugStore();
  const { language, code } = storeToRefs(codingStore);
  let { isDebug, id } = storeToRefs(debugStore);
  const startDebug = async () => {
    // 创建调试session
    if (isDebug.value) {
      let result = await reqCloseDebugSession(id.value);
      if (result.code != 200) {
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error',
        });
      } else {
        isDebug.value = false;
      }
      return;
    }
    let result = await reqCreateDebugSession(language.value);
    if (result.code == 200) {
      id.value = result.data;
      // 启动监控管道
      let eventSource = reqListenDebugEvent(id.value);
      listenDebugEvent(id.value, eventSource);
      // 发送启动调试命令
      let startReq = {
        id: id.value,
        code: code.value,
        language: language.value,
        breakpoints: debugStore.breakpoints,
      };
      setTimeout(async () => {
        let result2 = await reqStart(startReq);
        if (result2.code != 200) {
          ElMessage({
            showClose: true,
            message: result.message,
            type: 'error',
          });
        }
      }, 1000);
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
  .ing {
    color: #f56c6c;
    transition: color 0.2s;
  }
  .not-ing {
    color: grey;
    transition: color 0.2s;
  }
</style>
