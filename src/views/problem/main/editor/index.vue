<template>
  <div class="editor">
    <div class="select">
      <el-select
        class="select-item1"
        v-model="language"
        placeholder="Select"
        size="small"
        @change="typeChange"
      >
        <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        class="select-item2"
        v-model="codeType"
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
    <div ref="container" class="editor-content" />
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, onMounted, ref } from 'vue';
  import { editor } from 'monaco-editor';

  const container = ref<HTMLElement>();

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

  onMounted(() => {
    const myEditor = editor.create(container.value!, {
      value: props.modelValue,
      language: language.value,
      automaticLayout: true,
    });

    //给父组件实时返回最新文本
    myEditor.onDidChangeModelContent(() => {
      const value = myEditor.getValue();
      emit('update:modelValue', value);
    });

    // 监控value变化
    watch(
      () => props.modelValue,
      (newValue: string) => {
        if (myEditor) {
          const value = myEditor.getValue();
          if (newValue !== value) {
            myEditor.setValue(newValue);
          }
        }
      },
    );

    // 监视props.language的变化
    watch(language, (newLanguage) => {
      const model = myEditor.getModel();
      if (model) {
        editor.setModelLanguage(model, newLanguage);
      }
    });
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
      height: 35px;
      width: 100%;
      background-color: $base-header-background;
      box-sizing: border-box;
      border-bottom: 1px solid $base-border-color;
      display: flex;
      align-items: center;
      .select-item1 {
        width: 150px;
        margin-left: 30px;
        margin-right: 7px;
      }
      .select-item2 {
        width: 150px;
        margin-left: 7px;
        margin-right: 15px;
      }
    }
    .editor-content {
      position: absolute;
      top: 35px;
      width: 100%;
      height: calc(100% - 35px);
    }
  }
</style>
