<template>
  <div ref="editor" class="editor" />
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue';
  import { useVsCode } from './hooks/useVSCode';
  import useDebugStore from '@/store/modules/debug';
  import { storeToRefs } from 'pinia';
  import { reqAddBreakpoint, reqRemoveBreakpoint } from '@/api/debug';

  const debugStore = useDebugStore();
  // 调试的一些结构
  const { debugData, isDebug, key } = storeToRefs(debugStore);

  const props = defineProps<{
    code: string;
    options: {
      readonly?: boolean;
      firstLineEdit?: boolean;
    };
  }>();
  const { options, code } = toRefs(props);
  const emits = defineEmits<{
    // 修改文本事件
    (event: 'onChangeValue', value: string, type: 'input' | 'blur'): void;
    // 设置断点事件
    (event: 'onSetBP', BP: string[] | number[]): void;
    // 更新断点事件
    (event: 'onUpdateBP', BP: number, flag: 'add' | 'del'): void;
  }>();

  const onContentChanged = (value: string) => {
    // 内容发送修改时先更新代码
    code.value = value;
    emits('onChangeValue', value, 'input');
  };

  const onEditorBlur = (value: string) => {
    emits('onChangeValue', value, 'blur');
  };

  const onCtrlS = (value: string) => {
    emits('onChangeValue', value, 'blur');
  };

  const onSetBP = (breakpoints?: number[]) => {
    if (breakpoints) {
      emits('onSetBP', breakpoints);
    }
  };

  const onUpdateBP = (breakpoints: number[], lineNum: number, mode: 'add' | 'del') => {
    onSetBP(breakpoints);
    emits('onUpdateBP', lineNum, mode);
    // 断点更新
    debugData.value.breakpoints = breakpoints;
    // 如果处于调试中，发送添加断点的命令
    if (isDebug.value === true) {
      if (mode == 'add') {
        reqAddBreakpoint(key.value, [lineNum]);
      } else {
        reqRemoveBreakpoint(key.value, [lineNum]);
      }
    }
  };

  const editor = ref<HTMLElement>();
  useVsCode({
    code: code,
    target: editor,
    firstLineReadOnly: !options.value.firstLineEdit,
    readonly: options.value.readonly,
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
