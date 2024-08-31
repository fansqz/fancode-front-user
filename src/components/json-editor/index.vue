<template>
  <v-ace-editor
    v-model:value="model"
    lang="json"
    theme="chrome"
    :options="options"
    class="vue-ace-editor"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import "./config";
import type { Ace } from "ace-builds";
const model = defineModel<string>()

const options: Partial<Ace.EditorOptions> = reactive({
  useWorker: true, // 启用语法检查,必须为true
  enableBasicAutocompletion: true, // 自动补全
  enableLiveAutocompletion: true, // 智能补全
  enableSnippets: true, // 启用代码段
  showPrintMargin: false, // 去掉灰色的线，printMarginColumn
  highlightActiveLine: true, // 高亮行
  highlightSelectedWord: true, // 高亮选中的字符
  tabSize: 4, // tab锁进字符
  fontSize: 14, // 设置字号
  wrap: false, // 是否换行
  readonly: false, // 是否可编辑
});
</script>

<style lang="scss" scoped>
  .vue-ace-editor {
    height: 100%;
    width: 100%;
    font-size: 16px;
    border: 1px solid $base-border-color;
  }
</style>