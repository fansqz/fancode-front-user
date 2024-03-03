<template>
  <splitpanes class="default-theme main">
    <!--题目展示-->
    <pane>
      <el-scrollbar>
        <ProblemDescription :content="problemDescriptionContent" />
      </el-scrollbar>
    </pane>

    <!--coding-->
    <pane>
      <splitpanes horizontal>
        <pane>
          <!--选择语言或者主题区域-->
          <EditorSelector class="editor-switcher" />
          <!--代码编辑区域-->
          <Editor class="editor" :value="value" :options="{}" />
        </pane>
        <pane>
          <!--控制台-->
          <Console
            v-model="inputCase"
            :status="status"
            :errorMessage="errorMessage"
            :outputStatus="outputStatus"
            :caseName="caseName"
            :caseData="caseData"
            :userOutput="userOutput"
            :expectedOutput="expectedOutput"
            @execute="execute"
            @submit="submit"
          />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { reactive, ref, toRef } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import ProblemDescription from './problem-description/index.vue';
  import Editor from '@/components/code-editor/editor/index.vue';
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue';
  import Console from './console/index.vue';
  import { reqProblem } from '@/api/problem';
  import { reqExecute, reqSubmit, reqUserCode } from '@/api/judge';
  import { storeToRefs } from 'pinia';
  import useDebugStore from '@/store/modules/debug.ts';

  const props = defineProps(['problemNumber']);
  let problem = reactive({
    id: '',
    name: '',
    number: '',
    languages: '',
    description: '',
  });
  let problemDescriptionContent = ref();

  let debugStore = useDebugStore();

  let { value, languages, language } = storeToRefs(debugStore);

  // 运行状态,1表示有结果，0表示运行中
  let status = ref(1);
  let caseName = ref('');
  let caseData = ref('');
  // 输入用例
  let inputCase = ref('');
  // 错误信息
  let errorMessage = ref('');
  // 运行或提交的输出编码
  let outputStatus = ref(0);
  // 用户输出
  let userOutput = ref('');
  // 正确输出
  let expectedOutput = ref('');

  const load = async () => {
    let result = await reqProblem(props.problemNumber);
    // 读取题目
    if (result.code == 200) {
      problem = result.data;
      problemDescriptionContent.value = problem.description;
      languages.value = problem.languages.split(',').filter((value) => value != '');
    }
    // 读取用户代码
    result = await reqUserCode(problem.id);
    if (result.code == 200) {
      value.value = result.data.code;
      language.value = result.data.language;
    }
  };
  load();

  // 执行
  const execute = async () => {
    status.value = 0;
    let result = await reqExecute({
      problemID: problem.id,
      input: inputCase.value,
      userCode: value.value,
      language: language.value,
    });
    if (result.code == 200) {
      let data = result.data;
      outputStatus.value = data.status;
      errorMessage.value = data.errorMessage;
      userOutput.value = data.userOutput;
    }
    status.value = 1;
  };

  // 提交
  const submit = async () => {
    status.value = 0;
    let result = await reqSubmit({
      problemID: problem.id,
      userCode: value.value,
      language: language.value,
    });
    if (result.code == 200) {
      let data = result.data;
      outputStatus.value = data.status;
      errorMessage.value = data.errorMessage;
      caseName.value = data.caseName;
      caseData.value = data.caseData;
      expectedOutput.value = data.expectedOutput;
      userOutput.value = data.userOutput;
    }
    status.value = 1;
  };
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
  }
</style>
