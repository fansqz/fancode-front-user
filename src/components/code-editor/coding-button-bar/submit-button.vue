<template>
  <el-button class="button-submit" type="success" @click="submit">提交</el-button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'; 
import useCodingStore from '@/store/modules/coding';
import { reqSubmit } from '@/api/judge';

const codingStore = useCodingStore();
let { language, problemId, code, output } = storeToRefs(codingStore);

// 提交
const submit = async () => {
  output.value.status = 0;
  let result = await reqSubmit({
    problemID: problemId,
    code: code,
    language: language,
  });
  if (result.code == 200) {
    let data = result.data;
    output.value.statusCode = data.status;
    output.value.errorMessage = data.errorMessage;
    output.value.caseName = data.caseName;
    output.value.caseData = data.caseData;
    output.value.expectedOutput = data.expectedOutput;
    output.value.userOutput = data.userOutput;
  }
  output.value.status = 1;
};
</script>
