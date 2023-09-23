<template>
  <div class="editor">
    <div class="select">
      <el-select
        v-model="language"
        class="m-2"
        placeholder="Select"
        size="small"
        @change="typeChange"
      >
        <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="codeType"
        class="m-2"
        placeholder="Select"
        size="small"
        @change="typeChange"
      >
        <el-option
          v-for="item in codeTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div  class="editor-content">
      <el-scrollbar >
        <codemirror ref="cm" v-model="value" :options="cmdOption"></codemirror>
      </el-scrollbar>
    </div>

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

  let codeTypes = [
    {
      label: 'acm模式',
      value: 'acm',
    },
    {
      label: '核心代码模式',
      value: 'core_code',
    },
  ];

  // 实现数据双向绑定
  const props = defineProps(['modelValue', 'codeType', 'language', 'languages']);
  const emit = defineEmits([
    'update:modelValue',
    'update:language',
    'update:codeType',
    'typeChange',
  ]);

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const language = computed({
    get() {
      return props.language;
    },
    set(value) {
      emit('update:language', value);
    },
  });

  const codeType = computed({
    get() {
      return props.codeType;
    },
    set(value) {
      emit('update:codeType', value);
    },
  });

  let typeChange = () => {
    emit('typeChange');
  };
</script>

<style scoped lang="scss">
  .editor {
    position: relative;
    height: 100%;
    width: 100%;
    .select {
      position: absolute;
      height: 30px;
      width: 100%;
      background-color: $base-header-background;
    }
    .editor-content {
      position: absolute;
      top: 30px;
      width: 100%;
      height: calc(100% - 30px);
    }
  }
</style>
