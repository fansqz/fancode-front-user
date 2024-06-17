<template>
  <el-input class="input" v-model="input" type="textarea" placeholder="Please input" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import useCodingStore from '@/store/modules/coding';
  const codingStore = useCodingStore();
  const { input } = storeToRefs(codingStore);
</script>
