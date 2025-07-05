<template>
  <div class="container">
    <div class="bank-name">
      <el-text class="bank-name">{{ bank.name }}</el-text>
    </div>
    <el-scrollbar class="directory-tree">
      <el-tree
        :data="data"
        :props="props"
        :highlight-current="true"
        :current-node-key="id"
        :expand-on-click-node="false"
        node-key="id"
        :indent="15"
        @node-click="clickEditorVisualDocument"
      >
        <template #default="scope">
          <div class="tree_item">
            <el-text>{{ scope.node.label }}</el-text>
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
    <VisualDocumentLearn class="document-learn" />
  </div>
</template>

<script setup lang="ts">
  import { reqVisualDocumentDirectory } from '@/api/visual-document/index.ts'
  import { VisualDocumentDirectory } from '@/api/visual-document/type.ts'
  import { reqVisualDocumentBank } from '@/api/visual-document-bank/index.ts'
  import { ref, onMounted, watch } from 'vue'
  import VisualDocumentLearn from './main.vue'
  import useVisualDocument from '@/store/modules/visual-document'
  import { storeToRefs } from 'pinia'
  import { useRouter, useRoute } from 'vue-router'

  let $router = useRouter()
  const $route = useRoute()
  let visualDocumentStore = useVisualDocument()
  let { id } = storeToRefs(visualDocumentStore)
  const data = ref<VisualDocumentDirectory[]>([])
  const props = {
    children: 'children',
    label: 'title',
  }

  const convertToNumber = (input: string | string[]): number => {
    if (input == undefined) {
      return 0
    }
    let value: string
    if (Array.isArray(input)) {
      value = input[0]
    } else {
      value = input
    }
    return Number(value)
  }

  let bankID: number
  let bank = ref({
    name: '',
  })

  const getDirectory = async (bankID: number) => {
    let result = await reqVisualDocumentDirectory(bankID)
    if (result.code === 200) {
      data.value = result.data
    }
  }

  const getBank = async (bankID: number) => {
    let result = await reqVisualDocumentBank(bankID)
    if (result.code === 200) {
      bank.value = result.data
    }
  }

  const clickEditorVisualDocument = (node: any) => {
    $router.push({
      name: 'learn',
      params: {
        bankID: bankID,
      },
      query: {
        documentID: node.id,
      },
    })
  }

  const load = async () => {
    bankID = convertToNumber($route.params.bankID)
    let documentID = convertToNumber($route.query.documentID)
    getBank(bankID)
    await getDirectory(bankID)
    if (documentID != 0) {
      id.value = documentID
    } else {
      id.value = data.value[0].id
    }
  }

  onMounted(async () => {
    load()
    watch([() => $route.params, () => $route.query], () => {
      load()
    })
  })
</script>
<style scoped lang="scss">
  .container {
    position: relative;
    width: 100%;
    height: calc(100vh - $base-header-height);
    margin: 0;

    .bank-name {
      position: absolute;
      left: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center; /* 竖直居中 */
      width: 200px;
      height: 35px;
      padding-left: 10px;
      border-right: 1px solid $base-border-color;

      .el-text {
        font-size: large;
        font-weight: bold;
      }
    }

    .directory-tree {
      position: absolute;
      top: 35px;
      left: 0;
      box-sizing: border-box;
      width: 200px;
      height: calc(100% - 35px);
      border-right: 1px solid $base-border-color;

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
      top: 0;
      left: 200px;
      width: calc(100% - 200px);
      height: 100%;
    }
  }
</style>
