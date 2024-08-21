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
    </el-menu>
    <div class="main">
      <el-scrollbar>
        <ProblemDescription v-if="activeIndex == '0'" :content="content" />
        <DataVisual v-if="activeIndex == '1'" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import ProblemDescription from '@/components/problem-description/index.vue';
  import DataVisual from './visual-page.vue';
  let props = defineProps(['content']);
  let content = ref(props.content);

  const activeIndex = ref('0');
  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  watchEffect(() => {
    if (props.content != undefined) {
      content.value = props.content;
    }
  });
</script>

<style>
  .visaul-pane {
    height: 100%;
    .menu {
      height: 35px;
    }
    .main {
      height: calc(100% - 35px);
    }
  }
</style>
