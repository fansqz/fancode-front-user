<template>
  <div class="box">
    <BankList class="bank-list" />
    <el-card class="problem-list">
      <el-table style="margin: 10px 0px" border :data="problemList">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <el-table-column label="状态" width="80px" align="center">
          <template v-slot="{ row }">
            <el-icon>
              <SuccessFilled v-if="row.status == 2" class="success-icon" />
              <RefreshRight v-if="row.status == 1" class="in-progress-icon" />
              <QuestionFilled v-if="row.status == 0" class="not-started-icon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="题目名称" align="center">
          <template v-slot="{ row }">
            <TextButton @click="gotoProblem(row.number)" :text="row.name" />
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
  import BankList from './bank-list.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const $route = useRoute();
  const $router = useRouter();

  // 分页
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(10);
  let total = ref<number>(0);
  let problemList = ref<any[]>([]);

  const getProblemList = async () => {
    let req = {
      bankID: undefined,
      page: pageNo.value,
      pageSize: limit.value,
    };
    let result = await reqProblemList(req);
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

  const gotoProblem = (problemNumber: string) => {
    changeRoute('problem', { problemNumber: problemNumber });
  };

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params: params });
  };
</script>

<style scoped lang="scss">
  .box {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bank-list {
      height: 100px;
      width: 1000px;
      margin: 40px 100px 10px 100px;
    }
    .problem-list {
      height: auto;
      width: 1000px;
      .success-icon {
        color: $sucess-color;
      }
      .in-progress-icon {
        color: $warn-color;
      }
      .not-started-icon {
        color: $info-color;
      }
    }
  }
</style>
