<template>
  <div ref="container" class="container">
    <div class="visual-container" ref="visualContainer">
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
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Visaul from '@/components/code-visual/visual/index.vue';
  import VisaulTemplate from '@/components/code-visual/visual-setting/index.vue';
  import { reqVisualData } from '@/components/code-visual/utils/index.ts';
  import { Sources } from 'structv2';
  import { watch } from 'vue';

  const debugStore = useDebugStore();
  const visualStore = useVisualStore();
  const { id, status } = storeToRefs(debugStore);
  const { action, descriptionType } = storeToRefs(visualStore);
  const sources = ref<Sources>();
  const visual = ref<InstanceType<typeof Visaul> | null>();
  const visualTemplate = ref<HTMLElement>();
  const container = ref<HTMLElement>();
  const visualContainer = ref();

  // 重新设置visual的大小
  const resizeVisualView = (width: number, height: number) => {
    visual.value?.resizeVisualView(width, height);
  };

  const getVisualData = async () => {
    if (status.value != 'stopped') {
      return;
    }
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

  defineExpose({
    resizeVisualView,
  });

  onMounted(() => {
    watch(
      () => status.value,
      () => {
        if (status.value == 'stopped') {
          getVisualData();
        }
        if (status.value == 'terminated') {
          sources.value = null;
        }
      },
    );
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
