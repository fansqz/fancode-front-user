<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="链表节点">
          <el-input v-model="linkListDescription.linkNode" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="节点值">
          <el-input v-model="linkListDescription.data" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="prev指针">
          <el-input v-model="linkListDescription.prev" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="next指针">
          <el-input v-model="linkListDescription.next" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts'
  import { storeToRefs } from 'pinia'

  const visualStore = useVisualStore()
  const { linkListDescription } = storeToRefs(visualStore)
</script>

<style lang="scss" scoped>
  .arrayDescription {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
</style>
