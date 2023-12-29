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
  import { ref } from 'vue';
  defineProps(['text']);
  const isHovered = ref(false);
</script>

<style scoped lang="scss">
  .button {
    cursor: pointer;
    color: #333333;
  }

  .hovered {
    color: #4499ee;
  }
</style>
