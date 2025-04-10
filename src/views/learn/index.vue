<template>
  <div class="container">
    <div class="bank-name">
      <el-text class="bank-name">{{ bank.name }}</el-text>
    </div>
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
  import { VisualDocumentDirectory } from '@/api/visual-document/type.ts';
  import { reqVisualDocumentBank } from '@/api/visual-document-bank/index.ts';
  import { ref, onMounted } from 'vue';
  import VisualDocumentLearn from './main.vue';
  import useVisualDocument from '@/store/modules/visual-document';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';

  const $route = useRoute();
  let visualDocumentStore = useVisualDocument();
  let { id } = storeToRefs(visualDocumentStore);
  const data = ref<VisualDocumentDirectory[]>([]);
  const props = {
    children: 'children',
    label: 'title',
  };

  const convertToNumber = (input: string | string[]): number => {
    let value: string;
    if (Array.isArray(input)) {
      value = input[0];
    } else {
      value = input;
    }
    return Number(value);
  };

  let bankID = convertToNumber($route.params.bankID);
  let documentID = convertToNumber($route.query.documentID);
  let bank = ref({
    name: '',
  });

  const getDirectory = async () => {
    let result = await reqVisualDocumentDirectory(bankID);
    if (result.code === 200) {
      data.value = result.data;
    }
  };

  const getBank = async () => {
    let result = await reqVisualDocumentBank(bankID);
    if (result.code === 200) {
      bank.value = result.data;
    }
  };

  const clickEditorVisualDocument = (node: any) => {
    id.value = node.id;
    // 将documentID转换为字符串
    const newQuery: Record<string, string> = {
      documentID: id.value.toString(),
    };
    const newUrl = `${$route.path}?${new URLSearchParams(newQuery).toString()}`;
    history.replaceState(null, '', newUrl);
  };

  onMounted(async () => {
    await getBank();
    await getDirectory();
    if (documentID !== 0) {
      id.value = documentID;
    } else {
      id.value = data.value[0].id;
    }
  });
</script>
<style scoped lang="scss">
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0px;
    .bank-name {
      position: absolute;
      display: flex;
      box-sizing: border-box;
      align-items: center; /* 竖直居中 */
      border-right: 1px solid $base-border-color;
      left: 0px;
      height: 35px;
      width: 200px;
      padding-left: 10px;
      .el-text {
        font-size: large;
        font-weight: bold;
      }
    }
    .directory-tree {
      position: absolute;
      left: 0px;
      top: 35px;
      height: calc(100% - 35px);
      width: 200px;
      border-right: 1px solid $base-border-color;
      box-sizing: border-box;
      ::v-deep .el-tree-node__content {
        height: 35px;
        .el-text {
          font-size: medium;
          font-weight: bold;
        }
      }
    }
    .document-learn {
      position: absolute;
      left: 200px;
      top: 0px;
      height: 100%;
      width: calc(100% - 200px);
    }
  }
</style>
