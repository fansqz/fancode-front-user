<template>
  <div class="editor">
    <codemirror ref="cm" v-model="value" :options="cmdOption"></codemirror>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { Codemirror } from 'vue-codemirror';

  // 配置
  let cmdOption = {
    // 主题
    theme: 'idea',
    // 显示函数
    line: true,
    lineNumbers: true,
    // 软换行
    lineWrapping: true,
    // tab宽度
    tabSize: 4,
  };

  // 实现数据双向绑定
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>

<style scoped lang="scss">
  .editor {
    height: 100%;
    width: 100%;
  }
</style>
