<template>
  <div class="container">
    <el-tree
      :data="data"
      :props="props"
      highlight-current="true"
      :current-node-key="id"
      :expand-on-click-node="false"
      default-expand-all
      node-key="id"
      class="directory-tree"
      indent="15"
      @node-click="clickEditorVisualDocument"
    >
      <template #default="scope">
        <div class="tree_item">
          <el-text>{{ scope.node.label }}</el-text>
        </div>
      </template>
    </el-tree>
    <VisualDocumentLearn class="document-learn" />
  </div>
</template>

<script setup lang="ts">
  import { reqVisualDocumentDirectory } from '@/api/visual-document/index.ts';
  import { ref, onMounted } from 'vue';
  import VisualDocumentLearn from './main.vue';
  import useVisualDocument from '@/store/modules/visual-document';
  import { storeToRefs } from 'pinia';

  let visualDocumentStore = useVisualDocument();
  let { id } = storeToRefs(visualDocumentStore);
  const data = ref<any[]>([]);
  const props = {
    children: 'children',
    label: 'title',
  };

  const getDirectory = async () => {
    let result = await reqVisualDocumentDirectory();
    if (result.code == 200) {
      data.value = result.data;
    }
  };

  const clickEditorVisualDocument = (node: any) => {
    id.value = node.id;
  };

  onMounted(async () => {
    await getDirectory();
    id.value = data.value[0].id;
  });
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0px;
    .directory-tree {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 200px;
      border-right: 1px solid $base-border-color;
      box-sizing: border-box;
    }
    .document-learn {
      position: absolute;
      left: 200px;
      top: 0px;
      height: 100%;
      width: calc(100% - 200px);
    }
  }
  ::v-deep .el-tree-node__content {
    height: 40px;
    .el-text {
      font-size: medium;
      font-weight: bold;
    }
  }
</style>
