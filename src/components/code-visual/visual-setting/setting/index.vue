<template>
  <el-container class="visual-description">
    <el-main class="main">
      <el-table
        size="small"
        ref="singleTableRef"
        class="template-select"
        :data="descriptionTypeList"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column>
          <template v-slot="{ row }">
            <div class="item">
              <i v-if="row.type == descriptionType" class="selected-icon iconfont icon-Other-10" />
              <i v-if="row.type != descriptionType" class="selected-icon iconfont icon-Other-11" />
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="setting">
        <ArraySetting v-if="descriptionType == descriptions.Array" />
        <BinaryTreeSetting v-if="descriptionType == descriptions.BinaryTree" />
        <LinkList v-if="descriptionType == descriptions.LinkList" />
        <Graph v-if="descriptionType == descriptions.Graph" />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts'
  import useDebugStore from '@/store/modules/debug'
  import { reqGetVisualDescription } from '@/api/visual'
  import { onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { ElTable } from 'element-plus'
  import { descriptions } from '@/constants/description.ts'
  import ArraySetting from './array.vue'
  import BinaryTreeSetting from './binary-tree.vue'
  import LinkList from './link-list.vue'
  import Graph from './graph.vue'
  import { CompileEventDispatcher } from '@/api/debug/debug-event-dispatcher'

  const visualStore = useVisualStore()
  const debugStore = useDebugStore()

  const { isAIEnabled, descriptionType } = storeToRefs(visualStore)

  const singleTableRef = ref<InstanceType<typeof ElTable>>()
  const descriptionTypeList = ref([
    {
      name: '一维数组',
      type: descriptions.Array,
    },
    {
      name: '二叉树',
      type: descriptions.BinaryTree,
    },
    {
      name: '链表',
      type: descriptions.LinkList,
    },
    {
      name: '图',
      type: descriptions.Graph,
    },
  ])

  // 选择了其他可视化模板
  const handleCurrentChange = async (val) => {
    descriptionType.value = val.type
  }

  // 编译完成以后读取可视化描述
  const onCompiled = async (data: CompileEvent) => {
    if (data.success && isAIEnabled.value) {
      // 拉取ai配置数据
      let result = await reqGetVisualDescription(debugStore.id)
      if (result.code == 200) {
        descriptionType.value = result.data.visualType
        visualStore.setDescription(descriptionType.value, result.data.description)
      }
    }
  }

  // 监控isAIEnabled的变化
  watch(isAIEnabled, async (newVal) => {
    if (newVal) {
      console.log('isAIEnabled', newVal)
      // 如果isAIEnabled为true，并且正在调试中，则拉取ai配置数据
      if (debugStore.isDebugging()) {
        // 拉取ai配置数据
        let result = await reqGetVisualDescription(debugStore.id)
        if (result.code == 200) {
          descriptionType.value = result.data.visualType
          visualStore.setDescription(descriptionType.value, result.data.description)
        }
      }
    }
  })

  // 监控调试状态
  onMounted(() => {
    // 注册一些事件
    CompileEventDispatcher.on('compile', onCompiled)
  })
</script>

<style lang="scss" scoped>
  .visual-description {
    background-color: $base-background-color;

    .title {
      height: 30px;
      border-bottom: 1px solid var(--el-border-color);
    }

    .main {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0;
      border-top: 1px solid $base-border-color;

      .template-select {
        width: 20%;
        height: 150px;
        margin-right: 10px;
        margin-left: 20px;

        .item {
          display: flex;

          .selected-icon {
            position: relative;
            margin: auto 2px;
            font-size: 15px !important;
            color: rgb(90 180 253);
          }
        }
      }

      .setting {
        width: calc(80% - 100px);
        height: 150px;
        border-left: 1px solid $base-border-color;
      }

      .option {
        display: flex;
        flex-flow: column;
        width: 40px;
        height: 150px;
        margin-right: 20px;
        margin-left: 10px;
      }
    }
  }
</style>
