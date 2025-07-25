<template>
  <div class="main">
    <el-splitter
      layout="horizontal"
      @update:size="resizeVisualPane"
    >
      <el-splitter-panel  class="left-panel">
        <LeftPane ref="leftPane"/>
      </el-splitter-panel>

      <!--coding-->
      <el-splitter-panel class="right-panel">
        <el-splitter layout="vertical">
          <el-splitter-panel size="70" class="editor-panel">
            <!--选择语言或者主题区域-->
            <EditorSelector class="editor-switcher" />
            <!--代码编辑区域-->
            <Editor class="editor" @onChangeValue="handleCodeChange" />
          </el-splitter-panel>
          <el-splitter-panel size="30" class="console-panel">
            <!--控制台-->
            <Console :userInput="false" :userOutput="false" :terminal="true" class="console" />
          </el-splitter-panel>
        </el-splitter>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import 'splitpanes/dist/splitpanes.css'
  import LeftPane from './left-pane/index.vue'
  import Editor from '@/components/code-editor/editor/index.vue'
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue'
  import Console from '@/components/code-editor/console/index.vue'
  import { storeToRefs } from 'pinia'
  import useCodingStore from '@/store/modules/coding.ts'
  import useDebugStore from '@/store/modules/debug'
  import { languageConstants, supportedLanguages } from '@/constants/languages.ts'

  let codingStore = useCodingStore()
  let debugStore = useDebugStore()
  let { code, language, languages } = storeToRefs(codingStore)
  let { breakpoints } = storeToRefs(debugStore)
  type configType = {
    code: string
    language: languageConstants
    breakpoints: number[]
  }
  let config: configType = {
    code: '',
    language: languageConstants.C,
    breakpoints: [],
  }
  const leftPane = ref<InstanceType<typeof LeftPane> | null>()
  language.value = languageConstants.GO
  languages.value = supportedLanguages

  const loadCode = async () => {
    // 设置代码
    let codeConfigJson = localStorage.getItem('code-' + language.value)
    let parseSuccess = false
    // 读取本地文件
    if (codeConfigJson) {
      try {
        config = JSON.parse(codeConfigJson)
        parseSuccess = true
      } catch (error) {}
    }

    // 读取配置
    if (!parseSuccess) {
      // 并发读取配置文件和代码文件
      const [codeConfigsJson, codeText] = await Promise.all([
        fetch(`/document/visual-learn-config.json`).then((res) => res.text()),
        fetch(`/document/visual-learn-code.${language.value}`).then((res) => res.text()),
      ])

      let codeConfigs: configType[] = JSON.parse(codeConfigsJson)
      for (let codeConfig of codeConfigs) {
        if (codeConfig.language == language.value) {
          config = codeConfig
        }
      }
      config.code = codeText
    }

    // 配置
    code.value = config.code
    breakpoints.value = config.breakpoints
  }

  const saveCode = () => {
    localStorage.setItem('code-' + config.language, JSON.stringify(config))
  }

  const handleCodeChange = (_value: string, _type: string) => {
    saveCode()
  }

  const handleLanguageChange = () => {
    // 切换语言，则切换代码内容
    loadCode()
  }

  /**
   * 当拉伸/缩放可视化面板时调用
   * - 当可视化面板尺寸发生变化时，需重新调整可视化视图
   */
  const resizeVisualPane = () => {
    leftPane.value.resizeVisualView()
  }

  watch(
    () => language.value,
    () => {
      handleLanguageChange()
    },
  )

  onMounted(() => {
    loadCode()
  })
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
    padding: 0px 8px 8px 8px;
    background-color: $deep-background-color;

    :deep(.left-panel) {
      border-radius: $border-radius-large;
      overflow: hidden;
      margin-right: 4px;
      border: 1px solid $base-border-color;
    }

    :deep(.editor-panel) {
      border-radius: $border-radius-large;
      overflow: hidden;
      margin-left: 4px;
      margin-bottom: 4px;
      border: 1px solid $base-border-color;
    }

    :deep(.console-panel) {
      border-radius: $border-radius-large;
      overflow: hidden;
      margin-left: 4px;
      margin-top: 4px;
      border: 1px solid $base-border-color;
    }
    
    .editor-switcher {
      position: relative;
      width: 100%;
      height: 35px;
    }

    .editor {
      position: relative;
      width: 100%;
      height: calc(100% - 35px);
    }

    .console {
      position: relative;
      height: 100%;
    }
  }
</style>
