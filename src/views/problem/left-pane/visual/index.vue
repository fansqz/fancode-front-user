<template>
  <div class="container">
    <Visaul ref="visual" class="visaul" :action="action" :sources="sources" />
    <el-collapse accordion class="visual-description-collapse">
      <el-collapse-item name="1">
        <template #title><el-text class="title">可视化数据定义</el-text></template>
        <VisaulTemplate />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
  import useDebugStore from '@/store/modules/debug';
  import useVisualizeStore from '@/store/modules/visual';
  import { DebugEventDispatcher } from '@/api/debug/debug-event-dispatcher';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DebugEvent } from '@/api/debug/event';
  import Visaul from '@/components/visual/index.vue';
  import VisaulTemplate from './template.vue';
  import { reqVisualizeData } from './util';
  import { Sources } from 'structv2';

  const debugStore = useDebugStore();
  const visualStore = useVisualizeStore();
  const { id } = storeToRefs(debugStore);
  const { action, description } = storeToRefs(visualStore);
  const sources = ref<Sources>();
  const visual = ref<InstanceType<typeof Visaul> | null>();

  onMounted(() => {
    // 注册一些事件
    DebugEventDispatcher.on('stopped', onStopped);
  });
  onUnmounted(() => {
    DebugEventDispatcher.off('stopped', onStopped);
  });

  const onStopped = async (_data: DebugEvent) => {
    // 如果开启可视化
    if (action.value) {
      let visualData = await reqVisualizeData(id.value, description.value);
      sources.value = {
        visaulData: visualData,
      };
      console.log(sources.value);
    }
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
    .visual-description-collapse {
      position: absolute;
      bottom: 0px;
      height: auto;
      width: 100%;
    }
    .visaul {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
</style>
