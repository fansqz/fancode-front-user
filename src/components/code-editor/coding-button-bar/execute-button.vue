<template>
  <el-button class="button-submit" type="" @click="execute">执行</el-button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCodingStore from '@/store/modules/coding';
import { reqExecute } from '@/api/judge';

const codingStore = useCodingStore();
let { language, problemId, code, input, output } = storeToRefs(codingStore);

// 执行
const execute = async () => {
  output.value.status = 0;
  let result = await reqExecute({
    problemID: problemId.value,
    input: input.value,
    code: code.value,
    language: language.value,
  });
  if (result.code == 200) {
    let data = result.data;
    output.value.statusCode = data.status;
    output.value.errorMessage = data.errorMessage;
    output.value.userOutput = data.userOutput;
  }
  output.value.status = 1;
};
</script>
