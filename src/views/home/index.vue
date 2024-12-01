<template>
  <el-scrollbar>
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
              <el-popover
                placement="bottom"
                :auto-close="1500"
                :disabled="isLogged()"
                trigger="click"
              >
                <template #reference>
                  <TextButton
                    :class="isLogged() ? 'text-button' : 'not-text-button'"
                    @click="gotoProblem(row.number)"
                    :text="row.name"
                  />
                </template>
                <el-button class="button" type="primary" size="small" @click="getoLogin" link>
                  尚未登陆，请点击登陆
                </el-button>
              </el-popover>
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
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { reqProblemList } from '@/api/problem';
  import BankList from './bank-list.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import useUserStore from '@/store/modules/user';

  const $route = useRoute();
  const $router = useRouter();
  let userStore = useUserStore();

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
    if (!isLogged()) {
      return;
    }
    changeRoute('problem', { problemNumber: problemNumber });
  };

  const getoLogin = () => {
    $router.push({ name: 'login', query: { redirect: $route.path } });
  };

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return;
    }
    $router.push({ name: routeName, params: params });
  };

  // 用户是否登陆
  const isLogged = (): boolean => {
    return !!userStore.token;
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
      .not-text-button {
        cursor: not-allowed;
      }
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
