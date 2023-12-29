<template>
  <div class="editor">
    <div class="menu">
      <div class="left">
        <!--语言选择-->
        <el-select class="language-select" v-model="language" placeholder="Select" size="small">
          <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="info" icon="RefreshRight" @click="reloadCode" text />
        <el-select
          class="theme-select"
          v-model="theme"
          placeholder="Select"
          size="small"
          @change="changeTheme"
        >
          <el-option v-for="item in themeList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
    </div>

    <div class="editor-backgrand">
      <div ref="container" class="editor-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, onMounted, ref } from 'vue';
  import { editor } from 'monaco-editor';
  import { monokaiLight } from './theme/monokai-light.ts';
  import { githubLight } from './theme/github-light.ts';
  import { solarizedLight } from './theme/solarized-light.ts';
  import { tomorrowNight } from './theme/tomorrow-night.ts';

  const container = ref<HTMLElement>();

  // 实现数据双向绑定
  const props = defineProps(['modelValue', 'language', 'languages']);
  const emit = defineEmits(['update:modelValue', 'update:language', 'reloadCode']);

  // 选择的语言
  const language = computed({
    get() {
      return props.language;
    },
    set(value) {
      emit('update:language', value);
    },
  });
  // 选择主题
  const theme = ref('monokai-light');
  const themeList = ref([
    'monokai-light',
    'vs',
    'vs-dark',
    'hc-black',
    'github-light',
    'solarized-light',
    'tomorrow-night',
  ]);

  const reloadCode = () => {
    emit('reloadCode');
  };

  const changeTheme = () => {
    editor.setTheme(theme.value);
  };

  onMounted(() => {
    editor.defineTheme('monokai-light', monokaiLight);
    editor.defineTheme('github-light', githubLight);
    editor.defineTheme('solarized-light', solarizedLight);
    editor.defineTheme('tomorrow-night', tomorrowNight);
    const myEditor = editor.create(container.value!, {
      theme: theme.value,
      value: props.modelValue,
      language: language.value,
      // 自适应高度
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
      }
      .right {
        position: absolute;
        right: 10px;
        .theme-select {
          width: 120px;
        }
      }
    }
    .editor-backgrand {
      position: relative;
      top: 35px;
      width: 100%;
      height: calc(100% - 35px);
      .editor-content {
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: 100% !important;
        margin: 0;
        padding: 0;
        overflow: hidden;
        resize: vertical;
        overflow: auto;
      }
    }
  }
</style>
