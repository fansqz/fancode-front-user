<template>
  <div class="console">
    <el-menu
      :default-active="activeIndex"
      class="select-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-if="userInput" index="input">输入用例</el-menu-item>
      <el-menu-item v-if="userOutput" index="output">输出</el-menu-item>
      <el-menu-item v-if="terminal" index="terminal">调试终端</el-menu-item>
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
  import { onMounted, onUnmounted, ref, watch, toRefs } from 'vue'
  import Output from './output.vue'
  import Input from './input.vue'
  import DebugTerminal from './debug-terminal/index.vue'
  import useCodingStore from '@/store/modules/coding'
  import { storeToRefs } from 'pinia'
  import { CompileEventDispatcher } from '@/api/debug/debug-event-dispatcher'

  let props = defineProps<{
    userInput: boolean
    userOutput: boolean
    terminal: boolean
  }>()

  let { userInput, userOutput, terminal } = toRefs(props)

  // 用于控制当前是输入界面还是输出界面
  const activeIndex = ref()
  if (terminal.value) {
    activeIndex.value = 'terminal'
  }
  if (userOutput.value) {
    activeIndex.value = 'output'
  }
  if (userInput.value) {
    activeIndex.value = 'input'
  }

  const codingStore = useCodingStore()
  const { output } = storeToRefs(codingStore)
  const handleSelect = (key: string) => {
    activeIndex.value = key
  }
  watch(
    () => output,
    () => {
      activeIndex.value = 'output'
    },
    {
      deep: true,
    },
  )
  // 监控调试事件
  onMounted(() => {
    CompileEventDispatcher.on('compile', onCompile)
  })
  onUnmounted(() => {
    CompileEventDispatcher.off('compile', onCompile)
  })

  const onCompile = () => {
    // 监控调试开始事件，设置当前终端为“调试终端”
    activeIndex.value = 'terminal'
  }
</script>

<style scoped lang="scss">
  .console {
    position: absolute;
    display: flex;
    flex-flow: column;
    width: 100%;
    min-width: 450px;
    height: 100%;

    .select-menu {
      height: 30px;
      user-select: none;
    }

    .input-div {
      flex: 1;
      padding: 15px;
      background-color: rgb(255 255 255);
    }

    .output-div {
      flex: 1;
      padding: 15px;
      background-color: rgb(255 255 255);
    }

    .terminal-div {
      position: relative;
      flex: 1;
      height: calc(100% - 30%);
      background-color: rgb(255 255 255);
    }

    .option-bottom {
      box-sizing: border-box;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      width: 100%;
      height: 50px;
      background-color: rgb(255 255 255);
      border-top: 1px solid $base-border-color;

      .button-execute {
        margin-right: 10px;
        margin-left: 30px;
      }

      .button-submit {
        margin-right: 30px;
        margin-left: 10px;
      }
    }
  }
</style>
