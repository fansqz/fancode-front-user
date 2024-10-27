<template>
  <div class="visual-description">
    <div class="visual-description-input">
      <el-table
        size="small"
        ref="singleTableRef"
        class="templateSelect"
        :data="descriptionTemplateList"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column property="name" label="可视化模板" class="item" />
      </el-table>
      <JsonEditor class="input" v-model="currentDesciprtionJson" />
      <div class="option">
        <el-switch v-model="action" @change="handlerVisualAction" />
        <el-button type="primary" link @click="flushVisual">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVisualStore, { VisualDescription } from '@/store/modules/visual.ts';
  import useCodingStore from '@/store/modules/coding';
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ElTable } from 'element-plus';
  import JsonEditor from '@/components/json-editor/index.vue';
  import { VisualDescriptionTemplate } from '@/api/visual/type.ts';
  import {
    reqAllDescriptionTemplate,
    reqDescriptionTemplate,
    reqGetVisualSetting,
    reqSaveVisualSetting,
  } from '@/api/visual/index.ts';

  const codingStore = useCodingStore();
  const visualStore = useVisualStore();
  const { problemId, language } = storeToRefs(codingStore);
  const { descriptionJson, action } = storeToRefs(visualStore);
  const singleTableRef = ref<InstanceType<typeof ElTable>>();
  const descriptionTemplateList = ref<VisualDescriptionTemplate[]>();

  // 当前输入框中的可视化描述数据
  const currentDesciprtionJson = ref('');

  // 读取可视化数据
  onMounted(async () => {
    // 读取模板列表
    let result = await reqAllDescriptionTemplate();
    if (result.code == 200) {
      descriptionTemplateList.value = result.data;
    }

    // 读取可视化设置
    let settingResult = await reqGetVisualSetting({
      problemID: problemId.value,
      language: language.value,
    });
    if (settingResult.code == 200) {
      currentDesciprtionJson.value = settingResult.data;
    }
  });

  const saveSetting = async () => {
    // 保存用户的可视化设置
    let result = await reqSaveVisualSetting({
      problemID: problemId.value,
      language: language.value,
      visualDescription: currentDesciprtionJson.value,
    });
    if (result.code != 200) {
      console.log(result.message);
    }
  };

  // 选择了其他可视化模板
  const handleCurrentChange = async (val: VisualDescriptionTemplate | undefined) => {
    if (val != undefined) {
      let result = await reqDescriptionTemplate(val.type);
      if (result.code == 200) {
        currentDesciprtionJson.value = result.data.template;
      }
    }
  };

  const handlerVisualAction = (val: boolean) => {
    // 启动可视化调试
    if (val) {
      flushVisual();
    }
  };

  // 刷新可视化
  const flushVisual = () => {
    const jsonObject: VisualDescription = JSON.parse(currentDesciprtionJson.value);
    // 设置当前可视化模板
    descriptionJson.value = currentDesciprtionJson.value;
    visualStore.description = jsonObject;
    saveSetting();
  };
</script>

<style lang="scss" scoped>
  .visual-description {
    .visual-description-input {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      .templateSelect {
        width: 20%;
        margin-left: 20px;
        margin-right: 10px;
        height: 150px;
        .item {
          height: 25px;
          margin: 10px;
        }
      }
      .input {
        width: calc(80% - 100px);
        height: 150px;
      }
      .option {
        width: 40px;
        height: 150px;
        margin-right: 20px;
        margin-left: 10px;
        display: flex;
        flex-flow: column;
      }
    }
  }
</style>
