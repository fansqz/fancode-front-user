<template>
  <splitpanes class="default-theme main">
    <!--题目展示-->
    <pane>
      <VisaulPane :content="problemDescriptionContent" />
    </pane>

    <!--coding-->
    <pane>
      <splitpanes horizontal>
        <pane>
          <!--选择语言或者主题区域-->
          <EditorSelector class="editor-switcher" />
          <!--代码编辑区域-->
          <Editor class="editor" @onChangeValue="handleCodeChange" @onUpdateBP="" />
          <!--debug操作浮窗-->
          <DebugButtonBar class="debug-button-bar" />
        </pane>
        <pane>
          <!--控制台-->
          <Console class="console" />
          <!--coding-button-bar-->
          <CodeButtonBar class="code-button-bar" />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import VisaulPane from './visual-pane/index.vue';
  import Editor from '@/components/code-editor/editor/index.vue';
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue';
  import Console from '@/components/code-editor/console/index.vue';
  import CodeButtonBar from '@/components/code-editor/coding-button-bar/index.vue';
  import DebugButtonBar from '@/components/code-editor/debug-button-bar/index.vue';
  import { reqProblem, reqUserCodeByProblemID, reqSaveUserCode } from '@/api/problem';
  import { storeToRefs } from 'pinia';
  import useCodingStore from '@/store/modules/coding.ts';

  const props = defineProps(['problemNumber']);
  let problem = reactive({
    id: 0,
    name: '',
    number: '',
    languages: '',
    description: '',
  });
  let problemDescriptionContent = ref('');
  let codingStore = useCodingStore();
  let { code, languages, language, editorUpdateCode, problemId } = storeToRefs(codingStore);

  const load = async () => {
    let result = await reqProblem(props.problemNumber);
    // 添加
    // 读取题目
    if (result.code == 200) {
      problem = result.data;
      problemDescriptionContent.value = problem.description;
      languages.value = problem.languages.split(',').filter((value) => value != '');
      problemId.value = problem.id;
    }
    // 读取用户代码
    let result2 = await reqUserCodeByProblemID(problem.id);
    if (result.code == 200) {
      language.value = result2.data.language;
      code.value = result2.data.code;
      editorUpdateCode.value++;
    }
  };
  load();

  const handleCodeChange = (value: string, _type: string) => {
    code.value = value;
    let req = {
      problemID: problem.id,
      language: language.value,
      code: value,
    };
    reqSaveUserCode(req);
  };

  // 监控代码变化，如果发生变化就进行
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
    .editor-switcher {
      position: relative;
      height: 35px;
      width: 100%;
    }
    .editor {
      position: relative;
      height: calc(100% - 35px);
      width: 100%;
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
