<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-form-item label="图节点">
      <el-input v-model="graphNode" />
    </el-form-item>
    <el-form-item label="节点值">
      <el-input v-model="data" />
    </el-form-item>
    <el-form-item label="next指针">
      <el-input v-model="pointNamesStr" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts';
  import { onMounted, ref, watch } from 'vue';
  import { descriptions } from '@/enum/description';
  import { toRefs } from 'vue';

  const visualStore = useVisualStore();
  if (!visualStore.descriptionMap.has(descriptions.Graph)) {
    visualStore.descriptionMap.set(descriptions.Graph, {
      graphNode: 'GraphNode',
      // 数据域
      data: 'Val',
      nexts: ['Point1', 'Point2'],
    });
  }

  const { graphNode, data, nexts } = toRefs(visualStore.descriptionMap.get(descriptions.Graph));

  const pointNamesStr = ref('');

  watch(
    () => pointNamesStr.value,
    (val) => {
      let arr: string[] = val.split(',').map((item) => {
        return item.trim();
      });
      nexts.value = arr;
    },
  );

  watch(
    () => nexts.value,
    (val) => {
      let arr: string[] = pointNamesStr.value.split(',').map((item) => {
        return item.trim();
      });
      if (JSON.stringify(val) != JSON.stringify(arr)) {
        pointNamesStr.value = val.join(',');
      }
    },
    {
      deep: true,
    },
  );

  onMounted(() => {
    pointNamesStr.value = nexts.value.join(',');
    console.log(pointNamesStr.value);
  });
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
