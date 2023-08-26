<template>
  <div class="box">
    <el-card class="box-card">
      <el-table style="margin: 10px 0px" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="题目名称" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="题目简介" align="center"> </el-table-column>
        <el-table-column label="难度" width="100px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.difficulty }}</pre>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .box {
    position: absolute;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
