<template>
  <ul class="horizontal-list">
    <li class="li">
      <DebugButton />
    </li>
    <li class="li">
      <ExecuteButton />
    </li>
    <li class="li">
      <SubmitButton />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import DebugButton from '../console/debug-button/debug-button.vue';
  import ExecuteButton from './execute-button.vue';
  import SubmitButton from './submit-button.vue';
</script>

<style lang="scss" scoped>
  .horizontal-list {
    position: relative; /*设置层级需定位 */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    background-color: $base-header-background;
    box-sizing: border-box;
    border-top: 1px solid $base-border-color;
    .li {
      position: relative; /*设置层级需定位 */
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
