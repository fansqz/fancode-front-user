<template>
  <el-scrollbar class="scrollbar">
    <div class="submission">
      <div class="table">
        <el-table border :data="submissionList" @row-click="showCode" stripe>
          <el-table-column label="序号" width="60px" align="center" type="index" />
          <el-table-column label="提交状态" width="100px" align="center">
            <template v-slot="{ row }">
              <el-text v-if="row.status == 200" type="success">通过</el-text>
              <el-text v-if="row.status == 202" type="danger">答案错误</el-text>
              <el-text v-if="row.status == 203" type="danger">运行超时</el-text>
              <el-text v-if="row.status == 204" type="danger">编译出错</el-text>
              <el-text v-if="row.status == 205" type="danger">运行出错</el-text>
            </template>
          </el-table-column>
          <el-table-column label="语言" width="80px" align="center">
            <template v-slot="{ row }">
              <el-tag
                :key="row.language"
                :type="getTypeByLanaguage(row.language)"
                effect="light"
                round
              >
                {{ row.language }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="耗时" width="60px" align="center">
            <template v-slot="{ row }">
              <pre>{{ formatTime(row.timeUsed) }}</pre>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template v-slot="{ row }">
              <div class="remark-column">
                <el-text class="remark" v-if="!row.remarkEdit">{{ row.remark }}</el-text>
                <el-button
                  class="iconfont icon-edit edit"
                  v-if="!row.remarkEdit"
                  @click.stop="startRemarkEdit(row)"
                  size="small"
                  link
                />
                <el-input
                  size="small"
                  class="remarkInput"
                  v-show="row.remarkEdit"
                  v-model="row.remarkInput"
                  @blur="closeRemarkEdit(row)"
                  @keyup.enter.native="updateRemark(row)"
                  :ref="(el) => setItemRefs(el, row.id)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-scrollbar>

  <!--代码展示-->
  <CodeShow
    class="code-show"
    :code="currentSubmission.code"
    :language="currentSubmission.language"
    :remark="currentSubmission.remark"
    v-show="codeVisible"
    @close="closeCodeShow()"
    v-click-outside
  />
</template>

<script setup lang="ts">
  import { reqSubmissionList, reqAddRemark } from '@/api/submission'
  import { ref, onMounted, reactive, toRefs } from 'vue'
  import { languageConstants } from '@/constants/languages.ts'
  import CodeShow from './code-show.vue'

  let props = defineProps<{
    problemID: number
  }>()

  let { problemID } = toRefs(props)

  let languageColorMap = new Map<string, string>([
    [languageConstants.GO, 'primary'],
    [languageConstants.C, 'success'],
    [languageConstants.Java, 'info'],
  ])

  let codeVisible = ref(false)
  let codeShowed = ref(false)
  let currentSubmission = reactive({
    code: '',
    language: languageConstants.GO,
    remark: '',
  })

  // 分页
  let pageNo = ref<number>(1)
  // 每页展示多少条数据
  let limit = ref<number>(100)
  let total = ref<number>(0)
  let submissionList = ref()

  let remarkElMap: Map<number, HTMLElement> = new Map()
  const setItemRefs = (el: HTMLElement, id: number) => {
    if (el) {
      remarkElMap.set(id, el)
    }
  }

  const getSubmissionList = async () => {
    let result = await reqSubmissionList({
      page: pageNo.value,
      pageSize: limit.value,
      problemID: problemID.value,
    })
    if (result.code == 200) {
      total.value = result.data.total
      submissionList.value = result.data.list
    }
  }

  onMounted(() => {
    getSubmissionList()
  })

  const getTypeByLanaguage = (language: string) => {
    if (!languageColorMap.has(language)) {
      return 'info'
    } else {
      return languageColorMap.get(language)
    }
  }

  const formatTime = (time: number) => {
    return `${Math.ceil(time / 1000000000)}s`
  }

  const startRemarkEdit = (row) => {
    row.remarkInput = row.remark
    row.remarkEdit = true
    remarkElMap.get(row.id).focus()
    submissionList.value.forEach((item) => {
      if (item.id != row.id) {
        item.remarkEdit = false
      }
    })
  }

  const updateRemark = async (row) => {
    row.remarkEdit = false
    let result = await reqAddRemark(row.id, row.remarkInput)
    if (result.code == 200) {
      row.remark = row.remarkInput
    }
  }

  const closeRemarkEdit = (row) => {
    row.remarkEdit = false
  }

  const showCode = (row) => {
    currentSubmission.code = row.code
    currentSubmission.language = row.language
    currentSubmission.remark = row.remark
    codeVisible.value = true
    setTimeout(() => {
      codeShowed.value = true
    }, 250)
  }

  const closeCodeShow = () => {
    codeVisible.value = false
    codeShowed.value = false
  }

  // 自定义指令，用于处理点击外部区域的事件
  const vClickOutside = {
    beforeMount(el) {
      // 在元素上绑定一个事件监听器
      el.clickOutsideEvent = function (event) {
        if (!codeShowed.value) {
          return
        }
        // 判断点击事件是否发生在元素外部
        if (!(el === event.target || el.contains(event.target))) {
          closeCodeShow()
        }
      }
      // 在全局添加点击事件监听器
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      // 在组件销毁前，移除事件监听器以避免内存泄漏
      document.removeEventListener('click', el.clickOutsideEvent)
    },
  }
</script>

<style scoped lang="scss">
  .scrollbar {
    background-color: $base-header-background;

    .submission {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      background-color: $base-header-background;

      .table {
        padding: 30px 60px;

        .remark-column {
          .remarkInput {
            margin: auto 0;
          }

          .remark {
            padding: 2px;
          }
        }
      }
    }
  }

  .code-show {
    position: absolute;
    top: calc(40% - 250px);
    left: calc(50% - 300px);
    z-index: 99999;
  }
</style>
