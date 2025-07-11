<template>
  <el-scrollbar>
    <div class="container">
      <div class="bank-card">
        <div class="bank">
          <div class="bank-icon">
            <el-image :src="problemBank.icon" />
          </div>
          <div class="bank-message">
            <div class="bank-name">{{ problemBank.name }}</div>
            <div class="bank-description">{{ problemBank.description }}</div>
          </div>
        </div>

        <div class="problem-list">
          <el-table style="margin: 10px 0" border :data="problemList">
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
            v-model:current-page="listQuery.page"
            v-model:page-size="listQuery.pageSize"
            :page-sizes="[10, 20, 30, 50]"
            :background="true"
            layout="prev, pager, next, jumper, ->,sizes, total"
            :total="total"
            style="margin: 0 3%"
          />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { reqProblemList } from '@/api/problem'
  import { ProblemListRequest } from '@/api/problem/type'
  import { reqBank } from '@/api/bank'
  import { ref, reactive, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { reqGetURL } from '@/api/common'

  const $route = useRoute()
  const $router = useRouter()

  let bankID: number = +$route.params.bankID
  // 题库信息
  let problemBank = reactive({
    id: bankID,
    name: '',
    icon: '',
    description: '',
  })

  // 搜索的参数
  let listQuery = reactive<ProblemListRequest>({
    page: 1,
    pageSize: 10,
    bankID: bankID,
  })
  let total = ref<number>(0)
  let problemList = ref([])

  const getProblemBank = async (bankID: number) => {
    let result = await reqBank(bankID)
    if (result.code == 200) {
      let data = result.data
      problemBank.name = data.name
      let result2 = await reqGetURL(data.icon)
      if (result2.code == 200) {
        problemBank.icon = result2.data
      }
      problemBank.description = data.description
    }
  }

  const getProblemList = async () => {
    let result = await reqProblemList(listQuery)
    if (result.code == 200) {
      total.value = result.data.total
      problemList.value = result.data.list
    }
  }

  //组件挂载完毕以后获取数据
  onMounted(() => {
    getProblemBank(problemBank.id)
    getProblemList()
  })

  //页码改变时触发
  const changePageNo = () => {
    // 页面变化时，页面归一
    getProblemList()
  }

  const changePageSize = () => {
    listQuery.page = 1
    getProblemList()
  }

  const gotoProblem = (problemNumber: string) => {
    changeRoute('problem', { problemNumber: problemNumber })
  }

  const changeRoute = (routeName: string, params = {}) => {
    if ($route.name === routeName) {
      return
    }
    $router.push({ name: routeName, params: params })
  }
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - $base-header-height);
    margin: 0;

    .bank-card {
      width: 1000px;
      height: auto;
      margin: 20px;
      overflow: hidden;
      border: 1px solid $base-border-color;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(228 227 227);

      .bank {
        box-sizing: border-box;
        display: flex;
        height: 150px;

        .bank-icon {
          box-sizing: border-box;
          width: 149px;
          height: 150px;
          border-bottom: 1px solid $base-border-color;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }

        .bank-message {
          box-sizing: border-box;
          width: calc(100% - 149px);
          height: 150;
          padding: 30px 60px;
          background-color: $base-blue-color;

          .bank-name {
            font-size: 30px;
            font-weight: bold;
            color: rgb(53 54 54);
          }

          .bank-description {
            margin: 10px 0;
            font-size: normal;
            font-weight: normal;
            color: $base-small-font-color;
          }
        }
      }

      .problem-list {
        padding: 20px;

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
  }
</style>
