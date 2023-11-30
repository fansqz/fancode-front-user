<template>
  <div class="editor">
    <div class="menu">
      <div class="left">
        <!--语言选择-->
        <el-select
          class="language-select"
          v-model="language"
          placeholder="Select"
          size="small"
          @change="typeChange"
        >
          <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
        </el-select>
        <!--变成类型选择-->
        <el-select
          class="code-type-select"
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
      <div class="right">
        <el-button type="info" icon="RefreshRight" @click="reloadCode" text />
      </div>
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
    'reloadCode',
  ]);

  // 选择的语言
  const language = computed({
    get() {
      return props.language;
    },
    set(value) {
      emit('update:language', value);
    },
  });

  // code类型
  const codeType = computed({
    get() {
      return props.codeType;
    },
    set(value) {
      emit('update:codeType', value);
    },
  });

  const typeChange = () => {
    emit('typeChange');
  };

  const reloadCode = () => {
    emit('reloadCode');
  };

  onMounted(() => {
    const myEditor = editor.create(container.value!, {
      value: props.modelValue,
      language: language.value,
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
</script>

<style scoped lang="scss">
  .editor {
    position: relative;
    height: 100%;
    width: 100%;
    .menu {
      .left {
        position: absolute;
        height: 35px;
        width: 100%;
        background-color: $base-header-background;
        box-sizing: border-box;
        border-bottom: 1px solid $base-border-color;
        display: flex;
        align-items: center;
        .language-select {
          width: 150px;
          margin-left: 30px;
          margin-right: 7px;
        }
        .code-type-select {
          width: 150px;
          margin-left: 7px;
          margin-right: 15px;
        }
      }
      .right {
        position: absolute;
        right: 10px;
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
