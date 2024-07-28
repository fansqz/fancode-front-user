<template>
  <div ref="editor" class="editor" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useVsCode } from './hooks/useVSCode';
  import useDebugStore from '@/store/modules/debug';
  import { storeToRefs } from 'pinia';
  import { reqAddBreakpoint, reqRemoveBreakpoint } from '@/api/debug';

  const debugStore = useDebugStore();
  // 调试的一些结构
  const { breakpoints, isDebug, id } = storeToRefs(debugStore);

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

  const onSetBP = (bps?: number[]) => {
    if (bps) {
      emits('onSetBP', bps);
    }
  };

  const onUpdateBP = (bps: number[], lineNum: number, mode: 'add' | 'del') => {
    onSetBP(bps);
    emits('onUpdateBP', lineNum, mode);
    // 断点更新
    breakpoints.value = bps;
    // 如果处于调试中，发送添加断点的命令
    if (isDebug.value === true) {
      if (mode == 'add') {
        reqAddBreakpoint(id.value, [lineNum]);
      } else {
        reqRemoveBreakpoint(id.value, [lineNum]);
      }
    }
  };

  const editor = ref<HTMLElement>();
  useVsCode({
    target: editor,
    onContentChanged,
    onEditorBlur,
    onCtrlS,
    onSetBP,
    onUpdateBP,
  });
</script>

<style scoped lang="scss">
  @import './style/breakPoint.scss';
  @import './style/debug.scss';
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
