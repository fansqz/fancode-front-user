<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="二叉树节点">
          <el-input v-model="treeNode" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="节点值">
          <el-input v-model="data" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="左指针">
          <el-input v-model="left" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="右指针">
          <el-input v-model="right" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts';
  import { toRefs } from 'vue';
  import { descriptions } from '@/enum/description';

  const visualStore = useVisualStore();
  if (!visualStore.descriptionMap.has(descriptions.BinaryTree)) {
    visualStore.descriptionMap.set(descriptions.BinaryTree, {
      treeNode: 'TreeNode',
      data: 'Val',
      left: 'Left',
      right: 'Right',
    });
  }
  const { treeNode, data, left, right } = toRefs(
    visualStore.descriptionMap.get(descriptions.BinaryTree),
  );
</script>

<style lang="scss" scoped>
  .arrayDescription {
    height: 100%;
    width: 100%;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
