<template>
  <div class="console">
    <el-menu
      :default-active="activeIndex"
      class="select-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="input">输入用例</el-menu-item>
      <el-menu-item index="output">输出</el-menu-item>
      <el-menu-item index="terminal">调试终端</el-menu-item>
    </el-menu>
    <div class="input-div" v-show="activeIndex == 'input'">
      <Input />
    </div>
    <div class="output-div" v-show="activeIndex == 'output'">
      <Output />
    </div>
    <div class="terminal-div" v-show="activeIndex == 'terminal'">
      <DebugTerminal />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Output from './output.vue';
  import Input from './input.vue';
  import DebugTerminal from './debug_terminal/index.vue';
  import useCodingStore from '@/store/modules/coding';
  import { storeToRefs } from 'pinia';
  // 用于控制当前是输入界面还是输出界面
  const activeIndex = ref('input');
  const codingStore = useCodingStore();
  const { output } = storeToRefs(codingStore);
  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };
  watch(
    () => output,
    () => {
      activeIndex.value = 'output';
    },
    {
      deep: true,
    },
  );
</script>

<style scoped lang="scss">
  .console {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    position: absolute;
    .select-menu {
      height: 30px;
    }
    .input-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
      padding: 15px;
    }
    .output-div {
      flex: 1;
      background-color: rgb(255, 255, 255);
      padding: 15px;
    }
    .terminal-div {
      position: relative;
      flex: 1;
      height: calc(100% - 30%);
      background-color: rgb(255, 255, 255);
    }
    .option-bottom {
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid $base-border-color;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .button-execute {
        margin-left: 30px;
        margin-right: 10px;
      }
      .button-submit {
        margin-left: 10px;
        margin-right: 30px;
      }
    }
  }
</style>
