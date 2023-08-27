<template>
  <Splitpanes class="default-theme">
    <!--题目展示-->
    <Pane>
      <ProblemDescription :content="problemDescriptionContent" />
    </Pane>

    <!--coding-->
    <Pane> 2 </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
  import { reactive, ref, watchEffect } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import ProblemDescription from './problem-description/index.vue';
  import { reqProblem } from '@/api/problem';

  const props = defineProps(['problemNumber']);
  let problem = reactive({
    name: '',
    description: '',
  });
  let problemDescriptionContent = ref();

  watchEffect(async () => {
    if (props.problemNumber != undefined) {
      let number = props.problemNumber;
      let result = await reqProblem(number);
      if (result.code == 200) {
        problem = result.data;
        problemDescriptionContent.value = problem.description;
      }
    }
  });
</script>

<style scoped lang="scss"></style>
