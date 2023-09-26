<template>
  <el-input class="input" v-model="inputCase" type="textarea" placeholder="Please input" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);

  // input的双向绑定
  const inputCase = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>

<style></style>
