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
          <!--代码编辑区域-->
          <Editor
            v-model="userCode"
            v-model:codeType="codeType"
            v-model:languages="languages"
            v-model:language="language"
            @typeChange="typeChange"
          />
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
  import { reactive, ref } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import ProblemDescription from './problem-description/index.vue';
  import Editor from './editor/index.vue';
  import Console from './console/index.vue';
  import { reqProblem, reqProblemTemplateCode } from '@/api/problem';
  import { reqExecute, reqSubmit } from '@/api/judge';
  const props = defineProps(['problemNumber']);
  let problem = reactive({
    id: 0,
    name: '',
    number: '',
    languages: '',
    description: '',
  });
  let problemDescriptionContent = ref();
  // 用户代码
  let userCode = ref('');
  // 编程类型
  let codeType = ref('core_code');
  // 编程语言
  let language = ref('');
  // 可选的编程语言
  let languages = ref<string[]>([]);
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
    let number = props.problemNumber;
    let result = await reqProblem(props.problemNumber);
    // 读取题目
    if (result.code == 200) {
      problem = result.data;
      problemDescriptionContent.value = problem.description;
      languages.value = problem.languages.split(',').filter((value) => value != '');
      language.value = languages.value[0];
    }
    // 读取用户代码
    result = await reqProblemTemplateCode(number, language.value, codeType.value);
    if (result.code == 200) {
      userCode.value = result.data;
    }
  };
  load();

  // 执行
  const execute = async () => {
    status.value = 0;
    let result = await reqExecute({
      problemID: problem.id,
      code: userCode.value,
      codeType: codeType.value,
      language: language.value,
      input: inputCase.value,
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
      code: userCode.value,
      codeType: codeType.value,
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

  const typeChange = async () => {
    let result = await reqProblemTemplateCode(problem.number, language.value, codeType.value);
    if (result.code == 200) {
      userCode.value = result.data;
    }
  };
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
  }
</style>
