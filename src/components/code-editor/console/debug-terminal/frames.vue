<template>
  <div class="frames">
    <el-menu
      v-show="stackFrames.length != 0"
      :default-active="defaultActive"
      @select="handleSelect"
    >
      <el-menu-item class="frames-menu-item" v-for="item in stackFrames" :index="item.id">
        {{ item.name }}
      </el-menu-item>
    </el-menu>
    <div v-show="stackFrames.length == 0" class="no_data_show">
      <el-text class="text">not data</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import {
    StoppedEventDispatcher,
    TerminatedEventDispatcher,
  } from '@/api/debug/debug-event-dispatcher';
  import { storeToRefs } from 'pinia';
  import { reqGetStackTrace } from '@/api/debug';
  import useDebugStore from '@/store/modules/debug';

  const debugStore = useDebugStore();
  let { id, isDebug } = storeToRefs(debugStore);
  const emit = defineEmits(['selectFrame']);
  const defaultActive = ref('');
  // 栈帧
  const stackFrames = ref<any[]>([]);

  const onStopped = async () => {
    if (!isDebug.value) {
      // 调试结束
      return;
    }
    // 程序暂停时需要更新栈帧
    let result = await reqGetStackTrace(id.value);
    if (result.code == 200) {
      stackFrames.value = result.data;
      defaultActive.value = stackFrames.value[0].id;
      emit('selectFrame', stackFrames.value[0].id);
    }
  };

  const onExited = () => {
    // 程序退出清空栈帧
    stackFrames.value = [];
  };

  const handleSelect = (key: string) => {
    // 点击某个栈帧，则回调selectFrame
    emit('selectFrame', key);
  };

  onMounted(() => {
    // 注册一些事件
    StoppedEventDispatcher.on('stopped', onStopped);
    TerminatedEventDispatcher.on('terminated', onExited);
  });
  onUnmounted(() => {
    StoppedEventDispatcher.off('stopped', onStopped);
    TerminatedEventDispatcher.off('terminated', onExited);
  });
</script>

<style lang="scss" scoped>
  .frames {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    position: relative;
    .frames-menu-item {
      width: 100%;
      height: 25px;
    }
    .no_data_show {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .text {
        margin: auto;
      }
    }
  }
</style>
