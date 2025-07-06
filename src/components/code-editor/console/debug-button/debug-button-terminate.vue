<template>
  <div
    :class="{ button: true, 'button-show': buttonShow }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <el-button
      :class="{
        'iconfont icon-indeterminate': true,
        able: able,
        unable: !able,
      }"
      @click="terminateDebug"
      link
    ></el-button>
  </div>
</template>

<script setup lang="ts">
  import { reqTerminate } from '@/api/debug/index.ts'
  import useDebugStore from '@/store/modules/debug'
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  const debugStore = useDebugStore()
  let { status } = storeToRefs(debugStore)

  // 判断按钮是出于可执行还是不可执行状态
  let able = ref(false)
  watch(
    () => status.value,
    () => {
      // 调试期间不能点击
      able.value = debugStore.isDebugging()
    },
  )

  let buttonShow = ref(false)
  const terminateDebug = async () => {
    if (!able.value) {
      return
    }
    await reqTerminate(debugStore.id)
  }

  const mouseover = () => {
    // 鼠标经过显示按钮
    if (able.value) {
      buttonShow.value = true
    }
  }
  const mouseout = () => {
    // 鼠标移出，隐藏按钮
    buttonShow.value = false
  }
</script>

<style scoped lang="scss">
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: rgb(255 255 255);

    .able {
      color: rgb(210 57 37);
      transition: color 0.2s;
    }

    .unable {
      color: grey;
      transition: color 0.2s;
    }
  }

  .button-show {
    background-color: rgb(227 227 227);
  }
</style>
