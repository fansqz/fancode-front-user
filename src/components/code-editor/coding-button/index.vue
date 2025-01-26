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
    debug: boolean;
    execute: boolean;
    submit: boolean;
  }>();

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
    background-color: $base-header-background;
    box-sizing: border-box;
    padding: 0px;
    border-top: 1px solid $base-border-color;
    .li {
      position: relative; /*设置层级需定位 */
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
