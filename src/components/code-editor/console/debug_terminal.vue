<template>
  <textarea class="debug_terminal" v-model="textarea" @keydown="handleEnterAdd" />
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import useDebugStore from '@/store/modules/debug';
  import { reqSendToConsole } from '@/api/debug';
  import { ElMessage } from 'element-plus';
  import { storeToRefs } from 'pinia';

  const textarea = ref(''); // 引入响应式变量
  const debugStore = useDebugStore();
  const { isDebug, key } = storeToRefs(debugStore);

  const handleEnterAdd = async (event: KeyboardEvent) => {
    const textareaElement = event.target as HTMLTextAreaElement; // 获取HTML元素

    // 保存功能
    if (!event.altKey && event.key === 'Enter') {
      console.log('aaa');
      textareaElement.blur(); // 获取当前元素并失去焦点
      event.preventDefault(); // 阻止默认换行操作
      const cursorPosition = textareaElement.selectionStart;
      const currentLine = getCurrentLine(textarea.value, cursorPosition);
      // 保存
      if (isDebug.value) {
        let result = await reqSendToConsole(key.value, currentLine);
        if (result.code != 200) {
          ElMessage({
            type: 'error',
            message: result.message,
          });
        }
      }

      // 插入换行符
      const before = textarea.value.substring(0, cursorPosition);
      const after = textarea.value.substring(cursorPosition);
      textarea.value = before + '\n' + after;
      // 更新光标位置，移动到新的行
      textareaElement.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    }

    // 换行功能
    if (event.altKey && event.key === 'Enter') {
      const cursorPosition = textareaElement.selectionStart;
      textarea.value =
        textarea.value.substring(0, cursorPosition) +
        '\n' +
        textarea.value.substring(cursorPosition);

      await nextTick(); // 下一个 DOM 更新循环结束之后执行的回调。

      textareaElement.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      textareaElement.focus(); // 使文本区域重新获得焦点。

      event.preventDefault(); // 阻止默认操作
      return false;
    }
  };

  // 获取当前光标所在的行内容
  const getCurrentLine = (input: string, cursorPosition: number) => {
    // 分割所有文本为数组的行
    const lines = input.split('\n');
    // 初始化列举字符和行
    let cumulativeLength = 0,
      lineIndex = 0;
    // 查找当前行
    for (; lineIndex < lines.length; lineIndex++) {
      // 包含当前光标所在行
      if (cursorPosition <= cumulativeLength + lines[lineIndex].length) {
        break;
      }
      // 添加当前行长度加上换行符
      cumulativeLength += lines[lineIndex].length + 1;
    }

    // 返回光标所在的行内容
    return lines[lineIndex] || '';
  };
</script>

<style scoped lang="scss">
  .debug_terminal {
    height: 100%;
    width: 100%;
    padding: 0;
  }
</style>
