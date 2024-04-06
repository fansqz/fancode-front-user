<template>
  <div v-if="output.status == 1">
    <div v-if="output.statusCode == 200">
      <el-alert title="提交成功！" type="success" show-icon />
    </div>
    <div v-else-if="output.statusCode == 201">
      <el-alert title="运行成功！" type="success" show-icon> 输出数据: {{ output.userOutput }} </el-alert>
    </div>
    <div v-else-if="output.statusCode == 202">
      <el-alert title="输出错误！" type="warning" show-icon />
      <br />
      <el-alert type="warning">
        <p>用例名称：{{ output.caseName }}</p>
        <p>输入用例:</p>
        <pre>{{ output.caseData }}</pre>
      </el-alert>
      <br />
      <el-alert type="info">
        <p>输出数据: {{ output.userOutput }}</p>
        <p>正确数据: {{ output.expectedOutput }}</p>
      </el-alert>
    </div>
    <div v-else-if="output.statusCode == 203">
      <el-alert title="编译出错！" type="warning" show-icon />
      <br />
      <el-alert type="warning">{{ output.errorMessage }}</el-alert>
    </div>
    <div v-else-if="output.statusCode == 204">
      <el-alert title="运行出错！" type="error" show-icon />
      <br />
      <el-alert type="warning">{{ output.errorMessage }}</el-alert>
    </div>
    <div v-else>
      <el-alert title="暂无输出" type="info" show-icon />
    </div>
  </div>
  <div v-if="output.status == 0">
    <el-alert title="运行中" type="info" show-icon v-loading="'loading'"> </el-alert>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCodingStore from '@/store/modules/coding';
const codingStore = useCodingStore();
const { output } = storeToRefs(codingStore);
</script>
