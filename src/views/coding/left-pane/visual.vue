<template>
  <div ref="container" class="container">
    <div class="visual-container">
      <Visaul ref="visual" class="visaul" :action="action" :sources="sources" />
    </div>
    <VisaulSetting/>
  </div>
</template>

<script setup lang="ts">
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import useDebugStore from '@/store/modules/debug';
  import useVisualStore from '@/store/modules/visual';
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Visaul from '@/components/code-visual/visual/index.vue';
  import VisaulSetting from '@/components/code-visual/visual-setting/index.vue';
  import { reqVisualData } from '@/components/code-visual/utils/index.ts';
  import { Sources } from 'structv2';
  import { watch } from 'vue';
  import { Edit, Star } from '@element-plus/icons-vue';

  const debugStore = useDebugStore();
  const visualStore = useVisualStore();
  const { id, status } = storeToRefs(debugStore);
  const { action, descriptionType } = storeToRefs(visualStore);
  const sources = ref<Sources>();
  const visual = ref<InstanceType<typeof Visaul> | null>();
  const visualContainer = ref<HTMLElement>();

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

  onMounted(() => {
    action.value = true;
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
    .visual-container {
      position: absolute;
      width: 100%;
      height: 100%;
      flex: 1;
      background-image: radial-gradient(circle, rgba(107, 102, 102, 0.5) 1px, transparent 1px);
      background-size: 25px 25px;
      background-color: #f9f9f9;
    }
  }
</style>