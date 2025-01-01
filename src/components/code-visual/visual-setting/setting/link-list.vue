<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-row>
      <el-col :span="24">
        <el-form-item label="链表节点">
          <el-input v-model="linkNode" />
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
        <el-form-item label="prev指针">
          <el-input v-model="prev" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="next指针">
          <el-input v-model="next" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts';
  import { descriptions } from '@/enum/description';
  import { toRefs, watch } from 'vue';
  import { LinkListDescription } from '../type';

  const visualStore = useVisualStore();
  if (!visualStore.descriptionMap.has(descriptions.LinkList)) {
    if (localStorage.getItem('linkListDescription')) {
      let linkListDescription: LinkListDescription = JSON.parse(
        localStorage.getItem('linkListDescription'),
      );
      visualStore.descriptionMap.set(descriptions.LinkList, linkListDescription);
    } else {
      visualStore.descriptionMap.set(descriptions.LinkList, {
        // 链表节点
        linkNode: 'LinkNode',
        // 数据域
        data: 'Val',
        next: 'Next',
        prev: 'Prev',
      });
    }
  }

  const linkListDescription = visualStore.descriptionMap.get(descriptions.LinkList);
  const { linkNode, data, next, prev } = toRefs(linkListDescription);

  watch(
    () => linkListDescription,
    () => {
      let json = JSON.stringify(linkListDescription);
      localStorage.setItem('linkListDescription', json);
    },
    {
      deep: true,
    },
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
