<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="二叉树节点">
          <el-input v-model="binaryTreeDescription.treeNode" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="节点值">
          <el-input v-model="binaryTreeDescription.data" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="左指针">
          <el-input v-model="binaryTreeDescription.left" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="右指针">
          <el-input v-model="binaryTreeDescription.right" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts'
  import { storeToRefs } from 'pinia'

  const visualStore = useVisualStore()
  const { binaryTreeDescription } = storeToRefs(visualStore)
</script>

<style lang="scss" scoped>
  .arrayDescription {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
</style>
