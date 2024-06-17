<template>
  <div class="problem-container">
    <Header :problemName="problemName"></Header>
    <Main :problemNumber="problemNumber"> </Main>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Header from './header.vue';
  import Main from './main.vue';
  import { ref } from 'vue';
  import { reqProblem } from '@/api/problem';

  let $route = useRoute();
  let problemNumber = ref();
  let problemName = ref();

  const getProblemNumber = () => {
    let problemNumber = $route.params.problemNumber;
    if (typeof problemNumber === 'string') {
      return problemNumber;
    } else {
      return problemNumber[0];
    }
  };

  // 读取题目，比如题目名称等
  const load = async () => {
    problemNumber.value = getProblemNumber();
    let problem;
    let result = await reqProblem(problemNumber.value);
    if (result.code == 200) {
      problem = result.data;
    }
    problemName.value = problem.name;
  };

  load();
</script>

<style scoped lang="scss">
  .problem-container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
</style>
