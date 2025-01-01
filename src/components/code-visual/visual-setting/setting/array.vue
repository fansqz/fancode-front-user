<template>
  <el-form status-icon label-width="auto" class="arrayDescription" size="small">
    <el-form-item label="数组名">
      <el-input v-model="arrayName" />
    </el-form-item>
    <el-form-item label="取值变量">
      <el-input v-model="pointNamesStr" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual.ts';
  import { onMounted, ref, watch } from 'vue';
  import { descriptions } from '@/enum/description';
  import { toRefs } from 'vue';
  import { ArrayDescription } from '../type.ts';

  const visualStore = useVisualStore();
  if (!visualStore.descriptionMap.has(descriptions.Array)) {
    // 先读取本地
    if (localStorage.getItem('arrayDescription')) {
      let json = localStorage.getItem('arrayDescription');
      let arrayDescription: ArrayDescription = JSON.parse(json);
      visualStore.descriptionMap.set(descriptions.Array, arrayDescription);
    } else {
      visualStore.descriptionMap.set(descriptions.Array, {
        arrayName: 'Arr',
        pointNames: ['Point1', 'Point2'],
      });
    }
  }

  const arrayDescription = visualStore.descriptionMap.get(descriptions.Array);
  const { arrayName, pointNames } = toRefs(arrayDescription);

  const pointNamesStr = ref('');

  watch(
    () => pointNamesStr.value,
    (val) => {
      let arr: string[] = val.split(',').map((item) => {
        return item.trim();
      });
      pointNames.value = arr;
    },
  );

  watch(
    () => pointNames.value,
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

  watch(
    () => arrayDescription,
    () => {
      let json = JSON.stringify(arrayDescription);
      localStorage.setItem('arrayDescription', json);
    },
    {
      deep: true,
    },
  );

  onMounted(() => {
    pointNamesStr.value = pointNames.value.join(',');
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
