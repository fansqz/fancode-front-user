<template>
  <ul class="horizontal-list">
    <li class="li">
      <DebugButton v-if="debug" />
    </li>
    <li class="li">
      <ExecuteButton v-if="execute" />
    </li>
    <li class="li">
      <SubmitButton v-if="submit" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineProps<{
    debug: boolean
    execute: boolean
    submit: boolean
  }>()

  import DebugButton from '../console/debug-button/debug-button.vue'
  import ExecuteButton from './execute-button.vue'
  import SubmitButton from './submit-button.vue'
</script>

<style lang="scss" scoped>
  .horizontal-list {
    position: relative; /* 设置层级需定位 */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    background-color: $base-header-background;
    border-top: 1px solid $base-border-color;

    .li {
      position: relative; /* 设置层级需定位 */
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
</style>
