<template>
  <div class="box">
    <el-card class="box-card">
      <el-table style="margin: 10px 0px" border :data="problemList">
        <el-table-column label="序号" width="80px" align="center" type="index"> </el-table-column>
        <el-table-column label="状态" width="80px" align="center">
          <template v-slot="{ row }">
            <el-icon>
              <SuccessFilled v-if="row.state == 1" style="color: rgb(29, 187, 29)" />
              <RefreshRight v-if="row.state == 0" style="color: rgb(255, 255, 0)" />
              <QuestionFilled v-if="row.state == -1" style="color: rgb(142, 144, 142)" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="题目名称" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.name }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="难度" width="100px" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.difficulty }}</pre>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器组件-->
      <el-pagination
        @current-change="changePageNo"
        @size-change="changePageSize"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        style="margin: 0px 3%"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reqProblemList } from '@/api/problem';
  import { ref, onMounted } from 'vue';

  // 分页
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  let problemList = ref([]);

  const getProblemList = async () => {
    let result = await reqProblemList(pageNo.value, limit.value);
    if (result.code == 200) {
      total.value = result.data.total;
      problemList.value = result.data.list;
    }
  };

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getProblemList();
  });

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getProblemList();
  };

  const changePageSize = () => {
    pageNo.value = 1;
    getProblemList();
  };
</script>

<style scoped lang="scss">
  .box {
    position: absolute;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 100px;
  }
</style>
