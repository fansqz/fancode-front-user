<template>
  <div
    ref="editor"
    class="editor"
  />
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue';
  import { useVsCode } from './hooks/useVSCode';

  const props = defineProps<{
    value: string;
    options: {
      readonly?: boolean;
      firstLineEdit?: boolean;
    };
  }>();
  const { options, value } = toRefs(props);
  const emits = defineEmits<{
    // 修改文本事件
    (event: 'onChangeValue', value: string, type: 'input' | 'blur'): void;
    // 设置断点事件
    (event: 'onSetBP', BP: string[] | number[]): void;
    // 更新断点事件
    (event: 'onUpdateBP', BP: number, flag: 'add' | 'del'): void;
  }>();

  const onContentChanged = (value: string) => {
    emits('onChangeValue', value, 'input');
  };

  const onEditorBlur = (value: string) => {
    emits('onChangeValue', value, 'blur');
  };

  const onCtrlS = (value: string) => {
    emits('onChangeValue', value, 'blur');
  };

  const onSetBP = (breakpoints?: number[]) => {
    if (breakpoints) { emits('onSetBP', breakpoints); }
  };

  const onChangeBP = (breakpoints: number[], lineNum: number, mode: 'add' | 'del') => {
    onSetBP(breakpoints);
    emits('onUpdateBP', lineNum, mode);
  };

  const editor = ref<HTMLElement>();
  useVsCode({
    value: value,
    target: editor,
    firstLineReadOnly: !options.value.firstLineEdit,
    readonly: options.value.readonly,
    onContentChanged,
    onEditorBlur,
    onCtrlS,
    onSetBP,
    onChangeBP,
  });
</script>

<style scoped lang="scss">
@import "./style/breakPoint.scss";
@import "./style/debug.scss";
.editor {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100% !important;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
