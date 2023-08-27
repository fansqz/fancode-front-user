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
          <Console />
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

  const props = defineProps(['problemNumber']);
  let problem = reactive({
    name: '',
    description: '',
  });
  let problemDescriptionContent = ref();
  let userCode = ref();

  watchEffect(async () => {
    if (props.problemNumber == undefined) return;

    let number = props.problemNumber;
    let result = await reqProblem(number);
    if (result.code == 200) {
      problem = result.data;
      problemDescriptionContent.value = problem.description;
    }
    result = await reqUserCode(number);
    if (result.code == 200) {
      userCode.value = result.data;
    }
  });
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
  }
</style>
