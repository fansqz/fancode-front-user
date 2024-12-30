<template>
  <el-form
    status-icon
    label-width="auto"
    class="arrayDescription"
  >
    <el-form-item label="数组名">
      <el-input v-model="arrayDescription.arrayName"/>
    </el-form-item>
    <el-form-item label="取值的变量(多个值以','分割)">
      <el-input v-model="pointNamesStr"/>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import useVisualStore from '@/store/modules/visual.ts';
import { onMounted, ref, reactive, watch } from 'vue';

const visualStore = useVisualStore();
const { arrayDescription } = reactive(visualStore.arrayDescription);

const pointNamesStr = ref("point1,point2");

watch(() => pointNamesStr.value, (val) => {
  let arr: string[] = val.split(',').map((item) => {
    return item.trim();
  })
  arrayDescription.pointNames = arr;
});

onMounted(() => {
  if (!arrayDescription.arrayName) {
    arrayDescription.arrayName = 'arr';
  }
  if (!arrayDescription.pointNames) {
    arrayDescription.pointNames = ['point1', 'point2'];
  }
})
</script>

<style lang="scss" scoped>
.arrayDescription {
  height: 100%;
  width: 100%;
}
</style>
