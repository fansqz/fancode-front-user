<template>
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
    <el-input
      class="input"
      v-model="currentDesciprtionJson"
      type="textarea"
      :rows="5"
      placeholder="Please input"
    />
    <div class="option">
      <el-switch v-model="action" @change="handlerVisualizeAction" />
      <el-button type="primary" link @click="flushVisualize">刷新</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVisualizeStore, { VisualizeDescription } from '@/store/modules/visual.ts';
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ElTable } from 'element-plus';
  import { VisualizeDescriptionTemplate } from '@/api/visual/type.ts';
  import { reqAllDescriptionTemplate, reqDescriptionTemplate } from '@/api/visual/index.ts';

  const visualizeStore = useVisualizeStore();
  const { descriptionJson, action } = storeToRefs(visualizeStore);
  const singleTableRef = ref<InstanceType<typeof ElTable>>();
  const descriptionTemplateList = ref<VisualizeDescriptionTemplate[]>();

  // 当前输入框中的可视化描述数据
  const currentDesciprtionJson = ref('');

  // 读取可视化数据
  onMounted(async () => {
    currentDesciprtionJson.value = descriptionJson.value;
    // 读取模板列表
    let result = await reqAllDescriptionTemplate();
    if (result.code == 200) {
      descriptionTemplateList.value = result.data;
    }
  });

  const handleCurrentChange = async (val: VisualizeDescriptionTemplate | undefined) => {
    if (val != undefined) {
      let result = await reqDescriptionTemplate(val.type);
      if (result.code == 200) {
        currentDesciprtionJson.value = result.data.template;
      }
    }
  };

  const handlerVisualizeAction = (val: boolean) => {
    // 启动可视化调试
    if (val) {
      flushVisualize();
    }
  };

  // 刷新可视化
  const flushVisualize = () => {
    const jsonObject: VisualizeDescription = JSON.parse(currentDesciprtionJson.value);
    // 设置当前可视化模板
    descriptionJson.value = currentDesciprtionJson.value;
    visualizeStore.description = jsonObject;
  };
</script>

<style lang="scss" scoped>
  .visual-description-input {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    .templateSelect {
      width: 100px;
      height: 120px;
      .item {
        height: 20px;
      }
    }
    .input {
      width: 50%;
      height: 120px;
    }
    .option {
      display: flex;
      flex-flow: column;
    }
  }
</style>
