<template>
  <div class="problemDescription">
    <el-scrollbar>
      <v-md-preview :text="content"></v-md-preview>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';

  let props = defineProps(['content']);
  let content = ref(props.content);

  watchEffect(() => {
    if (props.content != undefined) {
      content.value = props.content;
    }
  });
</script>

<style scoped lang="scss">
  .problemDescription {
    height: 100%;
    width: 100%;
    background-color: rgb(255, 255, 255);

    /* 这里的样式只会应用于当前组件 */
  }
</style>
