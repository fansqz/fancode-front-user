<template>
  <div class="visual-description">
    <div class="visual-description-input">
      <el-table
        size="small"
        ref="singleTableRef"
        class="templateSelect"
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
      <div class="option">
        <el-switch v-model="action" @change="handlerVisualAction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { ElTable } from 'element-plus';
  import { descriptions } from '@/enum/description.ts';
  import ArraySetting from './setting/array.vue';
  import BinaryTreeSetting from './setting/binary-tree.vue';
  import LinkList from './setting/link-list.vue';
  import Graph from './setting/graph.vue';

  const visualStore = useVisualStore();
  const { action, descriptionType } = storeToRefs(visualStore);

  const singleTableRef = ref<InstanceType<typeof ElTable>>();
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
  ]);

  // 选择了其他可视化模板
  const handleCurrentChange = async (val) => {
    descriptionType.value = val.type;
  };

  const handlerVisualAction = () => {
    action.value = true;
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
          display: flex;
          .selected-icon {
            position: relative;
            font-size: 15px !important;
            margin: auto 2px;
            color: rgb(90, 180, 253);
          }
        }
      }
      .setting {
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
