<template>
  <splitpanes
    class="default-theme main"
    @resized="resizeVisualPane"
    :dbl-click-splitter="false"
    :push-other-panes="false"
  >
    <!--题目展示-->
    <pane @resized="resizeVisualPane">
      <LeftPane ref="leftPane" class="left-pane" :content="problemDescriptionContent" />
    </pane>

    <!--coding-->
    <pane>
      <splitpanes horizontal :dbl-click-splitter="false" :push-other-panes="false">
        <pane size="70">
          <!--选择语言或者主题区域-->
          <EditorSelector class="editor-switcher" />
          <!--代码编辑区域-->
          <Editor class="editor" @onChangeValue="handleCodeChange" />
        </pane>
        <pane size="30">
          <!--控制台-->
          <Console class="console" :userInput="true" :userOutput="true" :terminal="true" />
          <!--coding-button-bar-->
          <CodeButtonBar :debug="true" :execute="true" :submit="true" class="code-button-bar" />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'
  import LeftPane from './left-pane/index.vue'
  import Editor from '@/components/code-editor/editor/index.vue'
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue'
  import Console from '@/components/code-editor/console/index.vue'
  import CodeButtonBar from '@/components/code-editor/coding-button/index.vue'
  import { reqProblem, reqUserCodeByProblemID, reqSaveUserCode, reqUserCode } from '@/api/problem'
  import { storeToRefs } from 'pinia'
  import useCodingStore from '@/store/modules/coding.ts'
  import useDebugStore from '@/store/modules/debug'

  const props = defineProps(['problemNumber'])
  let problem = reactive({
    id: 0,
    name: '',
    number: '',
    languages: '',
    description: '',
  })
  let problemDescriptionContent = ref('')
  let codingStore = useCodingStore()
  let debugStore = useDebugStore()
  let { code, languages, language, problemId } = storeToRefs(codingStore)
  let { breakpoints } = storeToRefs(debugStore)
  const leftPane = ref<InstanceType<typeof LeftPane> | null>()

  const load = async () => {
    let result = await reqProblem(props.problemNumber)
    // 读取题目
    if (result.code == 200) {
      problem = result.data
      problemDescriptionContent.value = problem.description
      languages.value = problem.languages.split(',').filter((value) => value != '')
      problemId.value = problem.id
    }
    // 读取用户代码
    let result2 = await reqUserCodeByProblemID(problem.id)
    if (result.code == 200) {
      language.value = result2.data.language
      code.value = result2.data.code
    }
    // 设置断点
    breakpoints.value = []
  }

  const handleCodeChange = (value: string, _type: string) => {
    let req = {
      problemID: problem.id,
      language: language.value,
      code: value,
    }
    reqSaveUserCode(req)
  }

  const handleLanguageChange = () => {
    getUserCode()
  }

  // 读取用户代码
  const getUserCode = async () => {
    let result = await reqUserCode(problemId.value, language.value)
    if (result.code == 200) {
      console.log('sdfe')
      code.value = result.data
    }
  }

  /**
   * 当拉伸/缩放可视化面板时调用
   * - 当可视化面板尺寸发生变化时，需重新调整可视化视图
   */
  const resizeVisualPane = () => {
    leftPane.value.resizeVisualView()
  }

  onMounted(() => {
    load()

    watch(
      () => language.value,
      () => {
        handleLanguageChange()
      },
    )
  })
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);

    :deep(.splitpanes__pane) {
      border-radius: 12px !important;
      overflow: hidden;
      
      // 确保内部内容也有圆角
      > * {
        border-radius: 12px;
        overflow: hidden;
      }
    }

    .left-pane {
      width: 100%;
      height: 100%;
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

    .debug-button-bar {
      right: 0%;
      bottom: 50%;
    }

    .console {
      position: relative;
      height: calc(100% - 40px);
    }

    .code-button-bar {
      position: relative;
      height: calc(40px);
    }
  }
</style>
