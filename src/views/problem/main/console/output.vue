<template>
  <div v-if="status == 1">
    <div v-if="outputStatus == 200">
      <el-alert title="提交成功！" type="success" show-icon />
    </div>
    <div v-else-if="outputStatus == 201">
      <el-alert title="运行成功！" type="success" show-icon> 输出数据: {{ userOutput }} </el-alert>
    </div>
    <div v-else-if="outputStatus == 202">
      <el-alert title="输出错误！" type="warning" show-icon />
      <br />
      <el-alert type="warning">
        <p>用例名称：{{ caseName }}</p>
        <p>输入用例:</p>
        <pre>{{ caseData }}</pre>
      </el-alert>
      <br />
      <el-alert type="info">
        <p>输出数据: {{ userOutput }}</p>
        <p>正确数据: {{ expectedOutput }}</p>
      </el-alert>
    </div>
    <div v-else-if="outputStatus == 203">
      <el-alert title="编译出错！" type="warning" show-icon />
      <el-alert type="warning">{{ errorMessage }}</el-alert>
    </div>
    <div v-else-if="outputStatus == 204">
      <el-alert title="运行出错！" type="error" show-icon />
      <el-alert type="warning">{{ errorMessage }}</el-alert>
    </div>
    <div v-else>
      <el-alert title="暂无输出" type="info" show-icon />
    </div>
  </div>
  <div v-if="status == 0">
    <el-alert title="运行中" type="info" show-icon v-loading="'loading'"> </el-alert>
  </div>
</template>

<script setup lang="ts">
  defineProps([
    'outputStatus',
    'errorMessage',
    'expectedOutput',
    'caseName',
    'caseData',
    'userOutput',
    'status', // status为0就是正在加载中，status为1就是加载成功
  ]);
</script>

<style></style>
