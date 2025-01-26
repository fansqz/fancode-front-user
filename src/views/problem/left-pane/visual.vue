<template>
  <div ref="container" class="container">
    <div class="visual-container">
      <Visaul ref="visual" class="visaul" :action="action" :sources="sources" />
    </div>
    <el-collapse ref="visualTemplate" accordion class="visual-description-collapse">
      <el-collapse-item name="1">
        <template #title><el-text class="title">可视化数据定义</el-text></template>
        <VisaulTemplate class="visual-description" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
  import useDebugStore from '@/store/modules/debug';
  import useVisualStore from '@/store/modules/visual';
  import { DebugEventDispatcher } from '@/api/debug/debug-event-dispatcher';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DebugEvent } from '@/api/debug/event';
  import Visaul from '@/components/code-visual/visual/index.vue';
  import VisaulTemplate from '@/components/code-visual/visual-setting/index.vue';
  import { reqVisualData } from '@/components/code-visual/utils/index.ts';
  import { Sources } from 'structv2';

  const debugStore = useDebugStore();
  const visualStore = useVisualStore();
  const { id, isDebug } = storeToRefs(debugStore);
  const { action, descriptionType } = storeToRefs(visualStore);
  const sources = ref<Sources>();
  const visual = ref<InstanceType<typeof Visaul> | null>();
  const visualTemplate = ref<HTMLElement>();
  const container = ref<HTMLElement>();

  onMounted(() => {
    // 注册一些事件
    DebugEventDispatcher.on('stopped', onStopped);
    DebugEventDispatcher.on('launch', onLaunch);
  });
  onUnmounted(() => {
    DebugEventDispatcher.off('stopped', onStopped);
    DebugEventDispatcher.on('launch', onLaunch);
  });

  const onStopped = async (_data: DebugEvent) => {
    if (!isDebug.value) {
      return;
    }
    // 如果开启可视化
    if (action.value) {
      let visualData = await reqVisualData(
        id.value,
        descriptionType.value,
        visualStore.getDescription(descriptionType.value),
      );
      sources.value = {
        visaulData: visualData,
      };
    }
  };

  const onLaunch = async (_data: DebugEvent) => {
    // 调试开始前清理可视化数据
    sources.value = null;
  };

  // 重新设置visual的大小
  const resizeVisualView = (width: number, height: number) => {
    visual.value?.resizeVisualView(width, height);
  };

  defineExpose({
    resizeVisualView,
  });
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0%;
    display: flex;
    flex-direction: column;
    .visual-description-collapse {
      position: relative;
      bottom: 0px;
      width: 100%;
      height: auto;
      .title {
        margin: 20px;
      }
      .visual-description {
        height: 30%;
      }
    }
    .visual-container {
      position: relative;
      width: 100%;
      height: auto;
      flex: 1;
    }
  }
</style>
