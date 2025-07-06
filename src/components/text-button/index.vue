<template>
  <pre
    class="button"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :class="{ hovered: isHovered }"
    >{{ text }}</pre
  >
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  defineProps(['text'])
  const isHovered = ref(false)
</script>

<style scoped lang="scss">
  .button {
    color: #333;
    cursor: pointer;
  }

  .hovered {
    color: #49e;
  }
</style>
