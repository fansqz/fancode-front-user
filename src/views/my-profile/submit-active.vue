<template>
  <el-card class="card">
    <el-table style="margin: 10px 0px" border :data="submissionList">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="题目名称" width="150px" align="center">
        <template v-slot="{ row }">
          <pre>{{ row.problemName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="提交状态" align="center">
        <template v-slot="{ row }">
          <pre v-if="row.status == 200">提交成功</pre>
          <pre v-if="row.status == 202">答案错误</pre>
          <pre v-if="row.status == 203">运行超时</pre>
          <pre v-if="row.status == 204">编译出错</pre>
          <pre v-if="row.status == 205">运行出错</pre>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器组件-->
    <el-pagination
      @current-change="changePageNo"
      @size-change="changePageSize"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 20, 30]"
      :background="true"
      layout="prev, pager, next, jumper, ->,sizes, total"
      :total="total"
      style="margin: 0px 3%"
    />
  </el-card>
</template>

<script setup lang="ts">
  import { reqSubmissionList } from '@/api/submission';
  import { ref, onMounted } from 'vue';

  // 分页
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(5);
  let total = ref<number>(0);
  let submissionList = ref();

  const getSubmissionList = async () => {
    let result = await reqSubmissionList({
      page: pageNo.value,
      pageSize: limit.value,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      submissionList.value = result.data.list;
    }
  };

  onMounted(() => {
    getSubmissionList();
  });

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getSubmissionList();
  };

  const changePageSize = () => {
    pageNo.value = 1;
    getSubmissionList();
  };
</script>

<style scoped lang="scss">
  .card {
    width: 800px;
    border-radius: 5px;
    margin-top: 20px;
  }
</style>
