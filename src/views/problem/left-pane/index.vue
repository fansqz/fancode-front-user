<template>
  <div class="visaul-pane">
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">题目描述</el-menu-item>
      <el-menu-item index="1">可视化</el-menu-item>
      <el-menu-item index="2">提交记录</el-menu-item>
    </el-menu>
    <div class="main" ref="main">
      <ProblemDescription v-if="activeIndex == '0'" :content="content" />
      <StructVisual ref="structVisual" v-if="activeIndex == '1'" />
      <Submission :problemID="problemId" :codeTheme="theme" v-if="activeIndex == '2'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import ProblemDescription from '@/components/code-visual/document/index.vue';
  import StructVisual from './visual.vue';
  import Submission from './submission.vue';
  import useCodingStore from '@/store/modules/coding';
  const codingStore = useCodingStore();
  let { problemId, theme } = storeToRefs(codingStore);

  let props = defineProps(['content']);
  let content = ref(props.content);
  const structVisual = ref<InstanceType<typeof StructVisual> | null>();
  const main = ref<HTMLElement>();
  const activeIndex = ref('0');
  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  watchEffect(() => {
    if (props.content != undefined) {
      content.value = props.content;
    }
  });

  // 重新设置visual的大小
  const resizeVisualView = () => {
    structVisual.value?.resizeVisualView(main.value.offsetWidth, main.value.offsetHeight);
  };

  defineExpose({
    resizeVisualView,
  });
</script>

<style lang="scss" scoped>
  .visaul-pane {
    height: 100%;
    .main {
      user-select: element;
      height: calc(100% - 35px);
    }
    .menu {
      user-select: none;
      height: 35px;
    }
  }
</style>
