<template>
  <div class="problem-container">
    <Header :problemName="problemName"></Header>
    <Main :problemNumber="problemNumber"> </Main>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Header from './header/index.vue';
  import Main from './main/index.vue';
  import { onMounted, ref } from 'vue';
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

  onMounted(async () => {
    problemNumber.value = getProblemNumber();
    let problem;
    let result = await reqProblem(problemNumber.value);
    if (result.code == 200) {
      problem = result.data;
    }
    problemName.value = problem.name;
  });
</script>

<style scoped lang="scss">
  .problem-container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
</style>
