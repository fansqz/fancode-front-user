<template>
  <el-splitter layout="vertical">
    <el-splitter-panel size="70" class="editor-panel">
      <!--选择语言或者主题区域-->
      <EditorSelector class="editor-switcher" />
      <!--代码编辑区域-->
      <Editor class="editor" />
    </el-splitter-panel>
    <el-splitter-panel size="30" class="console-panel">
      <!--控制台-->
      <Console class="console-content" :userInput="false" :userOutput="false" :terminal="true" />
    </el-splitter-panel>
  </el-splitter>
</template>

<script setup lang="ts">
  import Editor from '@/components/code-editor/editor/index.vue'
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue'
  import Console from '@/components/code-editor/console/index.vue'
</script>

<style scoped lang="scss">
  :deep(.editor-panel) {
    margin-bottom: 4px;
    overflow: hidden;
    border: 1px solid $base-border-color;
    border-radius: $border-radius-large;
  }

  :deep(.console-panel) {
    margin-top: 4px;
    overflow: hidden;
    border: 1px solid $base-border-color;
    border-radius: $border-radius-large;
  }

  .editor-switcher {
    position: relative;
    width: 100%;
    height: 35px;
  }

  .editor {
    position: relative;
    width: 100%;
    height: calc(100% - 35px);
  }

  .console-content {
    position: relative;
    height: 100%;
  }
</style> 