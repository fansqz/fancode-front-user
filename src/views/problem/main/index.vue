<template>
  <splitpanes class="default-theme main">
    <!--题目展示-->
    <pane>
      <ProblemDescription :content="problemDescriptionContent" />
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
            :errorMessage="errorMessage"
            :outputStatus="outputStatus"
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
  };

  // 提交
  const submit = async () => {
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
      expectedOutput.value = data.expectedOutput;
      userOutput.value = data.userOutput;
    }
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
