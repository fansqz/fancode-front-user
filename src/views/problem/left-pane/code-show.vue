<template>
  <!--代码展示-->
  <el-card class="code-show">
    <template #header class="header">
      <div class="card-header">
        <el-text>{{ remark == '' ? '未命名' : remark }}</el-text>
        <el-button class="iconfont icon-close code-view-close" @click="close()" link />
      </div>
    </template>
    <div ref="editorEl" class="editor" />
  </el-card>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, toRefs, watch } from 'vue';
  import { editor } from 'monaco-editor';
  import { wire } from '@/components/code-editor/editor/themes';

  const emit = defineEmits(['close', 'click-outside']);

  let props = defineProps<{
    code: string;
    language: string;
    remark: string;
  }>();
  let { code, language, remark } = toRefs(props);
  const editorEl = ref<HTMLElement>();
  let editorInstance: editor.IStandaloneCodeEditor;

  onMounted(() => {

    // 创建editor实例
    editorInstance = editor.create(editorEl.value, {
      language: language.value,
      value: code.value,
      readOnly: true,
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
    });
    wire(language.value, editorInstance);

    watch(
      () => language.value,
      async (val) => {
        const model = editorInstance.getModel();
        if (model) {
          //设置语言
          editor.setModelLanguage(model, val);
          wire(val, editorInstance);
        }
      },
    );

    watch(
      () => code.value,
      (val) => {
        editorInstance?.setValue(val);
      },
    );
  });

  onBeforeUnmount(() => {
    let model = editorInstance.getModel();
    model?.dispose();
    editorInstance?.dispose();
  });

  const close = () => {
    emit("close");
  };

</script>

<style scoped lang="scss">
  .code-show {
    height: 500px;
    width: 600px;
    .editor {
      height: 400px;
      width: 100%;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      .code-view-close {
        margin-right: 0px;
      }
    }
  }
</style>
