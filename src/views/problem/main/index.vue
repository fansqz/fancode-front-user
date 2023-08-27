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
          <Editor v-model="userCode" />
        </pane>
        <pane>
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
  import { reactive, ref, watchEffect } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import ProblemDescription from './problem-description/index.vue';
  import Editor from './editor/index.vue';
  import Console from './console/index.vue';
  import { reqProblem, reqUserCode } from '@/api/problem';
  import { reqExecute, reqSubmit } from '@/api/judge';

  const props = defineProps(['problemNumber']);
  let problem = reactive({
    id: 0,
    name: '',
    description: '',
  });
  let problemDescriptionContent = ref();
  // 用户代码
  let userCode = ref('');
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

  watchEffect(async () => {
    if (props.problemNumber == undefined) return;
    let number = props.problemNumber;
    let result = await reqProblem(number);
    // 读取题目
    if (result.code == 200) {
      problem = result.data;
      problemDescriptionContent.value = problem.description;
    }
    // 读取用户代码
    result = await reqUserCode(number);
    if (result.code == 200) {
      userCode.value = result.data;
    }
  });

  const execute = async () => {
    let result = await reqExecute(problem.id, userCode.value, inputCase.value);
    if (result.code == 200) {
      let data = result.data;
      outputStatus.value = data.status;
      errorMessage.value = data.errorMessage;
      userOutput.value = data.userOutput;
    }
  };

  const submit = async () => {
    let result = await reqSubmit(problem.id, userCode.value);
    if (result.code == 200) {
      let data = result.data;
      outputStatus.value = data.status;
      errorMessage.value = data.errorMessage;
      expectedOutput.value = data.expectedOutput;
      userOutput.value = data.userOutput;
    }
  };
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
  }
</style>
