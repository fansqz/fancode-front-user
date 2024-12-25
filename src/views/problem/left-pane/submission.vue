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
                  @click="startRemarkEdit(row)"
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
  <el-card v-show="codeVisible" class="code-show">
    <template #header class="header">
      <div class="card-header">
        <el-text>{{
          currentSubmission.remark == '' ? '未命名' : currentSubmission.remark
        }}</el-text>
        <el-button class="iconfont icon-close code-view-close" @click="closeCodeShow()" link />
      </div>
    </template>
    <div ref="editorEl" class="editor" />
  </el-card>
</template>

<script setup lang="ts">
  import { reqSubmissionList, reqAddRemark } from '@/api/submission';
  import { ref, onMounted, onBeforeUnmount, reactive, toRefs, watch } from 'vue';
  import { languages } from '@/enum/languages.ts';
  import { editor } from 'monaco-editor';
  import { wire } from '@/components/code-editor/editor/themes';
  let props = defineProps<{
    problemID: number;
    codeTheme: string;
  }>();

  let { problemID, codeTheme } = toRefs(props);
  let languageColorMap = new Map<string, string>([
    [languages.GO, 'primary'],
    [languages.C, 'success'],
    [languages.Java, 'info'],
  ]);

  let codeVisible = ref(false);
  let currentSubmission = reactive({
    code: '',
    language: 'go',
    remark: '',
  });

  // 分页
  let pageNo = ref<number>(1);
  // 每页展示多少条数据
  let limit = ref<number>(100);
  let total = ref<number>(0);
  let submissionList = ref();

  let remarkElMap: Map<number, HTMLElement> = new Map();
  const setItemRefs = (el: HTMLElement, id: number) => {
    if (el) {
      remarkElMap.set(id, el);
    }
  };

  const editorEl = ref<HTMLElement>();

  const getSubmissionList = async () => {
    let result = await reqSubmissionList({
      page: pageNo.value,
      pageSize: limit.value,
      problemID: problemID.value,
    });
    if (result.code == 200) {
      total.value = result.data.total;
      submissionList.value = result.data.list;
    }
  };

  let editorInstance: editor.IStandaloneCodeEditor;

  onMounted(() => {
    getSubmissionList();

    // 创建editor实例
    editorInstance = editor.create(editorEl.value, {
      language: currentSubmission.language,
      value: currentSubmission.code,
      readOnly: true,
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
    });
    wire(currentSubmission.language, editorInstance);

    watch(
      () => currentSubmission.language,
      async (val) => {
        const model = editorInstance.getModel();
        if (model) {
          //设置语言
          editor.setModelLanguage(model, val);
          wire(val, editorInstance);
        }
      },
    );

    watch(
      () => currentSubmission.language,
      async (val) => {
        const model = editorInstance.getModel();
        if (model) {
          //设置语言
          editor.setModelLanguage(model, val);
          wire(val, editorInstance);
        }
      },
    );

    watch(
      () => currentSubmission.code,
      () => {
        editorInstance?.setValue(currentSubmission.code);
      },
    );

    watch(
      () => codeTheme.value,
      (theme) => {
        editorInstance.updateOptions({ theme });
      },
    );
  });

  // 在组件即将卸载前执行，做些销毁动作
  onBeforeUnmount(() => {
    let model = editorInstance.getModel();
    model?.dispose();
    editorInstance?.dispose();
  });

  const getTypeByLanaguage = (language: string) => {
    if (!languageColorMap.has(language)) {
      return 'info';
    } else {
      return languageColorMap.get(language);
    }
  };

  const formatTime = (time: number) => {
    return `${Math.ceil(time / 1000000000)}s`;
  };

  const startRemarkEdit = (row) => {
    row.remarkInput = row.remark;
    row.remarkEdit = true;
    remarkElMap.get(row.id).focus();
    submissionList.value.forEach((item) => {
      if (item.id != row.id) {
        item.remarkEdit = false;
      }
    });
  };

  const updateRemark = async (row) => {
    row.remarkEdit = false;
    let result = await reqAddRemark(row.id, row.remarkInput);
    if (result.code == 200) {
      row.remark = row.remarkInput;
    }
  };

  const closeRemarkEdit = (row) => {
    row.remarkEdit = false;
  };

  const showCode = (row) => {
    currentSubmission.code = row.code;
    currentSubmission.language = row.language;
    currentSubmission.remark = row.remark;
    codeVisible.value = true;
  };

  const closeCodeShow = () => {
    codeVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .scrollbar {
    background-color: $base-header-background;
    .submission {
      padding: 0px;
      margin: 0px;
      width: 100%;
      height: 100%;
      background-color: $base-header-background;
      .table {
        padding: 30px 60px;
        .remark-column {
          .remarkInput {
            margin: auto 0px;
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
    z-index: 99999;
    top: calc(40% - 250px);
    left: calc(50% - 300px);
    height: 500px;
    width: 600px;
    .editor {
      height: 400px;
      width: 100%;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      .code-view-close {
        margin-right: 0px;
      }
    }
  }
</style>
