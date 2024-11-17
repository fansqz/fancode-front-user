<template>
  <el-button
    tag="i"
    text
    :class="{
      'iconfont icon-caozuo-tiaoshi ing': isDebug == true,
      'iconfont icon-caozuo-tiaoshi not-ing': isDebug == false,
      'debug-button': true,
    }"
    :loading="loading"
    @click="startDebug"
  ></el-button>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import useCodingStore from '@/store/modules/coding';
  import {
    reqCreateDebugSession,
    reqStart,
    reqListenDebugEvent,
    reqTerminate,
  } from '@/api/debug/index.ts';
  import { storeToRefs } from 'pinia';
  import useDebugStore from '@/store/modules/debug';
  import { listenDebugEvent } from '@/api/debug/debug-event-listen.ts';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { CompileEventDispatcher } from '@/api/debug/debug-event-dispatcher';

  const codingStore = useCodingStore();
  const debugStore = useDebugStore();
  const { language, code } = storeToRefs(codingStore);
  let { isDebug, id } = storeToRefs(debugStore);
  let loading = ref(false);

  const startDebug = async () => {
    // 调试状态，那么关闭调试
    if (isDebug.value) {
      let result = await reqTerminate(id.value);
      if (result.code != 200) {
        ElMessage({
          showClose: true,
          message: result.message,
          type: 'error',
        });
      }
      return;
    }
    loading.value = true;
    // 非调试状态，启动调试
    let result = await reqCreateDebugSession(language.value);
    if (result.code == 200) {
      // 开启loading
      loading.value = true;
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
      loading.value = false;
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
  };

  const onCompile = () => {
    loading.value = false;
  };

  onMounted(() => {
    CompileEventDispatcher.on('compile', onCompile);
  });
  onUnmounted(() => {
    CompileEventDispatcher.off('compile', onCompile);
  });
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
  .debug-button {
    height: 32px;
    width: 32px;
  }
</style>
